const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author"
    },
    rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Book', bookSchema);






// const authorSchema = new Schema(
//   {
//     name: String,
//     country: String,
//     favFood: String
//   }
//   );
// const bookSchema = new Schema(
//   {
//     title: String,
//     description: String,
//     //author: authorSchema, // Single Embedded documents
//     //authors: [authorSchema], // Array of embedded documents
//     author: {
//       type: mongoose.Schema.Types.ObjectId, ref: 'Author'
//       //type: Schema.Types.ObjectId, ref: 'Author'
//     }, // single reference  // [] mutliple reference (key in plural)
//     rating: Number
//   },
//   {
//     timestamps: true
//   }
// );

//module.exports = model('Book', bookSchema);