
## Pain Points
A pain point must express a need, not a solution
|Nr|Pain Point|
|---|---|
|1|wants to adapt an existing configuration and change slightly, otherwise he needs to redo the config entirely|
|2|would like to be able to observe what changed inside a intune config|
|3|need to select every config category for example "device configuration" to export config. there is no export all function|
|4|if someone fu** up config we would like to revert to the old state|
|5|want to create one config and roll it out to all customers for example new Feature policy, for example "Edge Chromium ADMX"
|6|want to update existing configs if there is a setting we would like to adapt, for example "New Security Baseline policy"
|7|one view of all devices, don't want to login and logout of all customer tenants|
|8|need the devices and users in the CMDB -> Single Source of truth|
|9|reduce the amount of time to document changes and intune configurations|

## Features
A solution to solve a pain point
|Nr|Name|Description|Related Pain Point|Milestone|
|---|---|---|---|---|
|1|Copy Paste|Copy and paste configurations, inside and betweeen tenants|1|0.1|
|2|Change tracking|Track changes of configurations|2|0.1 |
|3|Backup & Restore|Restore configurations to an older state|4|0.1|
|4|Export|Export whole Intune configuration to json files|3|0.1|
|5|Deployment|Deploy configurations all connected tenants, source: Github, connected Tenant|5,6|0.2|
|8|Documentation|Auto generated Intune config Documentation. Contains timeline of changes|9|0.3|
|6|Inventory|Create inventory of devices and hardware|7|0.4|
|7|Warranty|Warranty checks for devices|8|0.4|
|9|CMDB Connector|Ability to sync devices, user assignment, warrenty to a CMDB|8|0.5|
