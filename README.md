# SpacePants
A fun game for fun alien-.... humans!  I meant humans.

## The final product:
https://spacepants.herokuapp.com/#/

## The back end:
https://github.com/piwakawaka/SpacePants-BackEnd

## The game
You are an alien who has recently arrived on planet Earth.  Our species looks nothing like humans, but fortunately a new technology has been developed to help you seamlessly blend in: SpacePants!  In disguise, you will be safe from the humans as long as you behave just like them. Luckily, you have a certified huminologist back on your ship, who is sending helpful 'behaviour directives' to your communication device.  Make sure to complete as many directives as you can before the time runs out.  But be careful, if the humans suspect anything is awry, they may vote to kick you off the planet!

The goal of the alien is to complete as many tasks as possible in a time frame.  With each task completed, the remaining time decreases

The goal of the humans is to identify the alien before time runs out.  They win on a sucessful vote.

## The Tech

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js (SQL)](https://knexjs.org/)
* [Socket.io](https://socket.io/)

### MVP

- [x] The user should have the option to create a game session or join an existing one
- [x] On creating a room, they should be provided a code to give to others who can then join the same room
- [x] There should be a 'waiting room' where they can see people as they join, and select a 'start game' button when everyone is in
- [x] There should be a screen describing how to play the game
- [x] When the game starts, each playing should be given a role.  One person will be an alien, all others will be human
- [x] Each player will receive a task or hint based on their role
- [x] On the game screen a countdown will appear

#### Alien
- [x] The alien will be given a task to complete
- [x] Upon completing the task, they can check a box and receive a new task
- [x] If the alien does not want to do a certain task, they will have to pay a time penalty before receiving a new one

#### Humans
- [x] At random intervals, each human will receive a broadcast containing information about the alien.  This information may or may not be relevant
- [x] At any point a human (or an alien trying to blend in) may hit a vote button.  They will then accuse another player
- [x] After a discussion, all other humans will select agree or disagree on their own device.  If it passes by majority vote, the game ends.  If not, the time continues.  Each player can only call a vote once.

### Stretch

- [x] A sweet design
- [ ] Make available as a PWA

---


## Views

| Name | Purpose |
| --- | --- |
| LandingPage | Options to create or join a room.  How to play button |
| CreateRoom | Form to enter name.  Display unique code to share with others |
| JoinRoom | Form to enter name and game code |
| WaitingRoom | List of players as they join. Start Game button. |
| GameRoom | Displays playerRole, countdown, behaviour directives, human hints, call vote button |
| Vote | Gives humans options of agreeing or disagreeing with the called vote |
| Endgame | Displays final results of round |


## Reducers

| Name | Purpose |
| --- | --- |
| users | Store information about connected users |
| game | Manage information about game loop - points, roles etc |
| alerts | Manage information about behaviour directives and human hints |


## Actions
This might change when we figure out how socket.io works

### Users

| Type | Data | Purpose |
| --- | --- | --- |
| RECIEVE_USERS | users | Returns array of users |
| ADD_USER | User | Add new user to redux |

### Tasks

| Type | Data | Purpose |
| --- | --- | --- |
| GET_TASK | task | Retrieve a new task from the db |
| COMPLETE_TASK | task | Marks current task as complete |

### Hints

| Type | Data | Purpose |
| --- | --- | --- |
| GET_HINT | hint | Gets a new hint for a human |

## DB

### GameData

| Column Name | Data Type |
| --- | --- |
| id | increments |
| taskCategory | string |
| task | string |
| hint | string |

### Users

| Column Name | Data Type |
| --- | --- |
| id | increments |
| name | string |
| role | string |
| roomCode | string |
| socketId | string |


