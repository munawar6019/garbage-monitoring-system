const functions = require("firbase-functions");
const nodemailer = require("nodemailer");
require("dotenv").config();

const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

// eslint-disable-next-line max-len
exports.sendEmailNotification = functions.firestore.document("submission/{docId}").onCreate((snap, ctx) => {
  const data = snap.data();

  const authData = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD},
  });

  authData.sendMail({
    from: "zeeshanalibenifshi@gmail.com",
    to: `${data.email}`,
    subject: "Dustbin Notification",
    text: `${data.email}`,
    html: `${data.email}`,
    // eslint-disable-next-line max-len
  }).then((res)=>console.log("successfuly sent email")).catch((err)=>console.log(err));
});
