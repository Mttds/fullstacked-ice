/*
Save new obj: node mongo.js "Jane Doe" "12345"
List objects: node mongo.js
*/

const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/phonebook";

mongoose.set("strictQuery", false);
mongoose.connect(url);

let name = ""
let number = ""

if (process.argv.length === 4) {
  name = process.argv[2];
  number = process.argv[3];
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name !== "" && number !== "") {
  const person = new Person({
    name: name,
    number: number,
  });
  
  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  // list phonebook content
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
