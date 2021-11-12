# Inspection - Team *T25* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | actions.js |
| Meeting | *11/11 7:30pm* |
| Checklist | *reference, URL, etc.* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ----- | ----- |
|Jake| 45min |
|Iliyan| 60min |
|Caleb| 45min |
|Andrew| 30min |
|Derek| 30min |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| ----- | ----- | ----- | ----- | ----- |
| actions.js:30 | duplicate code | low | Jake | #321 |
| actions.js:33 | duplicate code | low | Jake | #321 |
| actions.js:36 | duplicate code | low | Jake | #321 |
| actions.js:65 | Function PlaceActionsDropdown has 33 lines of code (exceeds 25 allowed).| low | Jake | #322 |
| actions.js:15 | Function ItineraryActionsDropdown has 41 lines of code (exceeds 25 allowed).| low | Jake | #323 |
| TripName.js:20-21 | Duplicate Code | low | Iliyan | #334 |
| FileUploadModal.js:21 | Unwanted showMessage appears on succesful file upload | med | Iliyan | #335 |
| ShorterTrip.java:95 | If distance between places is 0 it returns repeats of same place | high | Iliyan | #337 |
| TripName.js:11:19:31 | infoMessage code not need. | low | Caleb | 340 |
| TripName.js:10 | should use 'useToggle' becasue it is just true or false | Non-issue | Caleb | Non-issue |
| TripName.js:4-5 | Is there a way that we can make these react-icon/fa elements? | low | Caleb |  |
| actions.js:3 | react-icon BiSleepy is imported but never used | low | Andrew |  |
| actions.js:3 | react-icons FaTrash and FaTrashAlt are both being used, do they need to be different? | low | Andrew |  |
| actions.js:25 | Arrow function for on-click of home button is a bit hard to read | low | Andrew |  |
| ServerSettings.js:8 | Don't copy SCHEMAS object, and use map instead of for loop | low | Derek | #364 |
| CoordinateSearch.js:26 | Move CoordinateSearch return to separate element | low | Derek | #364 |
| TourCalculator.java:44 | use setDistance function inside nested loop | low | Derek | #365 |
| actions.js:16 | rename hover on delete place form 'Delete All Trips' to 'Delete Trip' | low/med | Team |
| actions.js:66 | rename hover on delete place form 'Delete Trip' to 'Delete Place' | low/med | Team |
