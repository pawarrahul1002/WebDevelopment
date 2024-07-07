// Required modules
const User = require('../models/user');
const Feedback = require('../models/feedback.js');
const bcrypt = require('bcryptjs');

// Controller functions for admin actions

// Function to render admin dashboard
module.exports.admin = async (req, res) => {
    try {
        const employeeList = await User.find({ role: 'Employee' });
        res.render('admin', {
            title: "Admin | Dashboard ",
            employee: employeeList
        });
    } catch (error) {
        console.log(error);
    }
}

// Function to delete an employee
module.exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.query.id;
        await Feedback.deleteMany({ reviewer: id });
        await Feedback.deleteMany({ recipient: id });
        await User.findByIdAndDelete(id);
        req.flash('success', 'Employee successfully deleted');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

// Function to render update form for an employee
module.exports.updateForm = async (req, res) => {
    try {
        const employee = await User.findById(req.query.id);
        let feedbackByOther = [];
        const idofFeedbacks = employee.feedbackByOthers;
        if (idofFeedbacks.length > 0) {
            for (let index = 0; index < idofFeedbacks.length; index++) {
                let feedback = await Feedback.findById(idofFeedbacks[index]).populate('reviewer', 'name');
                if (feedback) {
                    feedbackByOther.push(feedback);
                }
            }
        }
        res.render('updateForm', {
            title: "Admin | Update Employee ",
            employee: employee,
            feedbacks: feedbackByOther
        });
    } catch (error) {
        console.log(error);
    }
}

// Function to update employee details
module.exports.updateEmployee = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.query.id, req.body);
        req.flash('success', 'Info Updated !!');
        res.redirect('/dashboard/admin');
    } catch (error) {
        console.log(error);
    }
}

// Function to render form for adding a new employee
module.exports.addEmployeeForm = (req, res) => {
    res.render('addEmployee', {
        title: "Admin | Add Employee ",
    });
}

// Function to add a new employee
module.exports.addEmployee = async (req, res, next) => {
    try {
        const { name, email, password, cnf_password } = req.body;
        const role = 'Employee';
        const userExist = await User.findOne({ email });
        if (!userExist) {
            if (password !== cnf_password) {
                req.flash('error', 'Password does not match !!');
                return res.redirect('back');
            }
            const cryptPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                role,
                password: cryptPassword,
            })
            req.flash('success', 'New employee created ');
        }
        else {
            req.flash('error', 'Email address already exist');
        }
        return res.redirect('/dashboard/admin');
    } catch (error) {
        console.log(error);
    }
}

// Function to assign a review to an employee
module.exports.assignReview = async (req, res) => {
    try {
        const employee = await User.findById(req.query.id);
        if (employee.reviewAssigned.includes(req.body.recipient)) {
            req.flash('error', 'Recipient already assigned to this user');
            return res.redirect('back');
        }
        employee.reviewAssigned.push(req.body.recipient);
        await employee.save();
        req.flash('success', 'Review Assigned');
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
