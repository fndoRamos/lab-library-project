const express = require("express");
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();


// GET books by min rating
// router.get("/books", (req, res, next) => {
//     const minRating = req.query.minRating
//     //console.log(minRating);

//     let filter = {rating: {$gte: minRating}}

//     Book.find(filter)
//         .then(books => {
//             //console.log(books)
//             res.render("books/books-list", {books})
//         })
//         .catch(e => {
//             console.log("error", e);
//         });

// });


// READ: display all books
router.get("/books", (req, res, next) => {
  Book.find()
    .populate("author")
    .then((booksFromDB) => {
      console.log(booksFromDB);
      //res.send(`we have ${booksFromDB.length} books in our DB`)
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch((e) => {
      console.log("error getting list of books from DB", e);
      next(e);
    });
});

// GET /books/create    (display form)
router.get("/books/create", isLoggedIn, (req, res, next) => {
  Author.find()
    .then((authorsFromDB) => {
      res.render("books/book-create", { authorsArr: authorsFromDB });
    })
    .catch((e) => {
      console.log("error displaying book create form", e);
      next(e);
    });
});

// POST /books/create   (process form)
router.post("/books/create", isLoggedIn, (req, res, next) => {
  
  const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  };

  Book.create(newBook)
    .then(() => {
      res.redirect("/books");
    })
    .catch((e) => {
      console.log("error creating a book", e);
      next(e);
    });
});
// UPDATE BOOK display form
router.get("/books/:bookId/edit", isLoggedIn, (req, res, next) => {
  const { bookId } = req.params;

  let authors;

  Author.find()
    .then((authorsFromDB) => {
      authors = authorsFromDB;
      return Book.findById(bookId);
    })
    .then((bookToEdit) => {
      res.render("books/book-edit", { book: bookToEdit, authors: authors });
    })
    .catch((e) => next(e));

  // UPDATE: display form async await 
//   router.get("/books/:bookId/edit", async (req, res, next) => {
//     const { bookId } = req.params;

//     try {
//       const authors = await Author.find();
//       const bookDetails = await Book.findById(bookId);

//       res.render("books/book-edit.hbs", {
//         book: bookDetails,
//         authors: authors,
//       });
//     } catch (e) {
//       next(e);
//     }
//   });

  // Book.findById(bookId)
  //     .populate("author")
  //     .then(bookToEdit => {
  //         console.log(bookToEdit)
  //         res.render("books/book-edit", {book: bookToEdit})
  //     })
  //     .catch(e => {
  //         console.log("error finding the book by id". e);
  //         next(e);
  //     });
});
// UPDATE BOOK process form
router.post("/books/:bookId/edit", isLoggedIn, (req, res, next) => {
  const { bookId } = req.params;
  const { title, author, description, rating } = req.body;

  Book.findByIdAndUpdate(
    bookId,
    { title, author, description, rating },
    { new: true }
  )
    .then((updatedBook) => {
      res.redirect(`/books/${updatedBook.id}`);
    })
    .catch((e) => {
      console.log("there was an error updating the books info", e);
      next(e);
    });
});
// Delete book
router.post("/books/:bookId/delete", isLoggedIn, (req, res, next) => {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId)
    .then(() => res.redirect("/books"))
    .catch((error) => next(error));
});

// GET /books/:bookId
router.get("/books/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .populate("author")
    .then((bookDetails) => {
      //console.log(bookDetails)
      res.render("books/book-details", { bookDetails });
    })
    .catch((e) => {
      console.log("error getting details of a book", e);
    });
});

module.exports = router;
