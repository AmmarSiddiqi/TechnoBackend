import nodemailer from "nodemailer";

const mailtrapUsername = process.env.MAILTRAP_USERNAME;
const mailtrapPassword = process.env.MAILTRAP_PASSWORD;

export const mailTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: mailtrapUsername,
    pass: mailtrapPassword,
  },
});

export const emailOTPTemplate = (otp, name) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color:#1148ed;text-decoration:none;font-weight:600">Techno Marketplace</a>
      </div>
      <p style="font-size:1.1em">Hi, ${name}</p>
      <p>Thank you for choosing Tehcno Marketplace. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background:#1148ed;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Team TechnoMarketplace</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Techno Marketplace</p>
        <p>Eden Villas</p>
        <p>Lahore</p>
      </div>
    </div>
  </div>`;
};

export const emailWelcomeTemplate = (name) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color:#1148ed;text-decoration:none;font-weight:600">Techno Marketplace</a>
      </div>
      <p style="font-size:1.1em">Hi, ${name}</p>
      <p>Thank you for choosing Tehcno Marketplace. Your email has been successfully verified.</p>
      <p style="font-size:0.9em;">Regards,<br />Team TechnoMarketplace</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Techno Marketplace</p>
        <p>Eden Villas</p>
        <p>Lahore</p>
      </div>
    </div>
  </div>`;
};
