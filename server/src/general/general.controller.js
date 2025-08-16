import { HTTP_STATUS } from "../constants/httpStatus.js";
import GeneralService from "./general.services.js";
import { contactUsFormSchema } from "./general.schema.js";

const generalService = new GeneralService();

export const handleContactUsForm = async (req, res) => {
  const { name, email, subject, message } = contactUsFormSchema.parse(req.body);

  const result = await generalService.sendContactFormEmail(
    name,
    email,
    subject,
    message,
  );

  res.status(HTTP_STATUS.OK).json(result);
};
