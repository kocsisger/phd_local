import React,{Component} from 'react';
import '../../Style/adminpage.css';
import Nav from './Nav';
import UserData from './UserDataGetSet';
import UserChangePass from './PostFormJSUser/PostUserChangePass'

class Home extends Component{
        constructor(props){
            super(props)
            this.state={
                changepass:false,
            }
            this.handleChange = this.handleClick.bind(this);
        }
        
        changeHandler = (e) =>{
            this.setState({ [e.target.name]:e.target.value})
        }
    
        handleClick = event => {
            this.setState({      
                changepass: !this.state.edit,
            })   
        }
    
            render(){
                let content = null;
                if(this.state.changepass){
                    content =  
                        <div>
                            <br/>
                            <span className="info-titleuser">Change Password</span>
                            <br/>
                         <UserChangePass/>
                    </div>
                   
                }else{
                    content = <div> <br />
                    <span className="info-titleuser">Personal Data</span>
                    <br /><br />
                    <div className="targy">
                    <ul className="list-input">
                        <li>
                                <span className="ititleu">First Name: {UserData.GetUserFirstName()}</span>
                        </li>
                        <li>
                                <span className="ititleu">Last Name: {UserData.GetUserLastName()}</span>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-input">
                        <li>
                                <span className="ititleu">Email: {UserData.GetUserEmail()}</span>
                        </li>
                        <li>
                                <span className="ititleu">Phone Number: {UserData.GetUserPhoneNumber()}</span>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-input">
                        <li>
                                <span className="ititleu">Neptun Code: {UserData.GetUserNeptunCode()}</span>
                        </li>
                        <li>
                                <span className="ititleu">Username: {UserData.GetUserUserName()}</span>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-input">
                        <li>
                                <span className="ititleu">Course type: {UserData.GetUserCourseType()}</span>
                        </li>
                        <li>
                                <span className="ititleu">Semester: {UserData.GetUserSemester()}</span>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-input">
                        <li>
                                <span className="ititleu">Supervisor: {UserData.GetUserSupervisor()}</span>
                        </li>
                        <li>
                                <span className="ititleu"> Program Leader: {UserData.GetUserProgramDirector()}</span>
                        </li>
                    </ul>
                    <br />
                    <ul className="list-input">
                        <li>
                          <span className="ititleu">Doctoral Program: {UserData.GetUserDoctoralProgram()}</span>
                        </li>
                        <li>
                                <span className="ititleu"></span>
                        </li>
                    </ul>
              
                    <br/>
                    <ul className="list-input">
                        <li>
                          <span className="ititleu">Change password: <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.changepass} 
                                onChange={ this.handleClick }/></span>
                        </li>
                        <li>
                                <span className="ititleu"></span>
                        </li>
                    </ul>
                    </div>
                    </div> 
               }
        
         return (            
                <div>  
                    <Nav/>        
                    {content} 
                    <br />   
                </div> 
            )
        }
    }
    
    
export default Home;
