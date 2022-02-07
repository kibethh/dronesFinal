### Drones

## This Project is built with NodeJs/NextJs which are just JavaScript.

# I used MongoDB as a database which only works locally.

To test the project, NODEJS and MONGODB have to be installed in your computer.
Then run: "npm install" to install the packages I have used.

After all packages have installed, make sure the MONGODB server is running then run "npm run seeder" to preload the database with some test data

You can then run in development mode by running "npm run dev" command.

You can run also in production mode by first building the project using "npm run build" command and then run "npm start"

#### REST API ENDPOINTS

## Getting all the drones from the database - GET REQUEST

http://localhost:3000/api/drone - This endpoint also initiates the periodic task for decreasing the battery levels

## Registering Creating a New drone - POST REQUEST

http://localhost:3000/api/drone

## Loading a drone with medication - POST REQUEST

http://localhost:3000/api/drone/:droneID

## Items in a given drone - GET REQUEST

http://localhost:3000/api/droneItems/:id

## Available drones to be loaded - GET REQUEST

http://localhost:3000/api/drone/available

## Checking battery level - GET REQUEST

http://localhost:3000/api/drone/battery/:droneId

### Battery levels can also be checked from the command line where the server is running, the battery decrease by 10% after every 20 seconds
