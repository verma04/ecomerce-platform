import { email } from "../ts-types";

const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, content }: email) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  try {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      pool: true,

      // true for 465, false for other ports
      auth: {
        user: "ecommerce.pulseplaydev@gmail.com", // generated ethereal user
        pass: "nkytojkpyziuqdpp", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "pulseplaydev@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      // plain text body
      html: content, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
