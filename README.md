# ExAuth-Server

## Running the server
1. To run the server, run `node server.js`
2. If you are missing dependencies, install them with npm. 
  E.g. `npm install mongoose`
3. To change the host and port the server is running on, change the variable definitions on line 8 and 9 in server.js
  NOTE: When running the server, HOST should be set to the public IP. Setting it to the string 'localhost' doesnt seem to work properly.

## Setting up MongoDB locally for development
1. Install MongoDB Community Edition from: https://docs.mongodb.com/manual/administration/install-community/
2. Create a /data/db directory. This is the default directory that is used, however you can also specify another directory if you want to (using the dbpath option when running mongod)
   NOTE: You can just make a local `data` directory in the directory you intend to run mongo like `mkdir data`
3. Run the mongod process by running `mongod`. You should see a bunch of terminal output that ends with "waiting for connections on port 27017"
   NOTE: If you setup a local `data` directory, then you'll need to point `mongod` there, so run `mongod --dbpath=data` 
4. To initialize the database with dummy data, open a seperate terminal and run the init script `mongo init_db.js`

## Querying the MongoDB:
1. Start the mongo shell by running `mongo`
2. Switch to the cpen442_db inside the mongo shell, by typing `use cpen442_db`
3. You can view all the collections in the `cpen442_db` by typing `show collections`
   - To see all the values in a specific collection just run: `db.{name of collection}.find()` (e.g. `db.students.find()`)
