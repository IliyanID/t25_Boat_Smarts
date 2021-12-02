# Inspection - Team *T25* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | OptimizedTrip.js,FourPointers.java |
| Meeting | *date, time, location* |
| Checklist | *reference, URL, etc.* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Caleb | 45 min |
| Jake | 45 min |
| Iliyan | 45 min |
| Derek | 45 min |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| currentLocation.js:17 | showwMessage is not in a Try Catch Block | low | Caleb | |
| Map.js:59-64 | no need to check the others if on is not true - Just switch 'if' to 'ifelse' | low | Caleb | |
| Map.js:140-146 | cant we just call the current location function | low | Caleb | |
| FourPointers.java:80-84 | duplicated code in same file | low | Jake | |
| OptimizedTrip.js:43-47 | duplicated code in same file | low | Jake | |
| OptimizedTrip.js:65 | Unnecisary export can just call MakeToolTip instead | low | Iliyan | |
| deeplyCompare.js:1:28 | None of the code is used on the site | low | Iliyan | |
| TripSettingsModal.js:58 | Can use exported nav item from Search | low | Derek | |
| TripSettingsModal.js:77 | Extract tab component | low | Derek | |
| TripSettingsModal.ja:83 | Make UnitsDropdown component | low | Derek | |
