import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Books Controller';

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting All Books');

    let query = 'SELECT * FROM book';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'GET BOOKS', results);

                    return res.status(200).json({ results });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({ message: error.message, error });
                })
                .finally(() => connection.end());
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const createBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create A Book');

    let { author, title } = req.body;

    // don't use this statement for the real world development!!!
    let query = `INSERT INTO book (author, title) VALUES ("${author}", "${title}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Book Created', results);

                    return res.status(200).json({ results });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({ message: error.message, error });
                })
                .finally(() => connection.end());
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({ message: error.message, error });
        });
};

export default { getAllBooks, createBook };
