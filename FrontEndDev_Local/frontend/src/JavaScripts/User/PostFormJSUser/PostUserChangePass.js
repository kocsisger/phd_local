import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';
import UserData from '../UserDataGetSet';



class ChangeUserPass extends Component{
    constructor(props){
        super(props)
        this.state={
            UserId: UserData.GetUserID(),
            OldPass:'',
            NewPass:'',
            ConfirmNewPass:'',
        }
    }
    
    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }
    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/changeuserpass',this.state)
        .then(response => {
            alert(response.data);
            this.setState({
                OldPass:'',
                NewPass:'',
                ConfirmNewPass:'',
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    render(){
        const{OldPass,NewPass,ConfirmNewPass}=this.state;
        
        return (            
        <form onSubmit={this.SubmitHandler}>

        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                   Old Password:
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="password" name="OldPass" value={OldPass} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>


        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    New Password:
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="password" name="NewPass" value={NewPass} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>

        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Confirm New Password:
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="password" name="ConfirmNewPass" value={ConfirmNewPass} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>

        <ul className="list-input">
            <li>
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                    Save
                </button>
            </div>
            </li>
        </ul>

            
        </form>
        )
    }
}

export default ChangeUserPass;