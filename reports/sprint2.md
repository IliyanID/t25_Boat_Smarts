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
#### Where is?
The 'Where is?' epic will allow the user to look up where a place is on the map by entering latitude and longitude into a search bar. There will be a green checkmark on the search bar letting the user know they have entered a valid latitude and longitude. A marker on the map will be made and the user will have the ability to add it to the trip if they want to.
#### Random
The 'Random' epic will give the user a list of random places which they can add to their trip by clicking the '+' icon. They will be able to select one or more places and information can be found by clicking on the desired location. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | 6 |
| Tasks |  25   | 29 | 
| Story Points |  45  | 76 | 

It was difficult to get a good estimate of our abilities as a team last sprint since there was so little to be done. We decided that these 4 epics would give us enough to do and create a good v2 product without overwhelming us. We ended up waiting until the last minute with some parts of sprint 1 so we will have to keep on top of it and not get behind.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 9/13 |  | #57, #58, #62, #85 |  | 
| 9/15 | #57, #58, #62, #72, #76, #85 | #69, #77, #78 | |
| 9/17 | #69, #77, #78 | #59, #61, #63, #95 | |
| 9/20 | #61, #63 | #59, #60, #79, #95 | |
| 9/22 | #59, #60, #79, #80, #95 |  #73, #74, #110, #113, #116 | |
| 9/24 | #73, #74, #75, #109, #110 | #105, #111, #112, #114, #117 | |
| 9/28 | #105, #111, #112, #113, #114, #116, #117 | #131 | |
| 9/29 | #131 | | |


## Review

### Epics completed  

Our team completed 6 epics: Find Places, Interoperability, Where am I?, Highlight Place, Where is?, and Random Places

### Epics not completed 

We did not complete Type or Country.

## Retrospective

### Things that went well

We were able to get all of the epics completed that we though we were going to be able to. We did a pretty good job of reviewing pull requests in a timely fashion, and for the most part, everyone was always working on something.

### Things we need to improve

We did not have regular enough scrum meetings. While, we were very effective at accomplishing the tasks for this sprint that were set in Zen Hub, it was much more efficient when we met and talked about what we were each working on and what the next steps for the product should be.

### One thing we will change next time

We will hold more regular scrum meetings so that we are all on the same page about the work that is being done and what needs to be done next.
