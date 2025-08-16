import { Router } from "express";
import { handleContactUsForm } from "./general.controller.js";

const generalRouter = Router();

generalRouter.post("/contact-us", handleContactUsForm);

export default generalRouter;
