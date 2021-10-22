# Sprint 3 - *t25* - *Boat Smarts*

## Goal
### *How far is it?*

## Sprint Leader: 
### *Andrew Holmes*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate technical debt ratio less than 3.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

#### Distances
The Distances epic allows the user to see the distance between the places in their trip as well as the cumulative distance at each location in the trip. The total distance of the trip will show at the top of the trip list.

#### Load Trip
This Epic will give the user the ability to load a trip from their file system in the form of a json.

#### Save Trip
Save Trip allows the user to make a trip on our site then save it as different file types to their file system. The user should be able to load this file into this program our others like Google Earth. The user can also decide their default by checking a check box.

#### Trip Name
The user will be allowed to now change the trip name. There will be a pencil icon by the default trip name of "My Trip". Once clicked the trip name becomes an editable text box. They will be able to save the name by clicking off of the name or clicking the save buttom which replaces the pencil when editing.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *4* | *count* |
| Tasks |  *18*   | *count* | 
| Story Points |  *34*  | *sum* | 

This sprint we decided to only plan for 4 epics with the intention of spending more time focusing on following proper practice. We will attempt to write new code in a way that doesn't reduce maintainability so there is less time spent cleaning up afterwards. We will also focus more on proper test driven development. If we complete all of our planned epics with time to spare before the sprint deadline we will work to fix any code climate issues before deciding if we have time to take on an additional epic.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/6* | *#160, #161, #168, #169* | *#159, #162, #163, #164* | none | 
| *10/11* | *#159, #162, #163, #166, #167, #186* | *#164, #171, #174, #176* | none | 
| *10/13* | *#171, #174, #172, #176, #177* | *#165, #173* | none | 
| *10/15* | *#173, #212* | *#165, #170* | Trouble testing load file, Waiting on Matt to continue progress on download | 
| *10/18* | *210, #211, #212* | *#165, #173* | Upload almost done, Iliyan will help Derek | 
| *10/20* | *#165, #173, #203, #202* | *#204* | none | 

## Review

### Epics completed  

We completed 4 epics this sprint: Distances, Load File, Save File, and Trip Name

### Epics not completed 

We completed all the epics that we planned for.

## Retrospective

### Things that went well

We accomplished everything that set out to. We also spent more time on clean code and testing. Almost all pull requests had accompanying tests. We also had much better scrum meetings every class, which were effective enough that we rarely had to meet outside of class time. One strategy that helped our planning was breaking up the first few epics into tasks with descriptions before our sprint planning meeting. That allowed us to spend more time on figuring out our UI design for each feature together as a team. 

### Things we need to improve

This sprint we took too long as a team to recognize that one of our members was actually stuck, and not just procrastinating like he claimed. In the future we need to press harder when someone just says that they are still working on something, especially if it has been multiple meetings. Our test coverage also dipped toward the end of the sprint because we didn't really know how to write unit tests for some of the funtionality, especially the files.

### One thing we will change next time

We will be more attentive to group members that are taking multiple days to complete their tasks, offering help sooner rather than later.
