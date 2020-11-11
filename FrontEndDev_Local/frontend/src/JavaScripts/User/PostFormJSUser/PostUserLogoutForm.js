import React, {Component}  from 'react';
import { Redirect } from 'react-router-dom'
import '../../../Style/App.css';

class PostLogoutUserForm extends Component{
    state = {
        userredirect: false,
    }
    
    SubmitHandlerLogoutUser = e=>{ 
       this.setState({ userredirect: true})
    }

    render(){
        const { userredirect} = this.state;
        if (userredirect) {
            sessionStorage.clear();
            return <Redirect to='/userlogin'/>;
        }
        return (        
        <form className="logoutbtn-wrap" onSubmit={this.SubmitHandlerLogoutUser}>
            <button type ="submit" className="logoutbtn">Logout</button>
        </form>
        )
    }
}

export default PostLogoutUserForm;