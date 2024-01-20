const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sessionMiddleware = require('./middleware/sessionMiddleware');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(sessionMiddleware);
// Session setup 
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
app.get("/",(req,res)=>{
    res.render("./layouts/mainLayout",{pageTitle:"Easily",currentUser:req.currentUser,content:null});
});
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

// Wildcard route for 404
app.get('*', (req, res) => {
  res.status(404).render('errors/404');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
