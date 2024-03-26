import { Issue } from "../models/issues.model.js";
import { Project } from "../models/projects.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
const { Types } = mongoose;
export default class IssuesController {

  async getAllIssues(req, res) {
    try {
      const projectId = req.params.id;
  
      // Validate projectId
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
  
      // Find project by ID
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      // Find issues related to the project
      const issues = await Issue.find({ project: projectId });
  
      
      const currentPage = 'issues';

      res.render("issues",{currentPage, projectName: project.name, issues: issues })
      // Send JSON response with issues data
      // return res.status(200).json({ projectName: project.name, issues: issues });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong while fetching the issues" });
    }
  }
  
  getAddIssueForm(req,res)
  {
    res.render("addIssueForm");
  }

  async addIssue(req, res) {
    try {
      const { title, description, labels, author, projectId } = req.body;
      console.log(req.body);
  
      // Typecast the project ID to ObjectId
      // const projectId = new mongoose.Types.ObjectId(project);
  
      const projectFound = await Project.findById(projectId);
      if (!projectFound) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      const issue = new Issue({
        title,
        description,
        labels,
        author,
        project: projectId, // Use the converted ObjectId
      });
      const savedIssue = await issue.save();
      return res
        .status(201)
        .json(new ApiResponse(201, savedIssue, "Issue added successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(
        500,
        "Something went wrong while adding the issue",
        error
      );
    }
  }

  async filterIssues(req, res) {
    try {
      const { projectId } = req.params;
      const { labels, author, searchText } = req.query;

      let query = { project: projectId };
      if (labels) {
        query.labels = { $in: labels.split(",") }; // Filter by multiple labels
      }
      if (author) {
        query.author = author; // Filter by author
      }
      if (searchText) {
        query.$or = [
          { title: { $regex: searchText, $options: "i" } }, // Search by title
          { description: { $regex: searchText, $options: "i" } }, // Search by description
        ];
      }

      const filteredIssues = await Issue.find(query);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            filteredIssues,
            "Filtered issues fetched successfully"
          )
        );
    } catch (error) {
      console.error(error);
      throw new ApiError(
        500,
        "Something went wrong while filtering the issues",
        error
      );
    }
  }

}
