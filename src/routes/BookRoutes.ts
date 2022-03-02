import express from 'express';
import BooksController from '../controllers/BooksController';

const router = express.Router();

router.get('/get/books', BooksController.getAllBooks);
router.post('/create/book', BooksController.createBook);

export = router;
