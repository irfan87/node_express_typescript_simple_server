import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import BookRoutes from './routes/BookRoutes';

const NAMESPACE = 'Server';
const router = express();

// logging the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: ${req.method}, URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: ${req.method}, URL: [${req.url}], IP: [${req.socket.remoteAddress}], STATUS: [${req.statusCode}]`);
    });

    next();
});

// body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// rules of the api
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST PATCH DELETE PUT');

        return res.status(200).json({});
    }

    next();
});

// routes
router.use('/books', BookRoutes);

// error handling
router.use((req, res, next) => {
    const error = new Error('Not Found!');

    return res.status(404).json({ message: error.message });
});

// create the server
const server = http.createServer(router);
server.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server is running on port ${config.server.hostname}:${config.server.port}`);
});
