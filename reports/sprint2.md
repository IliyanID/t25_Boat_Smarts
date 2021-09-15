# Sprint 2 - *T25* - *Boat Smarts*

## Goal
### *Find places to go.*

## Sprint Leader: 
### *Derek McCracken*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
#### Find Places
The 'Find Places' epic will use a search bar to get user input and search for places that match the string. The matching places will appear as a list with expandable details and the option to add the place to the user's trip.
#### Interoperability
This epic prepares the client to interact with other services. The user should be able to connect the client to any server which implements the protocol. Upon changing servers, the client should list the features available in the new server and warn the user if any of the necesary features are not implemented.
#### Where Am I?
The 'Where Am I?' epic will allow the user to add their current location to their trip, rather than a single fixed point on CSU campus. The feature will use GPS to generate the point to be added to the trip, without searching and selecting from the search bar. Potentially, when adding a user's location to their trip, a query is made to the database to see if the user's current location returns a named location to be added to the trip, such as Coors Field, when standing outside the venue, otherwise returning a pin "my location". The app will update the user's location so that they will be able to see their current location on the map.
#### Highlight Place
The 'Highlight Place' epic gives the user the ability to select a location in their trip and have the corresponding marker highlighted on the Map. 
The Map will be centered around the selected location.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *count* |
| Tasks |  25   | *count* | 
| Story Points |  45  | *sum* | 

It was difficult to get a good estimate of our abilities as a team last sprint since there was so little to be done. We decided that these 4 epics would give us enough to do and create a good v2 product without overwhelming us. We ended up waiting until the last minute with some parts of sprint 1 so we will have to keep on top of it and not get behind.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
