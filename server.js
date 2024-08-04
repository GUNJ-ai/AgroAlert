const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = 3000;

const accountSid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 

const client = new twilio(accountSid, authToken);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { phoneNumber, message } = req.body;

    client.messages
        .create({
            body: message,
            to: phoneNumber,
            from: 'XXXXXXXXXXX', 
        })
        .then((message) => {
            console.log('Twilio Message SID:', message.sid); 
            console.log('Twilio Message Status:', message.status); 
            res.json({ success: true, message: message.sid });
        })
        .catch((error) => {
            console.error('Twilio Error:', error.message); 
            res.status(500).json({ success: false, error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

