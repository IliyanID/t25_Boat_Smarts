# Inspection - Team *T25* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | actions.js |
| Meeting | *date, time, location* |
| Checklist | *reference, URL, etc.* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ----- | ----- |
|Jake| 45min |
|Iliyan| 60min |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| ----- | ----- | ----- | ----- | ----- |
| actions.js:30 | dublicate code | low | Jake | #321 |
| actions.js:33 | dublicate code | low | Jake | #321 |
| actions.js:36 | dublicate code | low | Jake | #321 |
| actions.js:65 | Function PlaceActionsDropdown has 33 lines of code (exceeds 25 allowed).| low | Jake | #322 |
| actions.js:15 | Function ItineraryActionsDropdown has 41 lines of code (exceeds 25 allowed).| low | Jake | #323 |
| TripName.js:20-21 | Duplicate Code | low | Iliyan | #334 |
| FileUploadModal.js:21 | Unwanted showMessage appears on succesful file upload | med | Iliyan | #335 |
| ShorterTrip.java:95 | If distance between places is 0 it returns repeats of same place | high | Iliyan | #337 |