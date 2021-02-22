import React from 'react';
import '../../Style/adminpage.css';
import Nav from './AdminNav';
import AdminData from './AdminDataGetSet';
import PostAdminChangePassUserForm from './PostFormsJS/PostAdminChangePassUserForm';


function AdminProfile() {
    return (
        <div>
            <style>{'body { background-color: #f6f6f6; }'}</style>
            <div className="limitera">
                <div className="containera">
                    <div className="wrap-logina">
                        <Nav />
                        <br />
                        <span className="inf-title">
                            Admin Profile
			</span>
                        <br /><br /><br />
                        <span className="title2">
                            Personal Data
			</span>
                        <br />
                        <span className="ititle">Email: {AdminData.GetAdminEmail()}</span>
                        <br />
                        <span className="ititle">First Name: {AdminData.GetAdminFirstname()}</span>
                        <br />
                        <span className="ititle">Last Name: {AdminData.GetAdminLastname()}</span>
                        <br />
                        <span className="ititle">Username: {AdminData.GetAdminUserName()}</span>
                        <br /><br /><br />
                        <span className="title2">
                            Change Password
			</span>
                        <PostAdminChangePassUserForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;