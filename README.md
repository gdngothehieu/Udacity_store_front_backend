# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. To start your project

**You should know that :**

- Port for your server => 3000
- Port for your database => 5432
- Your source folder => `src`
- Your compiled folder => `dist`

**Make sure that you're inside the project root in your terminal**

You should install some dependencies by running `npm i` and write the name of each of the following :

- `bcrypt` : for hashing passwords
- `body-parser` : for parsing to json format
- `db-migrate` : for migrations
- `db-migrate-pg` : for migrations
- `dotenv` : for managing environment variables
- `express` : to make your app an instance of it
- `jsonwebtoken` : for generating JWTs and validating them
- `pg` : because I work on a postgres database
- `typescript` : to write your project in typescript

==> In addition to that you can install `db-migrate` globally by running : `npm i -g db-migrate` to use it globally

Also you should install some devDependencies by running `npm i -D` and write the name of each of the following :

- `@types/bcrypt` : for bcrypt package
- `@types/express` : for express package
- `@types/jasmine` : for jasmine package
- `@types/jsonwebtoken` : for jsonwebtoken package
- `@types/node` : for node
- `@types/pg` : for pg package
- `@types/supertest` : for supertest package
- `jasmine` : for running tests on your project
- `jasmine-spec-reporter` : for testing reporters
- `supertest` : for testing endpoints
- `ts-node` : for running `server.ts`
- `tsc-watch` : for running `server.js`

==> In addition to that you can install `ts-node` globally by running : `npm i -g ts-node` to use it globally

**All** these packages are listed in `package.json` file and you can install them all by running `npm i` in your terminal.

### 2. Scripts

Remember our scripts in `package.json` file :

- **To build your project** : in your terminal run

```
npm run build
```

- **To run your server from `server.ts` file** : in your terminal run

```
npm run start
```

- **To run your server from `server.js` file** : in your terminal run

```
npm run watch
```

_( preferable as if you save any change, it restart the server itself )._

- **To test your project** : in your terminal run

```
npm run test
```

--> First, it deletes the TEST_Database created on the configuration `test`, then it creates another one through configuration `create`.

--> It runs migrations on this TEST_Database , rebuild the project and then runs tests on it.

--> Finally it deletes this database.

## NOTE :

I put `process.env.MY_ENV = 'test'` in `reporter.ts` file (its path : `./src/**/tests/helpers/reporter.ts`) instead of setting it in the script itself so that `jasmine` can read it and run tests on this environment, and you'll see the word `test` is looged to the terminal before jasmine is starting to run.

### 3. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A show route: '/products/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: products (id:number, name:varchar, price:number, category:string)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 4. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages `dotenv` and `db-migrate` (if nor added) that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

I connect to the database through `dotenv` package that is imported in `database.ts` file, so through this file I can connect to either my `dev` database or my `test` one.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

You should match your `database.json` file content with your environment variables as shown in my project.

First, create your migration :

**Example**: run in terminal `db-migrate create users-table --sql-file`.
Then, you can create tables in your database by running `db-nigrate up` in your terminal, and so on for each desired table.

Also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass, so I left a file named **`.env.variables`** that contains my variables names which you can use to assign them with your data so that you can run or test the project on your local machine.

### 5. Models

create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 6. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 7. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 8. Authentication By Express Middleware

I used a middleware named `verifyUser.ts` in Middlewares folder that prevents the request from completing untill it authenticates the user.

### 9. Tests

Tests were made for both ( models , endpoints ).

## NOTE :

- So as to run my tests on my `test` database, I set my environment variable `MY_ENV` to 'test' in `reporter.ts` file that exists in the path `./src/**/tests/helpers/reporter.ts`.

- It's important to realize that while testing there are tables that are created twice ( one for endpoint testing and another for model testing ), so I took this in consideration in my tests.

### 10. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
