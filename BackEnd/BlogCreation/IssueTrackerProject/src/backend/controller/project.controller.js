import { Project } from "../models/projects.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export default class ProjectController {
  async addProject(req, res) {
    try {
      // console.log(req.name);
      const { name, description, author } = req.body;
      const project = await Project.create({
        name,
        description,
        author,
      });

      // return res
      //   .status(201)
      //   .json(new ApiResponse(200, project, "Project added successfully"));

      const projects = await Project.find();
      res.render("projects",{projectAdded:true,projects:projects})

    } catch (error) {
      console.log(error.message);
      throw new ApiError(
        500,
        "Something went wrong while adding the project",
        error
      );
    }
  }

  async getProjectForm(req,res)
  {
    res.render("addProjectForm");
  }

  async getAllProjects(req, res) {
    try {
      const projects = await Project.find();
      // return res
      //   .status(200)
      //   .json(new ApiResponse(200, projects, "Projects fetched successfully"));


        
      res.render("projects",{projects:projects})

    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while fetching the projects",
        error
      );
    }
  }

  async getProjectById(req, res) {
    try {
      const projectId = req.params.id;
      console.log("Id:", projectId);

      const project = await Project.findById(projectId);
      if (!project) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "Project not found"));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, project, "Project found"));
    } catch (error) {
      console.error(error);
      throw new ApiError(
        500,
        "Something went wrong while fetching the project",
        error
      );
    }
  }

  justPrintId(req, res) {
    // const projectId = req.params.id;
    res.send("req recieved");
  }
}
