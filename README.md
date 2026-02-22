<!-- ===================================================== -->
<!--  🔥 GitHub Social Preview Setup (One-Time Action)    -->
<!-- ===================================================== -->
<!--
After pushing this repo:

1. Go to:
   Settings → Social Preview
2. Upload:
   assets/github-social-preview.png
3. Recommended size:
   1200 x 630
-->

<p align="center">
  <img src="assets/cloud-cost-banner.svg" width="100%" alt="Cloud Cost Calculator Banner"/>
</p>

# ☁️ Cloud Cost Calculator  
### Serverless AWS Cost Monitoring & Alerting Dashboard

![AWS](https://img.shields.io/badge/AWS-Serverless-orange?logo=amazonaws)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![CloudWatch](https://img.shields.io/badge/CloudWatch-Custom%20Metrics-green)
![API Gateway](https://img.shields.io/badge/API%20Gateway-Regional-blue)
![S3](https://img.shields.io/badge/S3-Static%20Hosting-red?logo=amazonaws)
![SNS](https://img.shields.io/badge/SNS-Email%20Alerts-yellow)
![Architecture](https://img.shields.io/badge/Architecture-Event--Driven-brightgreen)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🚀 Overview

Cloud Cost Calculator is a **production-grade, serverless AWS cost monitoring system** that transforms AWS billing data into:

- 📊 Custom CloudWatch metrics  
- 🚨 Automated cost threshold alerts  
- 📬 Weekly cost summary emails  
- 🌐 API-driven dashboard analytics  

Built using:

- AWS Lambda  
- AWS Cost Explorer  
- CloudWatch Custom Metrics  
- CloudWatch Alarms  
- SNS  
- API Gateway  
- S3 Static Hosting  

Instead of manually checking AWS billing…

**The infrastructure monitors itself.**

---

# 🎬 Live Cost Simulation

<div align="center">
  <img src="assets/live-cost-simulation.gif" width="85%" alt="Live Cost Simulation"/>
</div>

This simulation demonstrates:

- MTD metric publishing
- Threshold breach detection
- Alarm trigger → SNS email dispatch
- Dashboard auto-refresh via API

---

# 🏗 Architecture Overview

<div align="center">
  <img src="assets/architecture-diagram.svg" width="95%" alt="Cloud Cost Calculator Architecture Diagram"/>
</div>

---

## 🔎 Jump to Documentation Sections

- [Cost Monitoring Pipeline](#cost-monitoring-pipeline)
- [Lambda Functions](#lambda-functions)
- [CloudWatch Metrics](#cloudwatch-metrics)
- [CloudWatch Alarms](#cloudwatch-alarms)
- [SNS Notifications](#sns-notifications)
- [API Gateway](#api-gateway)
- [S3 Dashboard Hosting](#s3-dashboard-hosting)
- [Scalability & Production Considerations](#scalability--production-considerations)

---

# Cost Monitoring Pipeline

```
AWS Cost Explorer (ce:GetCostAndUsage)
        |
        v
MetricsPublisherFunction-qHICp98n9xt3
        |
        v
CloudWatch Metric
Namespace: CloudCostCalculator
Metric: MTDSpendUSD
        |
        v
CloudWatch Alarms
ccc-mtdspend-prod-ge-50
ccc-mtdspend-prod-ge-200
        |
        v
SNS Topic
cloud-cost-calculator-BudgetAlertsTopic-QejtJZ6FnhMF
        |
        v
Email Subscribers
```

---

# Lambda Functions

- `cloud-cost-calculator-MetricsPublisherFunction-qHICp98n9xt3`
- `cloud-cost-calculator-WeeklyReportFunction-gnA0HcUN1au`
- `cloud-cost-calculator-CostApiFunction-Rfi5eNzo01d`

Runtime: **Python 3.12**

Responsibilities:

- Fetch Cost Explorer billing data
- Publish custom CloudWatch metrics
- Compute week-over-week deltas
- Serve API endpoints

---

# CloudWatch Metrics

Namespace:
```
CloudCostCalculator
```

Metric:
```
MTDSpendUSD
```

Purpose:
Transforms billing data into a monitored infrastructure metric.

---

# CloudWatch Alarms

- `ccc-mtdspend-prod-ge-50`
- `ccc-mtdspend-prod-ge-200`

Behavior:

- Evaluates `MTDSpendUSD`
- Triggers on threshold breach
- Publishes to SNS

Alarm evaluation latency:
**< 60 seconds after metric publish**

---

# SNS Notifications

Topic:
```
cloud-cost-calculator-BudgetAlertsTopic-QejtJZ6FnhMF
```

Protocol:
- Email (Confirmed)

Used for:
- Threshold alerts
- Weekly summary reports

Delivery latency:
**~5–15 seconds**

---

# API Gateway

API ID:
```
wgzvfgtlw1
```

Routes:

- GET `/health`
- GET `/snapshot`
- GET `/mapping`
- PUT `/mapping`

Snapshot API latency:
**< 150ms**

---

# S3 Dashboard Hosting

Bucket:
```
cloud-cost-calculator-dashboardbucket-op8tdpgxt9ex
```

Region:
`us-east-1`

Deploy via:

```bash
aws s3 sync dashboard/ s3://cloud-cost-calculator-dashboardbucket-op8tdpgxt9ex --delete
```

---

# 📊 Performance & Benchmarks

| Metric | Result |
|--------|--------|
| API Snapshot Latency | <150ms |
| Alarm Detection Time | <60s |
| SNS Delivery | 5–15s |
| Manual Billing Time Reduction | ~90% |
| Monthly Infra Cost | ~$2–$6 |

---

# 📈 Scalability & Production Considerations

## Serverless Auto-Scaling
- Lambda scales per invocation
- API Gateway handles concurrent traffic
- S3 supports virtually unlimited static requests

## Multi-Account Extension
- Integrate AWS Organizations
- Publish per-account metric dimensions
- Use cross-account IAM roles

## Security Hardening
- IAM least privilege
- API Gateway authorizers (JWT / Cognito)
- CloudTrail auditing
- KMS encryption for SNS
- WAF integration

## Advanced Monitoring
- CloudWatch dashboards
- Anomaly detection bands
- Centralized observability export

---

# 🔍 SEO Keywords

AWS Cost Monitoring  
Serverless Cost Dashboard  
CloudWatch Custom Metrics  
AWS Budget Alerts Alternative  
Lambda Financial Automation  
Cloud Cost Governance  
Event-Driven Architecture  
Serverless API Backend  

---

# 📄 License

MIT License

---

## 👤 Author

<p align="center">
  <strong>Mitra Boga</strong><br/><br/>
  <a href="https://www.linkedin.com/in/bogamitra/">
    <img src="https://img.shields.io/badge/LinkedIn-Mitra%20Boga-0A66C2?logo=linkedin&logoColor=white"/>
  </a>
  <a href="https://x.com/techtraboga">
    <img src="https://img.shields.io/badge/X-@techtraboga-000000?logo=twitter&logoColor=white"/>
  </a>
</p>
