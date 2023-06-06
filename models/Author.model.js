const { Schema, model } = require('mongoose');

const authorSchema = new Schema(
    {
        name: String,
        age: Number,
        country: String,
        // books: [{
        //     type: Schema.Types.ObjectId,
        //     ref: "Book"
        // }],
    },
    {
        timestamps: true
    }
);

module.exports = model('Author', authorSchema);