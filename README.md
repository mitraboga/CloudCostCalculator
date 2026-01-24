# Cloud Cost Calculator

Small businesses often receive unexpectedly large AWS bills without understanding the specific services driving their spend. This project provides a simple, business-friendly cost tracking and alerting system that makes AWS billing data readable and actionable.

## What this project delivers

- **Cost visibility:** Translate AWS billing data into plain-language categories (e.g., "File storage" instead of "S3 Standard").
- **Spend alerts:** Trigger CloudWatch alarms at key thresholds and notify teams via SNS.
- **Weekly reporting:** Generate week-over-week summaries with anomaly highlights.
- **Owner-ready dashboard:** A static, S3-ready dashboard that presents the biggest cost drivers.

## Repository layout

```
.
├── dashboard/               # Static S3-hostable dashboard
├── data/                    # Sample cost data
├── infra/                   # CloudFormation template for alerts
└── lambda/                  # Weekly cost report Lambda example
```

## Architecture overview

1. **CloudWatch** collects cost metrics for each AWS service.
2. **CloudWatch Alarms** fire when spend exceeds defined thresholds (e.g., $50, $100, $200).
3. **SNS Notifications** deliver alerts via email or SMS.
4. **S3-hosted Dashboard** presents costs in business-friendly categories.
5. **Lambda Weekly Reports** compare week-over-week spend and highlight anomalies.

```
CloudWatch Metrics
       |
       v
CloudWatch Alarms ----> SNS (email/SMS alerts)
       |
       v
S3 Dashboard <---- Lambda Weekly Report
```

## Quick start

1. Serve the static dashboard locally:
   ```bash
   python -m http.server 8000
   ```
2. Open the dashboard at [http://localhost:8000/dashboard/index.html](http://localhost:8000/dashboard/index.html).
3. Update `data/sample-costs.json` with your own service data to see changes.

## CloudWatch alarm setup

Deploy the CloudFormation template to create an SNS topic, subscription, and billing alarm:

```bash
aws cloudformation deploy \
  --template-file infra/cloudwatch-alarm-template.yaml \
  --stack-name cloud-cost-alerts \
  --parameter-overrides AlertEmail=alerts@example.com MonthlyBudgetThreshold=200
```

## Weekly report Lambda example

The sample Lambda handler reads the latest cost data and emits a weekly summary. Run it locally with:

```bash
node -e 'require("./lambda/weekly-report").handler().then(console.log)'
```

## Why this matters

This project solves a real financial pain point for AWS customers. It demonstrates cost optimization, monitoring, and operational maturity—skills employers value highly in cloud engineering roles.
