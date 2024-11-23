const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    user: 'email_cua_ban',
    pass: 'mat_khau_ung_dung'
    }
  });

module.exports =  transporter;
