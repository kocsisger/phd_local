import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';
import AdminData from '../AdminDataGetSet';

function refreshPage() {
    window.location.reload(false)
}

class AdminChange extends Component{
    constructor(props){
        super(props)
        this.state={
            AdminId: AdminData.GetAdminID(),
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
        axios.post('http://localhost:50111/api/changeadminpass',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
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
                   Old password:
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
                    New password:
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

export default AdminChange;