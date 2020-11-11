import React from 'react';
import DeIkLogo from '../Style/DeIKLogo.png' 
import '../Style/style.css';

function MainPage() {
  return (
    <div className="centered">
    <style>{'body { background-color: #EBECF0; }'}</style>
    <div className="limiter">
		<div className="container-login">
			<div className="wrap-login">
					<span className="login-form-title">
						Doctoral School <br />  of Informatics
					</span>
						<div className="img-wrap">
							<img className="img" src={DeIkLogo} alt={"DeIkLogo"}/> 
						</div>

					<div className="error-messages">
					</div>
					<br />
					<div className="wrap-input">
                        <a href="/userlogin">
							Student
						</a>
					</div>
					<br />
                    <br />
                    <div className="wrap-input">
					<div>
                        <a href="/adminlogin">
							Admin
						</a>
					</div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
			</div>
		</div>
	</div>
</div>
);
}

export default MainPage;