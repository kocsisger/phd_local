import React from 'react';
import DeIkLogo from '../../Style/DeIKLogo.png' 
import '../../Style/style.css';
import PostLoginAdminForm from './PostFormsJS/PostLoginAdminForm';

function AdminLogin() {
  return (
<div className="centered">
    <style>{'body { background-color: #EBECF0; }'}</style>
    <div className="limiter">
		<div className="container-login">
			<div className="wrap-login">
					<span className="login-form-title">
						Doctoral School <br /> of Informatics
					</span>
						<div className="img-wrap">
							<img className="img" src={DeIkLogo} alt={"DeIkLogo"}/> 
						</div>

					<div className="error-messages">
					</div>
					<br />
					<PostLoginAdminForm/>
			</div>
		</div>
	</div>
</div>
  );
}

export default AdminLogin;