import express from 'express';
import uuidv4 from 'uuid/v4';
import mailService from '../services/mailService';

const router = express.Router();

router
.get('/:email', (req, res) => {
    const email = req.params.email;
    const token = uuidv4();

    mailService.sendAuthenticationMail(email, token);

    res.send('authenticate: ' + email + ' with token: ' + token);
})
.get('/validate/:token', (req, res) => {
    const token = req.params.token;
    
    res.send('authenticate validate token: ' + token);
});

export default router;
