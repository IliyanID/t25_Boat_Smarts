# Sprint 4 - *25* - *Boat Smarts*


## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Caleb Cluett*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio==0).
* Minimize code smells and duplication.
* Use Single Responsibility Principle.

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


#### Shorter Trip
This will give the user the to choose a trip with a shorter trip. There will be two versions One-opt and Two-opt. Both of these algorithms should take under a second.
The user will be able to see the new map and list before they decide to keep the shorter trip.

#### User Experience
Team members will interview a non-cs314 person to give us feedback for the website. We will create a checklist for the feature we would like to try and use and a feedback form for the team to know what needs to be implemented next.

#### Modify Trip
The Modify Trip epic will allow the user to select a new starting location while maintaining the order of the destination, reverse the order of the trip from the starting location, reorder individual destinations, and let the user remove destinations.

#### Units
This will allow the user to set different units for distances traveled. These include kilometers, nautical miles, and letting the user choose their unit name and earth radius. The setting should be remembered across sessions.

#### Types
This will allow the user to find a place by their search criteria. This may include airport heliport, etc.
		
#### Country
This allows the user to search within a specific country.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *4* | *6* |
| Tasks |  *37*   | *48* | 
| Story Points |  *79*  | *92* | 



## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/27* | *#282, #292, #256, #234, #270, #269* | *#175, #254,255* |  | 
| *10/29* | *#261, #260, #175, #251, #252, #262, #141* | *#278, #277, #283, #254, #255, #275* | Modify Trip|
| *11/1* | | *#278, #277, #283, #254, #255, #275, #258, #257, #247* | |
| *11/3* | *#254, #319, #249, #283, #278, #257, #258, #245, #247* | *#255, #275, #325* | Nearest Neighber |
| *11/5* | *#275* | *#255, #325, #279, #276, #281* | |
| *11/8* | *#347, #221, #350* | *#225,#337,#325,#256,#246,#281, #276* | |
| *11/10* | *#284, #281, #276, #139, #325, #246, #334, #335, #224, #340, #255, #337, #280, #326* | *#248,#365,#364,#362* | Two-Opt, User Experience, Country, Types |
| *11/11* | *#248,#365,#364,#362,#322,#323*| | |



## Review

### Epics completed  

We have completed 6 Epics Nearest Neighbor, Two-Opt, User Experience Types, Modify Trip, and Country.

### Epics not completed 

We did not complete Three-Opt and Units Epics.

## Retrospective

### Things that went well

Throughout the sprint, we work well together to figure out Nearest Neighbor and Two-Opt algorithms. When one person got stuck, they asked for help. By the end, it took three people to complete each algorithm. We also got the chance to improve our test coverage and fix a lot of code problems brought up in the inspections.

### Things we need to improve

At the start, I think we didn't fully realize how much time the Nearest Neighbor and Two-Opt algorithms were going to take, so we ended up over planning and were forest to put Epics and tasks into the Icebox.

### One thing we will change next time

With it being our last sprint, the year coming to a close, and finals in the back of our minds, we need to think about how much we can get done and plan accordingly. 
