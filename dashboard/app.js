const thresholds = [50, 100, 200];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

const formatPercent = (value) => `${value.toFixed(1)}%`;

const createAlert = (message, type = "warn") => {
  const item = document.createElement("li");
  item.textContent = message;
  if (type === "ok") {
    item.classList.add("ok");
  }
  return item;
};

const renderDashboard = (data) => {
  const totalSpend = data.services.reduce((sum, item) => sum + item.cost, 0);
  const averageDailySpend = totalSpend / 30;
  const forecast = averageDailySpend * 30;

  document.getElementById("mtd-total").textContent = formatCurrency(totalSpend);
  document.getElementById("mtd-period").textContent = `Period: ${data.period}`;
  document.getElementById("forecast-total").textContent = formatCurrency(forecast);

  const weekChange =
    ((data.weekOverWeek.currentWeek - data.weekOverWeek.previousWeek) /
      data.weekOverWeek.previousWeek) *
    100;
  document.getElementById("wow-change").textContent = formatPercent(weekChange);

  const alerts = document.getElementById("alerts");
  alerts.innerHTML = "";

  const triggered = thresholds.filter((limit) => totalSpend >= limit);
  if (triggered.length === 0) {
    alerts.appendChild(createAlert("Spend is below all alert thresholds.", "ok"));
  } else {
    triggered.forEach((limit) => {
      alerts.appendChild(
        createAlert(`Alert: Month-to-date spend exceeded ${formatCurrency(limit)}.`)
      );
    });
  }

  if (weekChange > 15) {
    alerts.appendChild(
      createAlert(
        `Spend increased ${formatPercent(weekChange)} week-over-week. Investigate anomalies.`
      )
    );
  }

  const table = document.getElementById("service-table");
  table.innerHTML = "";
  data.services.forEach((service) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${service.service}</td>
      <td>${service.businessLabel}</td>
      <td>${service.usage.toLocaleString()} ${service.unit}</td>
      <td>${formatCurrency(service.cost)}</td>
    `;
    table.appendChild(row);
  });

  const bars = document.getElementById("category-bars");
  bars.innerHTML = "";
  const maxCost = Math.max(...data.services.map((service) => service.cost));
  data.services
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 4)
    .forEach((service) => {
      const row = document.createElement("div");
      row.classList.add("bar-row");
      const percent = (service.cost / maxCost) * 100;
      row.innerHTML = `
        <span>${service.businessLabel}</span>
        <div class="bar"><span style="width: ${percent}%"></span></div>
        <strong>${formatCurrency(service.cost)}</strong>
      `;
      bars.appendChild(row);
    });
};

fetch("../data/sample-costs.json")
  .then((response) => response.json())
  .then((data) => renderDashboard(data))
  .catch(() => {
    const alerts = document.getElementById("alerts");
    alerts.innerHTML = "";
    alerts.appendChild(
      createAlert("Unable to load sample data. Please check the data source.")
    );
  });
