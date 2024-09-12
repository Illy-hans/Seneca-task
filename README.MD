
## Seneca BE task - Stats Service

### Getting started

To run the app locally, clone the repository and install the dependencies.

```bash
git clone https://github.com/Illy-hans/Seneca-task
npm install
```

Set up a database connection by adding a MongoDB database URL into an .env file on the root. I would recommend using MongoDB compass here for visualisation. 

```bash
#.env
MONGODB_URL="your_mongodb_database_url_here"
```

Ensure the tests are passing.

```bash
npm test
```

Run the Typescript compiler and start the server. Optional - make a Postman request to the API.

```bash
npm run build
npm start
```

Build your Docker image.

```bash
docker build -t {your-image-name} .
```


<details>
  <summary> Task outline can be found here </summary>

<details>
  <summary>Task </summary>
  
Seneca BE task - Stats Service

```
Problem
Our learning platform needs to track a user's stats for a particular course. We do this using a stats service.

The task is to create a simplified version of this service. Your stats service needs to provide the capability to create new stats as well as updating stats. The stats managed by the service are created and updated via HTTP calls. Stats are posted on the completion of a learning session and reflect how the user did on the learning session.

The service interface is defined in the form of a swagger API, which can be found here.
Requirements
Stats are posted based on the completion of a learning session.
Stats can be fetched via an aggregated call which aggregates a user's stat history for a course they are studying.
Stats should also be fetchable for a single learning session.
The service should be easily runnable/startable & deployable on the AWS ecosystem by the reviewer of the task. 
Your solution should be written in Typescript, and run in a Node.js environment
The project should be submitted in the form of a Git repository, hosted on Github or Gitlab
Please state any assumptions or deviations from the specification in the repository readme.
Stats should be persisted using a database of your choosing
Your service should have some level of tests
A little elaboration of the terminology we use to garner a bit more context:
Course - refers to a course on a particular subject that a user is learning. A course is made up of learning sessions.

Session - refers to a learning session that a user studies. Sessions are made up of modules that display content.

Modules - display content to the user. There are 15 module types and these are used depending on the type of content that is being displayed.
```
</details>

<details>
    <summary>Swagger API outline</summary>

```
swagger: '2.0'
info:
  version: '0.0.0'
  title: 'Stats Service'
  description: 'Provides persistence of stats'
host: 'localhost:3000'
basePath: '/'
schemes:
  - 'http'
consumes:
  - 'application/json'
produces:
  - 'application/json'
paths:
  '/courses/{courseId}':
    post:
      description: 'Persists a session study event'
      parameters:
        - in: header
          description: Identifies the user
          name: X-User-Id
          type: string
          format: uuid
          required: true
        - in: path
          name: courseId
          required: true
          type: string
          format: uuid
          description: Identifies the course
        - in: body
          name: stats diff
          required: true
          schema:
            type: object
            properties:
              sessionId:
                type: string
                format: uuid
              totalModulesStudied:
                type: number
              averageScore:
                type: number
              timeStudied:
                type: number
                description: Type in milliseconds

      responses:
        '201':
          description: OK

    get:
      description: 'Fetches course lifetime statistics'
      parameters:
        - in: header
          description: Identifies the user
          name: X-User-Id
          type: string
          format: uuid
          required: true
        - in: path
          name: courseId
          required: true
          type: string
          format: uuid
          description: Identifies the course

      responses:
        '200':
          description: Course lifetime stats
          schema:
            type: object
            properties:
              totalModulesStudied:
                type: number
                description: The number of modules studied in the course
              averageScore:
                type: number
                description: The users average score of modules across the course
              timeStudied:
                type: number
                description: The total time spent studying a course

  '/courses/{courseId}/sessions/{sessionId}':
    get:
      description: 'Fetches a single study session'
      parameters:
        - in: header
          description: Identifies the user
          name: X-User-Id
          type: string
          format: uuid
          required: true
        - in: path
          name: courseId
          required: true
          type: string
          format: uuid
          description: Identifies the course
        - in: path
          name: sessionId
          required: true
          type: string
          format: uuid
          description: Identifies the study session

      responses:
        '200':
          description: Study session stats
          schema:
            type: object
            properties:
              sessionId:
                description: Identifies the session
                type: string
                format: uuid
              totalModulesStudied:
                type: number
                description: The number of modules studied in the session
              averageScore:
                type: number
                description: The users average score of modules in session
              timeStudied:
                type: number
                description: The total time spent in session
```

</details>

</details>


### Ideas for improvement

Implementing a middleware to validate the X-User-Id, courseId and sessionId are in fact correct UUID formats.

Build nested model structure that would have courseId as the main ID with users and sessions objects referenced. 
 Courses
    - courseId
    - user: userId/ user object reference 
    - sessions: list of Session objects from a seperate Session Model

More detailed error handling and more tests. 
