# Inspection - Team *T25* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | *Serversetting.js Map.js* |
| Meeting | *Thursday - 14th, 7:00pm, Teams* |
| Checklist | *./checklist.md* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Caleb  |  65 min   |
| Derek  |     |
| Andrew |  75 min |
| Iliyan |   60 min  |
| Mathew |     |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| ServerSettings.js:27 | Unreachble Code | low | Andrew | #210 |
| ServerSettings.js:105 | Code running as "intentional side effect" of render. Causes extra warning messages | med | Andrew | #211 |
| ServerSettings.js:96 | props.missingFeatures and missingFeatures refer to different variable types| med | Andrew | #211 |
| ServerSettings.js:109-114 | Does Props.showMessage need to be in a try catch block, some places we do it, others we don't| med | Caleb | #213 |
| ServerSettings.js:106-107 | could you call missingFeatureExists to get the value or have just missingFeatures.Length > 0 in the If| low | Caleb | #211 |
| ServerSettings.js:81-82 | Unrechable code| low | Iliyan | #210 |
| Map.js:66-76 | Repeate geocode to center user at starting location| low | Iliyan | #214 |
| Map.js.js:28 | Found bug for coordinates where lat or lng is 0 | high | Iliyan | #212 |
