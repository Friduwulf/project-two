const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const passport = require('passport');
//TODO: Uncomment to make use of database, once set up
const sequelize = require('./config/connection');
// for session env 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//Setup routes to the Server
//Look at /controllers folder
app.use("/", routes);

// configure express-session| For passport
app.use(session({
    secret: 'good secret',
    resave: true,
    saveUninitialized: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());




//TODO: Uncomment to make use of database, once set up
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    });
});

// app.listen(PORT, () => {
//   console.log(`Server is listening at http://localhost:${PORT}`);
// });
