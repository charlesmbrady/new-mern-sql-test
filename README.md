# MERNolithic_sql

MySQL-Express-React-Node app with custom webpack config, docker, CI config, test suites, and JWT authentication stored as cookie

- Staging environment: https://mernolithic-sql-staging.herokuapp.com/
- Production environment: https://mernolithic-sql-production.herokuapp.com/

## Getting started

1. Update project name and urls for github in package.json
   - Name
   - repository: url
   - bugs: url
   - homepage: url
2. Create `.env` file in project root with following properties

   ```MYSQL_USER= "root"
   MYSQL_PASSWORD= "12345678"
   MYSQL_HOST= "localhost"
   AUTH_SECRET=your_auth_secret_key
   ADMIN_USER_PWD=admin_password
   USER_PWD="12345678"
   FORCE_SYNC= false
   ```

3. Run `yarn install` from the project root to install project dependencies

4. `cd backend` and run `yarn install` to install backend server dependencies

5. `cd frontend` and run `yarn install` to install frontend React dependencies

6. Run `initialize.sh` command from the project root to automatically create staging and production Heroku remotes with MySql databases provisioned and deployed

7. You can run the application locally by running command `yarn start-dev` from the project root to start the server on localhost:8080, and then `cd frontend` in another terminal and run `yarn start-dev` to start the Webpack dev server for the React frontend which you can view at localhost:8081
   this has hot reloading for easier development

8. To setup circleci, first go to your dashboard on circleci.com. Click "Add Project" and choose the repo for your project. Then select "Build Now" to start building the project. Update the "working_directory" variable at the top of ~/.circleci/config.yml to match your repo name as well

9. to rename your Heroku staging and production apps, use command `heroku apps:rename --remote staging newname`. Insert the desired name of the app instead of "newname" and you can select the "production" remote instead of staging to rename produciton as well

## Deploying to Heroku

- After running the `initialize.sh` script, you will have a Staging and a Production environment already deployed to Heroku.

- To deploy whatever is on your git master branch again later, use command `git push staging master` or `git push production master` depending on which environment you want to deploy

## Testing

You can easily run tests against your different environments with these commands. After the tests complete, your browser will automatically open with the test results report. If you ran in the local environment, it will also open a fullstack coverage report of your entire project.

**Local**

> `yarn test:local:test-and-report`

**Staging**

> `yarn test:staging:test-and-report`

**Production**

> `yarn test:production:test-and-report`

### Results

- Run tests and generate a test report using mochawesome. From the root, use command `test:create-reports` which will run all `cypress/integration/*-spec.js` files. Then you can open the `cypress/reports/integration/public/report.html` file to view the test report in the browser

### Code Coverage

- run tests using cypress.io. From the root, use command `yarn dev:coverage` which will open the test runner. Then select "run all specs" to run all the tests. Then you can open the `coverage/lcov-report/index.html` file to view the fullstack code coverage report in the browser
- `npx nyc report --reporter=text-summary` will print out a coverage summary in the console

#### Helpful Links

Starting with React/Webpack/Babel from scratch - https://www.valentinog.com/blog/babel/
Using CSS Grids - https://css-tricks.com/snippets/css/complete-guide-grid/
Help with SQL associations and file seperation - https://github.com/sequelize/sequelize/issues/4578

- [Sequelize Queries](http://docs.sequelizejs.com/en/latest/docs/querying/)
- [Sequelize Associations Part 1](http://docs.sequelizejs.com/en/latest/docs/associations/)
- [Sequelize Association Part 2](http://docs.sequelizejs.com/en/latest/api/associations/)
- [Sequelize Migrations](http://docs.sequelizejs.com/en/latest/docs/migrations/)
- [bcrypt (NPM)](https://www.npmjs.com/package/bcrypt)
- [Awesome video on cypress fullstack code coverage](https://www.youtube.com/watch?v=C8g5X4vCZJA)

# notes

- have to remove codeCoverage url from cypress.json for tests to run in cI
