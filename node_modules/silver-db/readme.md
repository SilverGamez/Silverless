# Silver-DB
A basic json used database

### Install
```bash
npm install silver-db
````


### Import
```js
const silverdb = require('silver-db');
const db = new silverdb('pathToJsonFile'); //path to where you want the db to be for example: ./database/db.json | ./db.json | the default is ./silver-db.json
```


### Examples
```js
db.set('key', 'value'); //sets the value to the key
db.get('key'); //returns the value of the key
db.fetch('key'); //returns the value of the key
db.has('key'); //returns a boolean if the key exists or not
db.delete('key'); //deletes a key from the database
db.clear(); //deletes/clears the database
db.deleteAll(); //deletes/clears the database
db.all(); //returns all the keys [{key: 'key', data: 'value'}, {key: 'key2', data: 'value2'}]
db.add('key', 1); //adds the number to existing value if it is a number ( value + number )
db.subtract('key', 1); //remove the number from the existing value if it is a number ( value - number )
db.push('key', 'item'); //adds an item to an array
db.unpush('key', 'item'); //removes an item from the array
```