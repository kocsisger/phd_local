import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';

function refreshPage() {
    window.location.reload(false)
}

class PostRegAdminForm extends Component{
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            username:'',
            pass:''
        }
    }
    
    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }
    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/RegAdmin',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert("An error occurred during the registration. The registration failed!");
            refreshPage();
        })
    }
    render(){
        const{firstname,lastname,email,username,pass}=this.state;
        return (            
        <form onSubmit={this.SubmitHandler}>
        <div>
            <span className="txt1">
                    Email
            </span>
        </div>
            
        <div className="wrap-email-input">
            <input className="inputa" type="email" name="email" value={email} onChange={this.changeHandler} required/>
        </div>
        <br />

        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    First Name
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="firstname" value={firstname} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Last Name
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="lastname" value={lastname} onChange={this.changeHandler} required/>
            </div>
            </li>
            </ul>
            <br />

            
            <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Username
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="username" value={username} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Password
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="password" name="pass" value={pass} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                    Registration
                </button>
            </div>
        </form>
        )
    }
}

export default PostRegAdminForm;