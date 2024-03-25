import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
const app = express();

// === creating the first hhtpsRequest ===
app.get("/", (request, response) => {
  console.log(request);
  return response.status(302).send("Welcome to MERN stack");
});

// === this is the middleware ===
app.use(express.json());

// === Routes to save a new book ===
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: titel, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// === creating the routes to get all the books from the databases ===
app.get("/books", async (request, response) => {
  try {
    const allbooks = await Book.find({});
    return response.status(200).json({
      count: allbooks.length,
      data: allbooks,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// === creating the routes to get one books from the databases ===
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// === routes for the updating the database ===
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
    response.status(500).send({ message: error.message });
  }
});

// === route for deleting the book fromm the database ===
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }
    return response
      .status(200)
      .send({ message: "Book is deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

// === connecting with the mongoose ===
mongoose
  .connect(mongoDBURL)
  //   === handling the errors ===
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`The app is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
