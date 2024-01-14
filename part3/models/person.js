const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  //name: String,
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  //number: String,
  number: {
    type: String,
    minLength: 1,
    required: true
  }
});
  
// override toJSON for personSchema
// so the _id and __v keys are not printed when querying mongodb
// also we define the id to be String(_id)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person
