import express from "express";
import IssuesController from "../controller/issues.controller.js";


const issuesRouter = express.Router();
const issuesController = new IssuesController();

issuesRouter.get("/issue-form", issuesController.getAddIssueForm);
issuesRouter.post("/issues",issuesController.addIssue);
issuesRouter.get("/issues/:id",issuesController.getAllIssues);
issuesRouter.get("/issues/:id",issuesController.filterIssues);

export default issuesRouter;