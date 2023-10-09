Build an API with Database Hackathon
Brief
Over the past week, you've learned PostgreSQL, connecting to external databases, using .env files and more. It's time to put these skills into practice by building a robust API. The challenge at hand is to design, implement, and deploy an API using a managed PostgreSQL database hosted with a third-party provider like ElephantSQL.

Objectives
Design and create a database schema by writing SQL statements to define tables and relationships.
Write a SQL script to set up the database schema, creating any necessary tables and columns.
Connect to an external PostgreSQL database from a Node/Express app using the pg package.
Secure the database credentials within environment variables accessed from a .env file.
Implement basic CRUD API routes in Express that query the database and return JSON responses.
Return appropriate HTTP status codes and messages based on API request outcomes.
Development Rules
Work in pairs or threes, using the Driver-Navigator approach for coding. Make sure to switch roles regularly!
Make frequent, small commits to track and manage changes easily.
Plan before you code. Write pseudocode as comments in your JavaScript file so it acts as a roadmap when you start to code. Break down each step and think through the logic.
Remember: The goal is to solve the problem before you even start coding in JavaScript. Think of the actual code as simply translating your well-thought-out plan into syntax the computer understands. Working this way will make the development process more organised. Good software development is as much about planning and understanding as it is about writing the code.

Technical Requirements
Programming Language: JavaScript
Environment: Node.js
UI: None (Thunder Client/API responses)
Data Source: A Hosted PostgreSQL Database
Response Specification: All JSON responses from your API should adhere to the JSend specification. This specification provides a consistent structure for your responses, making your API more predictable and easier to interact with.
HTTP method

Path

Request body (JSON)

Response body (JSON)

Status code

Description

GET

/resource

N/A

List of resources

200

Retrieve all resources

GET

/resource/:id

N/A

A particular resource object

200

Retrieve a specific resource by its ID

POST

/resource

New resource object

A newly created resource object

201

Create a new resource

PATCH

/resource/:id

Edited resource object

An edited resource object

200

Update the details of a specific resource

DELETE

/resource/:id

N/A

A deleted resource object

200

Remove a specific resource by its ID

Milestones
Plan and design your database schema (You should have a minimum of 2 tables that are linked with a primary and foreign key)
Write a database initialisation script. Create a SQL script that will:
Drop any existing tables (if they exist)
Recreate all the tables based on the schema
Populate the tables with some initial seed data
Plan out your API routes and resources. Create your requirements tables similar to the one above.
Set up a basic Express server with a test route, logging middleware and nodemon.
Implement CRUD operations using the pg package to interact with your database.
Test the API using tools like Postman or Thunder Client.
Stretch Goals
The stretch goals below are optional, so feel free to come up with your own too.

Advanced Routing with Query Parameters
Search: Add a search feature on the /resource endpoint. For instance, /resource?name=ResourceName could return resources with names matching the query.
Sorting: Allow sorting of resources. For instance, /resource?sort=name could return resources sorted alphabetically by name.
Error Handling and Responses
If a resource with a specific ID isn't found, return a 404 Not Found status code and a clear error message.
For other errors, such as server errors or bad request data, return appropriate status codes like 500 Internal Server Error or 400 Bad Request with clarifying error messages.
Implement middleware for error handling in your Express server.
In a separate repository, create a frontend for your API and use a UI and fetch to interact with it.
Presentation Guidelines
Prepare a 4-minute end-of-day demo.
Each team will present to a coach.
Each team member must participate in the presentation.
Evaluation Criteria
Teamwork: How well did the team work together? What worked well? What would you change for next time?
Presentation: Was the presentation clear, concise, and kept on time?
Plan Quality: How well was the project planned out? Did they create and follow a requirements table for their chosen resource? Did they plan their database tables/schema?
Code Quality: Is the code clean, formatted and organised?
Git Practices: Were changes documented with frequent, clear commits?
Functionality: Does the API work as intended, and is it RESTful?
Completion: Are all required features implemented?


