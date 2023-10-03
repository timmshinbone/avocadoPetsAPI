// seedPets.js will run with the command `npm run seed`

// this will seed the db with a buncha pets

const mongoose = require('mongoose')
const Pet = require('./pet')
const db = require('../../config/db')

const startPets = [
    { name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    { name: 'Leroy', type: 'dog', age: 10, adoptable: true},
    { name: 'Biscuits', type: 'cat', age: 3, adoptable: true},
    { name: 'Hulk Hogan', type: 'hamster', age: 1, adoptable: true}
]

// first connect to the db
// then remove all pets without owners
// then insert the startpets
// then ALWAYS close the connection from this file

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Pet.deleteMany({ owner: null })
            .then(deletedPets => {
                console.log('the deleted pets: \n', deletedPets)

                Pet.create(startPets)
                    .then(newPets => {
                        console.log('new pets added to db: \n', newPets)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log('an error occurred: \n', error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log('an error occurred: \n', error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log('an error occurred: \n', error)
        mongoose.connection.close()
    })