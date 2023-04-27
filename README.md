## **CONTEXT**

Listing API is an internal service from the company.
This service was working in an internal server, one day for an unknown reason, it stopped working and the company lost the project because the code wasn't uploaded to a repository.
This service doesn't have maintenance and the team that developed this no longer works at the company.
It was possible to recover some files from this project, such as `sequelize models`, `listingController.js` and `package.json`, in old internal folders.

The developer team tried to get information from this, but the people who assigned us the project couldn't answer some specific questions about it.
This is the result of the following document: 
`https://docs.google.com/document/d/15bF5DUOa9mm7snna3L4cjy9d1f68F-iiJY7VZSgl39s/edit?usp=sharing`

The people who use this app doesn't have time to participate on a meet this week.

it was required for the developer team to develop a new project in the less time possible, using `listingController.js` and recreate a function who accepts a csv file and processes it in batches

## **THE API**

The developer team created a new project in nodeJS, express, Typescript, working in 3 layer architecture (controller, service, and repository) and uploaded it to GitHub so the next time they don't lose the project.

The app use express-jwt to validate the request, the developer team migrated it to the last version express-jwt and changed how to use decode to auth.

The team added tests of services and repositories, an upload service using `listingController.js` as an example, respecting the business logic, and the csv upload that supports thousands of records.

## **AUTHENTICATION**

To use this api is necessary to authenticate in the company oauth api. 

For develops: execute `npm run generateToken` to get an internal token.

Is necessary to add `Authorization: Bearer TOKEN` in the headers.

## **PATH**

-----------------------------------------------------------------------
**Method**: POST

**Path**: `/listings?listingId=LISTING_ID`

**Description**: update a listing and steps associated.

**Body example**:

```
{
    "companyName": "Company X",
    "steps": [ {
    "id": 5,
    "flowId": "1",
    "name": "name A",
    "step": [
       {
          "step1": "up new file",
          "step2": "save the file"
       }
    ]
}
```
-----------------------------------------------------------------------
**Method**: POST

**Path**: `/steps/upload`

**Description**: create a lot of steps in the batches processor.

**Body**: form-data .csv file extension

**csv example**: in the test folder as a file called `stepBulk.csv`.

**column of csv**
`flowId: number`
`name: string`
`step: JSON`
`listingFlow: JSON`

-----------------------------------------------------------------------

## **COMMAND**

`npm install` to install dependencies

`npm run dev` to developer in local using nodemon

`npm run start` to deploy project

`npm run generateToken` to generate a token from develop in local

`npm run migrate` to create table and update the db

`npm run unmigrate` to rollback update

`npm run seed` to insert data in the db

`npm run unseed` to remove data in the db

`npm run lint` to fix the code using eslint

`npm run test` run test

`npm run test:cov` run test with coverage

## **What's Next?**

It's necessary to collect information with the people that use this api to understand the models.
With this information, the developer team can document using swagger, for example.
