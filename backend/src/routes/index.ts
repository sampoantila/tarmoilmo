import express from 'express';

const router = express.Router();

/* GET root */
router.get('/', (req, res) => {
    res.send('Tarmo ilmo - REST API usage only.');
});

router.get('/favicon.ico', (req, res) => {
    res.status(200).send('');
});

router.get('/robots.txt', (req, res) => {
    res.status(200).send('');
});

export default router;
