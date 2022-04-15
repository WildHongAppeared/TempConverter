# TempConverter
## How to run
1. Install NodeJS (Version 16 and above) from https://nodejs.org/en/download/
2. Open a terminal session, navigate into the root directory of the project and run ```npm install```
3. After the previous command has completed, run ```npm run start``` to start the app
4. The terminal should have a message ```App stated on port 3000``` stating that the program has successfully started
5. If you navigate to localhost:3000 on your web browser, you should see a Hello World! message
## API Documentation
If you are running the app locally, you should be able to access the temperature conversion API using the route
```POST localhost:3000/temperature/convert/{{type}}```
##### URL Parameters
```type``` (required) : A string value denoting the type of temperature measurement to convert to. Only accepts values ```fahrenheit``` or ```celsius```
##### Body
```temperature``` (required) : A numeric value denoting the temperature to convert based on the ```type``` url parameter

## Technical Decisions
##### Language & Framework
1. The programming language used in this project is NodeJS using the [express](https://expressjs.com/) library
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
##### Plugins Used
1. [express](https://expressjs.com/) - Minimalist API framework for NodeJS. Used to setup API services for this project
2. [helmet](https://helmetjs.github.io/) - A popular ```express``` middleware used to add secure HTTP headers to ```express``` request and response. Used to secure the API (Not a silver bullet but it gives a basic layer of protection against unwanted attacks)
3. [Jest](https://jestjs.io/) - A popular Javascript testing library. Used in this project to run unit tests
4. [supertest](https://github.com/visionmedia/supertest) - A HTTP library using [superagent](https://visionmedia.github.io/superagent/) to provide abstraction for testing HTTP APIs. Used to test the routes setup in the project
##### Project Structure
The code for the project is structured as below (Explanation after the image)

![image](https://user-images.githubusercontent.com/13820671/163561212-4eb9ea0a-1704-4c75-a301-b0f3e1baae19.png)
1. ```controllers/temperatureController.js```
 * Contains the logic for the routes in temperatureRouter.js. Ideally there should be one function in the controller corresponding to every route present in temperatureRouter and complex functions should be abstracted to helpers or classes. For this project, this contains the function convertTemperature which is the logic used by the ```/temperature/convert/{{type}}``` route
    * For this kind of setup, each controller should represent the logic for one API service or "microservice". For example, if we have a new API service that provides distance conversion from KM to Miles and vice versa, here should be a distanceController.js and a corresponding distanceRouter.js. This gives us a clear separation of concern for each API service making it easier to maintain
2. ```routes/index.js```
    a. Contains the export logic for the routers under the ```routes``` folder, literally acting as an indexing code so that module imports are cleaner from other files
3. ```routes/temperatureRouter.js```
    a. Contains the routing logic for the temperature "service" (Only contains one route in this case). Using ```expressJS``` router capabilities allows us to define a top level service URL in the root ```index.js``` file which is ```/temperature``` and we can use individual router files under this ```routes``` folder to define sub-routing for each service. For example, for the temperature converter, we just define a route as ```/convert/:type``` 
4. ```test/index.spec.js```
    a. Contains the test suite specifications. Further explanation under the **Test Suite** section
5. ```constants.js```
    a. Contains the declared constants used across the projects. Currently only present in the root folder as this is a small project. If the project supports multiple services, there should be a constant file defined for each controller to better separate the services with the exception of global shared constants such as shared error messages 
6. ```helper.js```
   a. Contains the helper and utility functions used by the controllers. Logically, if there is a global utility function used by all services then it should be in the root helper function. There can also be a helper file declared for each controller for service specific utilities
7. ```index.js```
    a. Contains the logic required to start the ```expressJS``` server. This could also include logic for initiation of database connection, loggers, top level error handlers, etc. which are used by the entire program
8. ```package-lock.json```
    a. Lockfile for Javascript projects. This describes the exact dependency tree that was generated, such that subsequent ```npm installs``` are able to generate identical trees, regardless of intermediate dependency updates. This file should not be manually updated and only updated if there is new dependency introduced
9. ```package.json```
    a. The package.json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.
##### Test Suite
1. The test suite for this project is setup using the ```Jest``` and ```supertest``` library. 
2. Reason for using this 2 libraries is that both libraries together provides a robust testing and assertion mechanism to be able to run request against the ```express```server as if it is running in the web. ```supertest``` provides a simple mechanism to send a request to the route and a proper HTTP response in return, allowing us to use ```Jest``` to perform the assertions against the expected and actual results.
3. Testing strategy for this project is to have the test suite cover the functionality provided by the controllers. This means that we run test cases against the routes itself using ```supertest``` just like how users would call the API.For example, the unit test in ```index.spec.js``` covers scenarios such as
    a. Converting Celsius to Fahrenheit
    b. Converting Fahrenheit to Celsius
    c. Error testing by passing a ```type``` value that is neither ```celsius``` or ```fahrenheit```
    d. Error testing by passing a ```temperature``` value that is not an number
This gives us a meaningful coverage of the business cases for the temperature conversion service without getting too much into the technical implementation behind the hood

