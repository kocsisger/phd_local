import React from 'react';
import '../../Style/adminpage.css';
import PostLogoutAdminForm from './PostFormsJS/PostAdminLogoutForm';
import DeIkLogo from '../../Style/DeIKLogo.png'
import AdminData from './AdminDataGetSet';

function Nav() {
  return (
    <div>
      <div className="img-wrapa">
        <img src={DeIkLogo} alt={"DeIkLogo"} />
      </div>
      <div className="titlea">
        <span className="login-form-title">
          Doctoral School <br /> of Informatics
			</span>
      </div>
      <ul className="list-containera">
        <li className="paddinga">
          {AdminData.GetAdminFirstname() + " " + AdminData.GetAdminLastname()}
        </li>
        <li><PostLogoutAdminForm /></li>
      </ul>
      <div className="navbar">
        <a href="UserSubjectsAdmin">User Subjects</a>
        <a href="Users">User Administration</a>
        <a href="Admins">Admin Administration</a>
        <a href="Teachers">Teachers</a>
        <a href="Subjects">Subjects</a>
        <a href="DoctoralPrograms">Doctoral Programs</a>
        <div className="dropdown">
          <button className="dropbtn">Registration</button>
          <div className="dropdown-content">
            <a href="AdminPageRegUser">User Registration</a>
            <a href="AdminPageRegAdmin">Admin Registration</a>
          </div>
        </div>
        <a href="AdminProfile">Profile</a>
        <a href="Semester">Semester</a>
      </div>

    </div>
  );
}

export default Nav;
