const axios = require("axios");
const { generateConfig } = require("../utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("../config/constants");
const { google } = require("googleapis");
const QueuePayement = require("../Model/QueuePayement.js");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works",
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getUser(req, res) {
  try {
    //console.log("request");
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getDrafts(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function readMailInsert(req, res) {
  try {
    //console.log(req);
    let subjet_message = "";
    let from_message = "";
    let to_message = "";
    let date_message = "";
    let pattern = /(\d+(\.\d+)?)|(\.\d+)/;
    req.messages.forEach(async (element) => {
      const url = `https://gmail.googleapis.com//gmail/v1/users/ralux.zepeda@gmail.com/messages/${element.id}`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
      let data = await response.data;
      //console.log(data.payload.headers.find((x) => x.name === "Subject")).value;
      data.payload.headers.forEach((element) => {
        switch (element.name) {
          case "Subject":
            //console.log(element.value);
            subjet_message = element.value;
            break;
          case "To":
            //console.log(element.value);
            to_message = element.value;
            break;
          case "From":
            //console.log(element.value);
            from_message = element.value;
            break;
          case "Date":
            date_message = element.value;
          default:
            break;
        }
      });

      var splitValue = data.snippet.split(" ");
      var RE = /^\d*\.?\d*$/;
      var amountTransaction = 0;
      for (var i = 0; i < splitValue.length; i++) {
        if (RE.test(splitValue[i])) {
          amountTransaction = Number(splitValue[i]);
          //console.log(Number(splitValue[i]));
          break;
        }
      }

      /* var doublenumber = Number(data.snippet.replace(/(\d+[,]?\d?)$/, ""));
      console.log(doublenumber); */
      //console.log(data.snippet.substr(snippetPosition, 5));

      QueuePayement.create({
        IdMail: data.id,
        Threadid: data.threadId,
        Snippet: data.snippet,
        From: from_message,
        To: to_message,
        Subject: subjet_message,
        ProcessedAmount: amountTransaction,
        Date: date_message,
      });
    });
    //res.json(data);
  } catch (error) {
    console.log("Error>> ", error.message);
    /*  res.status(500).json({
      message: error.message,
    }); */
  }
}

async function readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com//gmail/v1/users/ralux.zepeda@gmail.com/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    let data = await response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getMessageMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages?labelIds=IMPORTANT&q=from:notificaciones@promerica.com.sv `;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;
    //console.log(data.messages[0].id);
    //readMailInsert(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getMessageMailInsert(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages?labelIds=IMPORTANT&q=from:notificaciones@promerica.com.sv `;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    let data = await response.data;
    //console.log(req.params.email)
    //console.log(data.messages[0].id);
    readMailInsert(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getLabels(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/labels`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getUser,
  sendMail,
  getDrafts,
  //searchMail,
  readMail,
  getMessageMail,
  getLabels,
  getMessageMailInsert,
};
