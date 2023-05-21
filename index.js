const { createServer } = require('http');
const express = require('express');
const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

const port = process.env.PORT;
const serviceID = process.env.SERVICE_ID;
const templateID = process.env.TEMPLATE_ID;
const publicKey = process.env.EMAILJS_API_PUBLIC_KEY;
const privateKey = process.env.EMAILJS_API_PRIVATE_KEY;

const app = express();
const httpServer = createServer(app);

const sendMail = async (user) => {
  const templateParams = {
    name: user.name,
    email: user.email,
    message: user.message
  };

  const response = await emailjs.send(serviceID, templateID, templateParams, {
    publicKey: `${publicKey}`,
    privateKey: `${privateKey}`
  });

  return response;
};

app.use('/public', express.static('public'));
app.use('/src', express.static('src'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/src/modal', (req, res) => {
  res.sendFile(__dirname + "/src/modal.js");
});

app.post('/', (req, res) => {
  sendMail(req.body).then(response => {
    if (response.status === 200) {
      res.status(200).send("Message has been sent.");
    } else {
      res.status(200).send("Something worng! Please, try again later.");
    }
  });
});

httpServer.listen(port);