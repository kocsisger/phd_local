import React from 'react';
import '../../Style/App.css';
import '../../Style/adminpage.css';
import UserData from './UserDataGetSet';
import PostLogoutUserForm from './PostFormJSUser/PostUserLogoutForm';

function Nav() {
  return (
<div>
    <nav className="nav-area">
    <ul>
      
        <li><a href="/Home"> {UserData.GetUserFirstName()} {UserData.GetUserLastName()}</a></li>                  
        <li>  
          <div className="dropdownnav">
                   <button className="dropbtnnav">Subjects</button>
                       <div className="dropdown-contentnav">
                           <a href="/SubjectReg">Register for Subjects</a>
                           <a href="/TakenCourses">Taken Courses</a>
                       </div>
            </div> 
        </li>        
        <li><a href="/Graduation">Degree Conferment Procedure</a></li>        
        <li><PostLogoutUserForm/></li> 
    </ul>
    </nav>
  </div>

  );
}

export default Nav;
