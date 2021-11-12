# User Experience - Team *T25* 

The report summarizes user experience testing performed on the team's application.

Each developer should ask the user to accomplish one or more simple tasks while monitoring their efforts.  
The user should attempt to complete the tasks without any aid from the developer.
Use a pseudonym to identify the user below. 
Set a time limit and tasks for the user to perform.

 
### Tasks

Each user should complete the following tasks in 10 minutes.
Developers should not guide the user, but the user may ask for help as a last resort.  
Consider this a failure when it happens.  
#### Marking Locations 
* Can you mark any location on the map by clicking?
* Can you see that location is being added to your Trip?
* What information can you get from that Location?
* Try adding more locations to plan a trip.
* Are you able to find the distance required to go from point A to B to C etc?
* Whats your round trip distance? Is it easily visually accessible?

#### Marking Locations via Search
* Can you mark any location on the map by searching for an airport?
* Can you see that location is being added to your Trip?
* What information can you get from that Location?
* Try searching for more locations to plan a trip.
* Are you able to find the distance required to go from point A to B to C etc?
* Whats your round trip distance? Is it easily visually accessible?

#### Marking Locations via Search by Coordinates
* Can you mark any location on the map by searching for any real coordinates?
* Can you see that location is being added to your Trip?
* What information can you get from that Location?
* Try searching for more coordinates to plan a trip.
* Are you able to find the distance required to go from point A to B to C etc?
* Whats your round trip distance? Is it easily visually accessible?

#### Highlight a location
* Can you easily highlight a location in your trip so that it centers to that location on the map?
* Was it easy to find?

#### Deleting Places
* Can you delete a location from your trip?
* Can you delete your entire Trip?

#### Cant think of any Coords or Searches?
* Try our Random Feature!
* Is is easy to find?

#### Saving a Trip
* Can you save the trip you just created?
* Can you name that saved trip?

#### Loading a Trip
* Can you load a Trip we give you via file upload?
* Is it responsive? Does it load fast enough for you?

### Demographics

Age, nationality, and other background information can sometimes be helpful understanding the problems a user encountered.

| Pseudonym | Demographics |
| :--- | :--- |
| Throck the Traveller | Age: 19, Nationality: American, Major: CS, Gender: male |
| Gerald | Age: 19, Nationality: American, Major: CS, Gender: male |
| Tyler | Age: 19, Nationality: American, Major: CS, Gender: male |
| Hannah | Age:22, Nationality: American, Masters: Microbiology, Gender: female |
| Luma | Age: 22, Nationality: Lebanese-American, Major: Neuroscience, Gender: female |


### Observations

Note the users interactions with the system for each of the tasks.
Record the success, failures, and problems the user encountered for each task.
Note any aid that wass given along with anything you notice from their use of the application.
Add issues to GitHub for any changes necessary to the system.

| Task | problem, aid, observation | hi/med/low | github#  |
| :--- | :--- | :---: | :---: | 
| Searching by coordinates | didn't see the coordinate tab | Non-issue | | 
| Searching / random | Should have something so the user know they can click each result for more info | med | | 
| Upload a CSV | CSV that had just been downloaded didn't validate, investigate further | high | #350 | 
| Trip Options | Hard to find trip options. Changing 3 dots to bigger button would help | med | | 
| Distances | Making distances between places more clear would help | low | | 
| Highlight Function |Suggested that that we update the highlight button. Have the map centered when you click highlight so no scrolling | med | | 
| Random Places | The total number didnt make sense to the user | med | | 
| Naming Trip | if the user types "name.json" then the save will be named "name.json.json" | Non-issue | | 
| Trip | Define a start and finish on the map | low | | 
| Search by coords | Delimeters should be knwon for the user | Non-issue | | 
| Search for trip | Said that he can use infinite amount of characters | Non-issue | | 
| Trip Opt | Fix Spelling in Cancel | high | #371 |
| Set Map max zoom out | Set map to a maximum zoom out becasue you will see to USAs | high | |
| Page | recommended a welcome modal to explain what the page is for | low | |
