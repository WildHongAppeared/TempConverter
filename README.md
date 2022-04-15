# TempConverter
### How to run
1. Install NodeJS (Version 16 and above) from https://nodejs.org/en/download/
2. Open a terminal session, navigate into the root directory of the project and run ```npm install```
3. After the previous command has completed, run ```npm run start``` to start the app
4. The terminal should have a message ```App stated on port 3000``` stating that the program has successfully started
5. If you navigate to localhost:3000 on your web browser, you should see a Hello World! message
### API Doc
If you are running the app locally, you should be able to access the temperature conversion API using the route
```POST localhost:3000/temperature/convert/{{type}}```
##### URL Parameters
```type``` (required) : A string value denoting the type of temperature measurement to convert to. Only accepts values ```fahrenheit``` or ```celsius```
##### Body
```temperature``` (required) : A numeric value denoting the temperature to convert based on the ```type``` url parameter

### Technical Decisions
##### Framework
1. The programming language used in this project is NodeJS using the [ExpressJS](https://expressjs.com/) library
2. The reasoning behind using NodeJS is that the requirements for this project doe not have very complex computation task, which is perfect for NodeJS's asynchronous model. Since there is no need to perform complex computation task, the biggest issue regarding this project would be the scalability which NodeJS has no issue managing due to its non-blocking nature. Another aspect is the event-based model. When using a common language for both client/server-side, synchronization happens fast, which is especially helpful for event-based applications such the current project where you sent a request and expect a transformed output
3. The reasoning behind using ExpressJS is that ExpressJS provides a powerful but minimalist set of features for API development. It is incredibly lightweight and is built on top of NodeJS, allowing easy organization of NodeJS code into the much more readable MVC architecture. ExpressJS also allows easy addition of middlewares into the API routes, enabling easy setup for features such as authentication, data transformation and much more robust features. Setting up a web server listening to a particular port on NodeJS is as simple as below
```
const express = require('express')
const app = express()
app.listen(3000, () => {
  console.log(`App started on port 3000`)
})
```
4. There is no database or ORM used in the project as the purpose of the project is only for computation of temperature and no persistent storage is needed. A caching mechanism such as Redis can be considered if there is very high throughput for this project but with the current requirements, a persistent storage does not bring any added value
##### Code Architecture


## Plugins Used
1. [cheerio](https://cheerio.js.org/) - JQuery for NodeJS 

