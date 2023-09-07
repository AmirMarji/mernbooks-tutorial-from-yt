import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from './config.js';


/**
 * init
 */
const app = express();

/**
 * index GET sends "welcome to the MERN Stack Tutorial" and a 234 status code
 */
app.get('/', (request, response) => {

    console.log(request);

    return response.status(234).send("welcome to the MERN Stack Tutorial");

});

/**
 *  /books POST makes sure all fields are populated and creates a newbook. then sends it with a 201 response code
 */
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title author, publishYear'
            });

        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,

        }

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }
    catch (error) {

        console.log(error.message);
        response.status(500).send({ message: error.message });

    }

});

/**
 * mongodb init
 */
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening on port: ${PORT}`);

        });
    })
    .catch((error) => {
        console.log(error);
    });