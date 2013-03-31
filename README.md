
#BEcoPolis

Is a learning personal project. I wanted to learn more about nodeJS and socketIO and decided to make a mini-mini-game.

Terms:
- "the thing" - the main entity of the game, in this case a city (can be a human, a bird, or any concept)
- "question" - The project can run with any kind of questions/statements/quiz, is a list of statements that can be
answered with Yes/No


 The "game" flow is :
* player choose a name
* answer a question/fact with Yes/No each X seconds
* each question affects an attribute of "the thing" positive or negative (yes/no)
* hopefully uses the social share buttons.

Questions are about "a thing". Didn't wanted to make a waste so I choose the "eco" area,
putting "the thing" as a city.

The "game" by design doesn't need a real-time connection, the only feature that uses it are the pop-up messages (X
player answered positive/negative), but servers well as a simple example.

Remember is just a learning project, not optimized and not secured.
I hosted the server side on AppFog, there are others free cloud hosting that you can use like Heroku.
"The thing" in this case is single instanced, but can be easily extended to server rooms/instances to server multiple
 "things".
 
 Persistance
 "Things" attributes values persists between server restarts using 2 files from the client (get and set.php). In production a real database must be used directly with nodejs. The "save" function is called using a javascript interval on server side.

### 1. Server requirements
- nodeJS http://nodejs.org/download/
- npm installs (https://npmjs.org/) modules for nodejs
 express, request, socket.io, underscore
 - to install them go to "/server" folder and run "npm install express" etc
 - at the end the "/server/" must look like this
 --/server/node_modules/
 ----------------------/.bin/
 ----------------------/express/
 ----------------------/request/
 ----------------------/socket.io
 ----------------------/underscore
 --/server/app.js
 --/server/city.js
  
Extra:
- for AppFog http://rubyinstaller.org/ to push the changes on their servers 

### 2. Client requirements
- web server with PHP 5
- write permission to "/client/data.json" file

### 3. Run server localhost
 - install nodejs modules (see #1 Server requirements). 
 - open a command prompt, go to "/server" folder run "node app.js"
 - for debug mode set app.js DEBUG = true (for more debug info in nodejs console)

### 4. Resources
http://www.treehugger.com/
http://www.worldwatch.org/resources/go_green_save_green

### 5. Online
The project is online here http://bcardgames.com/ecopolis/

### 6. License - GNU - keep any derived software free


