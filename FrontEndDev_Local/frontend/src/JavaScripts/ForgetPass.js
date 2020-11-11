import React from 'react';
import '../Style/style.css';
import DeIkLogo from '../Style/DeIKLogo.png';

function ForgetPass() {
  return (
    <div className="centered">
    <style>{'body { background-color: #EBECF0; }'}</style>
    <div className="limiter">
		<div className="container-login">
			<div className="wrap-login">
					<span className="login-form-title">
						Doctoral School <br />  of Informatics
					</span>
                    <div className="ititle">
							<img src={DeIkLogo} alt={"DeIkLogo"}/> 
					</div>
                    <br/>
                 <ul className="list-input">
                    <li>
                    <div>
                          <span className="ititle"> Please contact the Administrator!</span>
                     </div>
                    </li>
                 </ul>
                 <br/>
                    <span className="ititle"> Email:  admin@inf.unideb.hu</span>
                    <span className="ititle"> Phone:  +361111111</span>
                    <br/>
            </div>
		</div>
	</div>
</div>
);
}

export default ForgetPass;