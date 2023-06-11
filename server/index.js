require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const morgan=require('morgan');
const helmet=require('helmet');

//module imports
const db=require('./db/db');
const registrationRoutes=require('./routes/users');
const loginRoutes= require('./routes/auth');
const messageRoutes=require('./routes/message')
const logoutRoutes=require('./routes/logout')

//connecting to database
db();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieparser());
app.use(cors());

//Routes
app.use('/api/register',registrationRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/msg',messageRoutes);
app.use('/api/logout',logoutRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));