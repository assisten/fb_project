import nodemailer from "nodemailer";

const gmailAppPassword = "dryz urlf xjiu aerm";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "abdullahamjad7000@gmail.com",
    pass: gmailAppPassword,
  },
});

export const sendEmail = async (
  email: string,
  subject: string,
  body: string
) => {
  const mailOptions = {
    from: "abdullahamjad7000@gmail.com",
    to: email,
    subject,
    text: body,
  };
  return new Promise(async (resolve, reject) => {
    try {
      await transporter.sendMail(mailOptions);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
