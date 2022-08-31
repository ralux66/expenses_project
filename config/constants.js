require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: process.env.MAIL_CONFIG,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

 const mailoptions = {
  from: "Raul Test &lt;ralux.zepeda@gmail.com>",
  to: "chatbotunity@gmail.com",
  subject: "Gmail API NodeJS",
}; 

module.exports = {
  auth,
  mailoptions,
};