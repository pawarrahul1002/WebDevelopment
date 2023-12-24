export const auth = (req, res,next) => {
    if (req.session.userEmail) {
        next();
    }
    else {
        console.log("redirected to login page");
        res.redirect("/login");
    }
};