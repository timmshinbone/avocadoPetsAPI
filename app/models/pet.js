const mongoose = require('mongoose')

const toySchema = require('./toy')

const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		adoptable: {
			type: Boolean,
			required: true,
			default: false
		},
		toys: [toySchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

// we define virtuals outside of the model

// virtuals allow us to derive additional data from our documents
// when a document is retrieved and turned to an object or turned into json, we'll tell mongoose to add our virtuals

// First virtual - Full title - gets a string derived from name and type
petSchema.virtual('fullTitle').get(function () {
	return `${this.name} the ${this.type}`
})

// this second virtual will tell us if the pet is a baby based on their age
petSchema.virtual('isABaby').get(function () {
	if (this.age < 5) {
		return "Yeah, theyre just a baby"
	} else if (this.age >= 5 && this.age < 10) {
		return "Not really a baby, but theyre still a baby"
	} else {
		return "A good old pet(definitely still a baby)"
	}
})

module.exports = mongoose.model('Pet', petSchema)
