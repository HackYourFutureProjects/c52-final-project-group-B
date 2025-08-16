import { createAndThrowError } from "../util/createAndThrowError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import nodemailer from "nodemailer";
import contactUsEmailTemplate from "../emails/contactUsEmailTemplate.js";

class GeneralService {
  async sendContactFormEmail(name, email, subject, message) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Memix" <${process.env.GOOGLE_EMAIL}>`,
        to: process.env.GOOGLE_EMAIL,
        subject: "[Memix] Contact Form Submission",
        html: contactUsEmailTemplate(name, email, subject, message),
      });

      return { message: "Contact form email sent successfully" };
    } catch (error) {
      createAndThrowError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Failed to send email",
      );
    }
  }
}
export default GeneralService;
