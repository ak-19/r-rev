# Restaurant review demo

Restaurant review prototype project

---

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### NOTE: Installed latest versions of nodejs and npm needed

## Install dependencies

    # server dependencies:
    $ npm i
    # client dependencies:
    $ cd /client
    $ npm i

## Configure app

## 1. Setting up database

#### Mongo db is used as database server to persist data. Before runing server following environment varibale needs to be setup:

    process.env.MONGO_URI

This variable need to hold connection string to mongo database. If it doesn't exist server will try to use local mongo database. This might be convenient for local development.

## 2. Running the project

    $ npm start

## 3. Running project locally for dev purposes

    $ npm run dev

#### This will run server and client apps concurrently

## 4. Simple build for production

    $ npm run build-client

#### This will produce public folder with client optimised for production. Client will be available through server root path

## 5. Login into app

On fist run server will make administrative user account, this can be used to edit/delete other accounts and data.

    email: "admin@admin"
    password: "admin"
