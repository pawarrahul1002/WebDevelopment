import User from "../models/user.model.js";
import Feedback from "../models/feedback.model.js";

import bcrypt from "bcryptjs";
import { query } from "express";

async function admin(req, res) {
  try {
    const employeeList = await User.find({ role: "Employee" });

    res.render("admin", {
      title: "Admin | Dashboard",
      employee: employeeList,
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteEmployee(req, res) {
  try {
    const id = req.query.id;
    await Feedback.deleteMany({ reviewer: id });
    await Feedback.deleteMany({ recipient: id });
    await User.findByIdAndDelete(id);
    req.flash("success", "Empployee successfuly deleted");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
}

async function updateForm(req, res) {
  const employee = await User.findById(req, query.id);
  let feedbackByOthers = [];

  const idOfFeebacks = employee.feedbackByOthers;

  if (idOfFeebacks.length > 0) {
    for (let i = 0; i < idOfFeebacks.length; i++) {
      let feedback = await Feedback.findById(idOfFeebacks[i]).populate(
        "reviewer",
        "name"
      );

      if (feedback) {
        feedbackByOthers.push(feedback);
      }
    }
  }

  res.render("updateForm", {
    title: "Admin | Update Employee",
    employee: employee,
    feedback: feedbackByOthers,
  });
}

async function updateEmployee(req, res) {
  await User.findByIdAndUpdate(req.query.id, req.body);
  req.flash("success", "Info updated");
  res.redirect("/dashboard/admin");
}

async function addEmployeeForm(req, res) {
  res.render("addEmployee", {
    title: "Admin | Add Employee",
  });
}

async function addEmployee(req, res) {
  try {
    const { name, email, password, cnf_password } = req.body;
    const role = "Employee";
    console.log(name, email, password, cnf_password );
    const userExist = await User.findOne({ email });
    console.log("isUserExist", userExist);
    if (userExist===null) 
    {
      if (password !== cnf_password) {
        req.flash("error", "Password does not match");
        return req.redirect("back");
      }

      const cryptPassword = await bcrypt.hash(password, 10);
      const user = User.create({ name, email, role, password: cryptPassword });

      req.flash("Success", "New Employee added");
    } 
    else 
    {
      req.flash("error", "Email address already exist");
    }
  } catch (error) {
    console.log(error);
  }
}


async function assignReview(req,res)
{
    try{
        const employee = await User.findById(req.query.id);
        if(employee)
        {
            if(employee.reviewAssigned.includes(req.body.recipient))
            {
                req.flash("error", "Recipient id already assigned to this user");

                return res.redirect("back");
            }

            employee.reviewAssigned.push(req.body.recipient);
            await employee.save();
            req.flash("success", "Review assigned");
            
            return res.redirect("back");
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export{
    admin, 
    deleteEmployee,
    updateForm,
    updateEmployee,
    addEmployeeForm,
    addEmployee,
    assignReview
}
