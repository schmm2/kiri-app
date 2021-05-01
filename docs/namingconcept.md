# Namingconcept

## Lambda Functions
Every function has one purpose and should be as minimal as possible to improve code reusability.
The name of lambda functions is determined by five Elements

* Prefix: TEC, TSK, SOL ...
* OnGoingNumber: 0-9999
* System, effected entity: MSGraph, AWSSQS ...
* Data / Entity, effected entity: Resources, AccessToken, Messages ...
* Operation : Delete, Update, Create ...

If we follow the name from start to beginning, we get more details and context of the purpose of the function.

### Prefix

Grouping of function types.

| Prefix  | Description  | Example |
|---|---|---|
|  TEC | Technical, solves one technical issue  | Create AccessToken, Call API for Warranty Status ... |
|  TSK | Task/Scheduled, called in occurences  | Start background job for tenant data refresh... |
|  SOL | Solution, Business Logic  | Copy Deviceconfiguration policy, create markdown manuals... |
|  PAT | Pattern, functionality used in many solutions, improves code reusability  |  |

### OnGoing Number

Every Prefix has its own number range 0000-9999.

| Prefix | Range  | Description |
| --- |---|---|
| TEC | 0000-0999| All TEC's related to MSGraph | 

### System

We try to determine the system which is used by this function.

| System | Examples |
| --- |---|
| AWS | Amazon Web Services | 
| MSGraph | Microsoft Graph | 

### Data

Defines the type of data we would like to handle.
Needs System for some context.

| Data |
| --- |
| Resources |
| Messages | 

### Operation
Determines what is happening with the system/data. Is it deleted, updated, refreshed ans so on.

| Operation| Examples |
| --- |---|
| Create | Creates a new item | 
| Refresh | Refresh the data |
| ... | |

## Examples
TEC0001MSGraphResourcesUpdate
* Prefix: TEC, Technical Pattern
* Number: 0001, first TEC
* System: MSGraph, something is happening with MSGraph
* Data: Resources, we want to do something with resources on MSGraph
* Operation: Update, resources on MSGraph are beining updated