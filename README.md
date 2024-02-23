# Northcoders News API

The intention of this project is to mimic the building of a real world backend service (such as Reddit) which should provide information to the front end architecture.

Here is a link to the hosted version: https://nc-news-project-djbv.onrender.com/

## How to run this project locally

This repo was written using `Node.js version 21.4.0` and `PostgreSQL version 15.5`. Earlier versions may not be compatible.

### Cloning, setup and how to run tests:

Firstly, clone the repository and change to the correct directory:

- `git clone https://github.com/benmccarrick/nc_news_project.git`
- `cd nc_news_project`

Then, you will need to create **two** .env files for the testing and development environments:

- `.env.test`
- `.env.development`

At the top of each .env file, add `PGDATABASE=`**database_name** >> inserting the correct database name for that environment (see /db/setup.sql for these database names). Double check that both .env files are .gitignored.

Next, install dependencies with the below command:

- `npm install`

Finally, create and seed the databases by doing the following:

- `npm run setup-dbs`
- `npm run seed`

To run all tests:

- `npm test`

To start the server, which will be running on http://localhost:9090 by default, run the below:

- `npm start`

