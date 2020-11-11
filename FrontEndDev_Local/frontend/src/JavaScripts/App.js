import React from 'react';
import '../Style/App.css';
import Felvetel from './User/Felvetel';
import Home from './User/Home';
import Abszolvalt from './User/Abszolvalt';
import AdminLogin from './Admin/login_admin';
import UserLogin from './User/login_user';
import AdminPage from './Admin/AdminPage';
import DoctoralPrograms from './Admin/DoctoralPrograms';
import Subjects from './Admin/Subjects';
import TakenCourses from './User/TakenCourses';
import AdminPageRegUser from './Admin/AdminPageRegUser';
import AdminPageRegAdmin from './Admin/AdminPageRegAdmin';
import Teachers from './Admin/Teacher';
import UserSubjects from './Admin/UserSubjectsAdministration';
import Admins from './Admin/Admins';
import AdminProfile from './Admin/AdminProfile';
import ForgetPass from './ForgetPass';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import { SecuredRouteAsAdmin } from "./Admin/Adminprotected.route";
import { SecuredRouteAsUser } from "./User/Userprotected.route";
import SubjectUpdate from './Admin/Subjectupdate';
import MainPage from './MainPage';


function App() {
  return (
    <Router>
          <Route exact path="/" component={MainPage}/>
      <div>
        <Switch>
          <Route path="/ForgotPass" component={ForgetPass}/>
          <Route path="/UserLogin" component={UserLogin} />
          <Route path="/AdminLogin" component={AdminLogin} />
          <Route path="/subjectupdate" component={SubjectUpdate} /> 
          <SecuredRouteAsAdmin path="/AdminPageRegUser" component={AdminPageRegUser} />
          <SecuredRouteAsAdmin path="/UserSubjectsAdmin" component={UserSubjects} />
          <SecuredRouteAsAdmin path="/AdminPageRegAdmin" component={AdminPageRegAdmin} />
          <SecuredRouteAsAdmin path="/DoctoralPrograms" component={DoctoralPrograms} />
          <SecuredRouteAsAdmin path="/Subjects" component={Subjects} />
          <SecuredRouteAsAdmin path="/Teachers" component={Teachers} />
          <SecuredRouteAsAdmin path="/Users" component={AdminPage} />
          <SecuredRouteAsAdmin path="/Admins" component={Admins} />
          <SecuredRouteAsAdmin path="/AdminProfile" component={AdminProfile} />
          <SecuredRouteAsUser path="/Home" component={Home} />           
          <SecuredRouteAsUser path="/TakenCourses" component={TakenCourses}/>
          <SecuredRouteAsUser path="/SubjectReg" component={Felvetel} /> 
          <SecuredRouteAsUser path="/Graduation" component={Abszolvalt} /> 
        </Switch>     
      </div>
    </Router>
  );
}


export default App;
