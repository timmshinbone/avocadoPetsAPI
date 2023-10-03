// import dependencies
const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Pet = require('../models/pet')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

//////////////////////////////////////////////////
// routes go here

// Create a Toy
// POST -> Create a toy and give that toy to a pet
// POST /toys/:petId
// we'll make it so that ANYBODY can give a pet a toy
// which means we wont requireToken
// our toySchema has some non-required fields
// so we'll use removeBlanks
router.post('/toys/:petId', removeBlanks, (req, res, next) => {
    // save the toy from req.body to a variable
    const toy = req.body.toy
    // isolate the pet id for ease of use
    const petId = req.params.petId
    // find the pet
    Pet.findById(petId)
        // make sure we have a pet
        .then(handle404)
        // push the new toy into the pet's array
        // save the pet
        .then(pet => {
            pet.toys.push(toy)
            
            return pet.save()
        })
        // send our info after the pet has been updated
        // .json({ nameOfObject: value })
        .then(pet => res.status(201).json({ pet: pet }))
        // handle any errors
        .catch(next)
})

// ONLY the owner of a pet can update or delete a pet toy
// PATCH -> Update a Toy
// PATCH /toys/:petId/:toyId
router.patch('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
    // save both ids to variable to easily use later
    const petId = req.params.petId
    const toyId = req.params.toyId

    // find our pet
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            // single out the toy
            const theToy = pet.toys.id(toyId)
            // make sure the user is the pet's owner
            requireOwnership(req, pet)
            // update the toy with req.body.toy
            theToy.set(req.body.toy)

            // return the saved pet
            return pet.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})

// Delete a Toy

// ONLY the owner of a pet can update or delete a pet toy
// DELETE -> delete a Toy
// DELETE /toys/:petId/:toyId
router.delete('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
    // save both ids to variable to easily use later
    const petId = req.params.petId
    const toyId = req.params.toyId

    // find our pet
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            // single out the toy
            const theToy = pet.toys.id(toyId)
            // make sure the user is the pet's owner
            requireOwnership(req, pet)
            // delete the toy from the pet
            theToy.deleteOne()

            // return the saved pet
            return pet.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})


// End of routes
//////////////////////////////////////////////////

// export router
module.exports = router