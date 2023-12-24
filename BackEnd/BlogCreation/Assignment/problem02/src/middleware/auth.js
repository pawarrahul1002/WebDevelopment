export const auth = (req, res, next) => {
  // Write your code here
  if(req.session.userEmail)
  {
    next();
  }
  else{
    res.redirect("/login")
  }
};
