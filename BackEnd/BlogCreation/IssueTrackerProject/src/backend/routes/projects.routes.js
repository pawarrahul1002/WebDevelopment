import express from "express";
import ProjectController from "../controller/project.controller.js";


const projectRouter = express.Router();
const projectController = new ProjectController();


projectRouter.get("/projects", projectController.getAllProjects)
projectRouter.post("/projects", projectController.addProject)
projectRouter.get("/project-form", projectController.getProjectForm)

projectRouter.get("/projects/:id", projectController.getProjectById);



export default projectRouter;