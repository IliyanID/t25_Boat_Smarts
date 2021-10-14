# Inspection - Team *T25* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | *Serversetting.js* |
| Meeting | *Thursday - 14th, 7:00pm, Teams* |
| Checklist | *./checklist.md* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Caleb  |  65 min   |
| Derek  |     |
| Andrew |  75 min |
| Iliyan |     |
| Mathew |     |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| ServerSettings.js:27 | Unreachble Code | | Andrew | |
| ServerSettings.js:105 | Code running as "intentional side effect" of render. Causes extra warning messages | | Andrew | |
| ServerSettings.js:96 | props.missingFeatures and missingFeatures refer to different variable types| | Andrew | |
| ServerSettings.js:109-114 | Does Props.showMessage need to be in a try catch block, some places we do it, ours we don't| | Caleb ||
| ServerSettings.js:106-107 | could you call missingFeatureExists to get the value or have just missingFeatures.Length > 0 in the If| | Caleb ||
