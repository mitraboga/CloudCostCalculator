# Cloud Cost Calculator

Small businesses often receive unexpectedly large AWS bills without understanding the specific services driving their spend. This project outlines a practical, service-by-service cost tracking and alerting system that turns raw billing data into clear, actionable insights.

## Goals

- Translate AWS billing data into plain-language categories (e.g., "File storage" instead of "S3 Standard").
- Track spend over time and detect unusual spikes early.
- Alert owners and operators when spend crosses configurable thresholds.
- Provide a simple dashboard that makes costs visible without AWS console expertise.

## High-level Architecture

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

## Service Mapping (Example)

| AWS Service | Business-Friendly Name | Notes |
|------------|-------------------------|-------|
| S3 Standard | File storage | Primary object storage cost category |
| EC2         | Compute servers | Virtual machine usage |
| RDS         | Managed databases | Database hosting |
| CloudWatch  | Monitoring | Metric and log ingestion |

## Next Steps

- [ ] Define metric naming conventions and tags.
- [ ] Build a normalized cost ingestion pipeline.
- [ ] Create a mapping table to translate AWS service codes to business-friendly labels.
- [ ] Implement the S3 dashboard UI and weekly Lambda report.

## Why This Matters

This project solves a real financial pain point for AWS customers. It demonstrates cost optimization, monitoring, and operational maturity—skills employers value highly in cloud engineering roles.
