'use strict';

const conn = new Mongo();

//Create the gameready database, and drop any existing collections
const db = conn.getDB("cpen442_db");
db.dropDatabase();

db.students.insert({
  '_id': '12345678',
  'name': 'Test Student',
});
