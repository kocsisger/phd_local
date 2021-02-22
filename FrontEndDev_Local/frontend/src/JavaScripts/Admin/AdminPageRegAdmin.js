import React from 'react';
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