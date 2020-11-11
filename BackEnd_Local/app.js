if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const helmet = require("helmet");
const app = express();
const session = require("express-session");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Routes
const SubjectRoute = require('./routes/subjects');
const NameAndEmailRoute = require('./routes/NameAndEmailRoute');
const UserLoginRoute = require('./routes/UserLogin');
const postsRoute = require('./routes/posts');
const AdminLoginRoute = require('./routes/AdminLogin');
const UserRegRoute = require('./routes/UserReg');
const AdminRegRoute = require('./routes/AdminReg');
const GetSubjectsRoute = require('./routes/GetSubjects');
const GetDoctoralProgramsRoute = require('./routes/GetDoctoralPrograms');
const GetTeachersRoute = require('./routes/GetTeachers');
const GetUsersRoute = require('./routes/GetUsers');
const GetAdminsRoute = require('./routes/GetAdmins');
const GetAdminChangePassRoute = require('./routes/ChangeAdminPass');
const GetUserChangePassRoute = require('./routes/ChangeUserPass');
const GetEditTeachersRoute = require('./routes/EditTeachers');
const GetEditDoctoralProgramsRoute = require('./routes/EditDoctoralPrograms');
const GetEditSubjectsRoute = require('./routes/EditSubjects');
const GetEditAdminsRoute = require('./routes/EditAdmins');
const GetEditUsersRoute = require('./routes/EditUsers');
const GetDeleteTeachersRoute = require('./routes/DeleteTeachers');
const GetDeleteProgramsRoute = require('./routes/DeletePrograms');
const GetDeleteSubjectsRoute = require('./routes/DeleteSubjects');
const GetDeleteAdminsRoute = require('./routes/DeleteAdmins');
const GetDeleteUsersRoute = require('./routes/DeleteUsers');
const GetGenNewUserPassRoute = require('./routes/GenNewUserPass');
const GetGenNewAdminPassRoute = require('./routes/GenNewAdminPass');
const GetAdministratePostRoute = require('./routes/AdminstratePost');
const GetSubjectUpdateRoute = require('./routes/subjectupdate');
const GetAllUserwithPendingSubject = require('./routes/Pending');

var cors= require('cors');
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use('/api/posts', postsRoute);
app.use('/api/subjects', SubjectRoute);
app.use('/api/NameAndEmail', NameAndEmailRoute);
app.use('/api/userlogin',UserLoginRoute);
app.use('/api/adminlogin',AdminLoginRoute);
app.use('/api/RegUser', UserRegRoute);
app.use('/api/RegAdmin', AdminRegRoute);
app.use('/api/getsubjects', GetSubjectsRoute);
app.use('/api/getdoctoralprograms', GetDoctoralProgramsRoute);
app.use('/api/getteachers', GetTeachersRoute);
app.use('/api/getusers',GetUsersRoute);
app.use('/api/getadmins',GetAdminsRoute);
app.use('/api/changeadminpass',GetAdminChangePassRoute);
app.use('/api/changeuserpass',GetUserChangePassRoute);
app.use('/api/editteachers',GetEditTeachersRoute);
app.use('/api/editdoctoralprograms',GetEditDoctoralProgramsRoute);
app.use('/api/editsubjects',GetEditSubjectsRoute);
app.use('/api/editadmins',GetEditAdminsRoute);
app.use('/api/editusers',GetEditUsersRoute);
app.use('/api/deleteteachers',GetDeleteTeachersRoute);
app.use('/api/deleteprograms',GetDeleteProgramsRoute);
app.use('/api/deletesubjects',GetDeleteSubjectsRoute);
app.use('/api/deleteadmins',GetDeleteAdminsRoute);
app.use('/api/deleteusers',GetDeleteUsersRoute);
app.use('/api/gennewpassforusers',GetGenNewUserPassRoute);
app.use('/api/gennewpassforadmin',GetGenNewAdminPassRoute);
app.use('/api/PostAdministrate',GetAdministratePostRoute);
app.use('/api/subjectupdate',GetSubjectUpdateRoute);
app.use('/api/getpendingusers',GetAllUserwithPendingSubject);

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection
db.on('error',error => console.error(error));
db.once('open',()=>console.log('connected'))
//Starting listening
app.listen(50111);
