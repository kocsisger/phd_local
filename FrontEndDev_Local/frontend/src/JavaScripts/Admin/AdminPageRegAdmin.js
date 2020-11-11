import React from 'react';
import DeIkLogo from '../../Style/DeIKLogo.png' 
import '../../Style/adminpage.css';
import Nav from './AdminNav';
import PostRegAdminForm from './PostFormsJS/PostRegAdminForm';

function AdminPageRegAdmin() {
  return (
<div>
<style>{'body { background-color: #f6f6f6; }'}</style>
<div className="limitera">
<div className="containera">
    <div className="wrap-logina">
        <div className="img-wrapa">
            <img src={DeIkLogo} alt={"DeIkLogo"}/> 
        </div>
        <div className="titlea"> 
            <span className="login-form-title">
            Doctoral School <br /> of Informatics
			</span>
        </div>
       <Nav/>
           <br />
            <span className="inf-title">
                 Admin Registration 
			</span>
            <br />
            <PostRegAdminForm/> 
    </div>
</div>
</div>
</div>
  );
}

export default AdminPageRegAdmin;