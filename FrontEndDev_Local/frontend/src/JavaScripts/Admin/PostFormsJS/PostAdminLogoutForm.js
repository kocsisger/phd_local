import React, {Component}  from 'react';
import { Redirect } from 'react-router-dom'
import '../../../Style/adminpage.css';

class PostLogoutAdminForm extends Component{
    state = {
        adminredirect: false,
    }
    
    SubmitHandlerLogout = e=>{ 
       this.setState({ adminredirect: true})
    }

    render(){
        const { adminredirect} = this.state;
        if (adminredirect) {
            sessionStorage.clear();
            return <Redirect to='/adminlogin'/>;
        }
        return (        
        <form onSubmit={this.SubmitHandlerLogout}>
                     <div className="container-logout-btna">
                            <button type ="submit" className="wrap-logout-btna">
							    Logout
                            </button>
                    </div>
        </form>
        )
    }
}

export default PostLogoutAdminForm;