import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';

class PostUserAdministration extends Component{
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            UserID:'',
            lastname:'',
            email:'',
            phonenumber:'',
            neptuncode:'',
            supervisor:'',
            doctoralprogram:'',
            coursetype:'',
            semester:'',
            programdirector:'',
            getusersubjects:false,
            administrate:false,
            getadministrate:false,
            onlynotadministrated:false,
            pending:false,
            getuserpendingsubject:false,
            acceptpending:false,
            declinepending:false,
            resendpending:false,
            pendingSubjects:[],
            pendingUserSubjects:[],
            TakenCourses:[],
            CurrentCourses:[],
            notadministratedUsers:[],
            notadministratedUserSubjects:[],
            Subject:'',
            Teacher:'',
            Status:'',
            PostID:'',
        }
        this.handleChange = this.handleClick.bind(this);
    }

    refreshPage() {
        window.location.reload(false)
    }

    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }

    handleClick = event => {  
       const datas = event.target.dataset.mssg.split('|'); 
       
       fetch('http://localhost:50111/api/posts/'+datas[0]+'/history/h')
        .then((response) => response.json())
          .then((responseData) => {
            fetch('http://localhost:50111/api/posts/'+datas[0])
            .then((response) => response.json())
              .then((resforCurrentSubjects) => {
                this.setState({
                    CurrentCourses:JSON.stringify(resforCurrentSubjects),
                    TakenCourses:JSON.stringify(responseData),
                    getusersubjects: !this.state.getusersubjects,
                    UserID:datas[0],
                    email:datas[1],
                    firstname:datas[2],
                    lastname:datas[3],
                    phonenumber:datas[4],
                    neptuncode:datas[5],
                    supervisor:datas[6],
                    doctoralprogram:datas[7],
                    programdirector:datas[8],
                    coursetype:datas[9],
                    semester:datas[10],})
            })
            })         
        }

    handleClickForNotAdministrated = event => {  
    fetch('http://localhost:50111/api/posts/subject/notadministrated')
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
            notadministratedUsers:JSON.stringify(responseData),
            onlynotadministrated:!this.state.onlynotadministrated,
	    pending:false})})
    }

    handleClickForAdministration = event => {  
        const datas = event.target.dataset.mssg.split('|'); 
        fetch('http://localhost:50111/api/posts/'+datas[0]+'/getusernotadministratedsubjects')
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
            notadministratedUserSubjects:JSON.stringify(responseData),
            administrate: !this.state.administrate,
            UserID:datas[0],
            email:datas[1],
            firstname:datas[2],
            lastname:datas[3],
            phonenumber:datas[4],
            neptuncode:datas[5],
            supervisor:datas[6],
            doctoralprogram:datas[7],
            programdirector:datas[8],
            coursetype:datas[9],
            semester:datas[10],})
        })
    }

    handleClickForAdministrateSubject = event => {  
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            getadministrate: !this.state.getadministrate,
            PostID:datas[0],
            Subject:datas[1],
            Teacher:datas[2],
            Status:datas[3],});
    }

    SubmitHandlerForAdministrate= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/PostAdministrate',this.state)
        .then(response => {
            alert(response.data);
            fetch('http://localhost:50111/api/posts/'+this.state.UserID+'/getusernotadministratedsubjects')
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({
                notadministratedUserSubjects:JSON.stringify(responseData),
                getadministrate:!this.state.getadministrate})})
        })
        .catch(error => {
            alert(error) 
        })
    }
    
    handleClickForPendingSubjects = event => {  
        fetch('http://localhost:50111/api/getpendingusers')
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
            pendingSubjects:JSON.stringify(responseData),
            pending: !this.state.pending,
	    onlynotadministrated:false,
            })
        })
    }

    handleClickForGetUserPendingSubject= event => {  
        const datas = event.target.dataset.mssg.split('|'); 
        fetch('http://localhost:50111/api/getpendingusers/'+datas[0]+'/getuserpendingsubjects')
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
            pendingUserSubjects:JSON.stringify(responseData),
            getuserpendingsubject: !this.state.getuserpendingsubject,
            UserID:datas[0],
            email:datas[1],
            firstname:datas[2],
            lastname:datas[3],
            phonenumber:datas[4],
            neptuncode:datas[5],
            supervisor:datas[6],
            doctoralprogram:datas[7],
            programdirector:datas[8],
            coursetype:datas[9],
            semester:datas[10],})
        })
    }

    handleClickForAccept = event => {  
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            acceptpending: !this.state.acceptpending,
            PostID:datas[0],
            Subject:datas[1],
            Teacher:datas[2],
            Status:datas[3],});
    }

    handleClickForDecline = event => {  
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            declinepending: !this.state.declinepending,
            PostID:datas[0],
            Subject:datas[1],
            Teacher:datas[2],
            Status:datas[3],});
    }

    handleClickForResend = event => {  
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            resendpending: !this.state.resendpending,
            PostID:datas[0],
            Subject:datas[1],
            Teacher:datas[2],
            Status:datas[3],});
    }

    SubmitHandlerForDecline= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getpendingusers/pending/decline',this.state)
        .then(response => {
            alert(response.data);
            fetch('http://localhost:50111/api/getpendingusers/'+this.state.UserID+'/getuserpendingsubjects')
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({
                pendingUserSubjects:JSON.stringify(responseData),
                declinepending: !this.state.declinepending})})
        })
        .catch(error => {
            alert(error) 
        })
    }

    SubmitHandlerForResend= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getpendingusers/pending/resend',this.state)
        .then(response => {
            alert(response.data);
            fetch('http://localhost:50111/api/getpendingusers/'+this.state.UserID+'/getuserpendingsubjects')
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({
                pendingUserSubjects:JSON.stringify(responseData),
                resendpending: !this.state.resendpending})})
        })
        .catch(error => {
            alert(error) 
        })
    }

    SubmitHandlerForAccept= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getpendingusers/pending/accept',this.state)
        .then(response => {
            alert(response.data);
            fetch('http://localhost:50111/api/getpendingusers/'+this.state.UserID+'/getuserpendingsubjects')
            .then((response) => response.json())
            .then((responseData) => {
            this.setState({
                pendingUserSubjects:JSON.stringify(responseData),
                acceptpending: !this.state.acceptpending})})
        })
        .catch(error => {
            alert(error) 
        })
    }

    render(){
    let content = null;
    if(this.state.resendpending){
        content = <form onSubmit={this.SubmitHandlerForResend}>
        <br />
            <span className="inf-title">Do you want to resend this subject registration?</span>
       <br />
       <ul className="list-input">
            <li>
                <span className="ititle">Subject's Name: {this.state.Subject}</span>
             </li>
        </ul>
        <br />
        <ul className="list-input">
             <li>
                <span className="ititle">Teacher's Name: {this.state.Teacher}</span>
            </li>
        </ul>
        <br />
        <ul className="list-input">
             <li>
                <span className="ititle">Student's Name: {this.state.firstname + " " + this.state.lastname}</span>
            </li>
        </ul>
    
        <ul className="list-input">
            <li>
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                 Resend
                </button>
        </div>
        </li>
    </ul>
       </form>
    }else{
    if(this.state.declinepending){
        content = <form onSubmit={this.SubmitHandlerForDecline}>
        <br />
            <span className="inf-title">Do you want to decline this subject registration?</span>
       <br />
       <ul className="list-input">
            <li>
                <span className="ititle">Subject's Name: {this.state.Subject}</span>
             </li>
        </ul>
        <br />
        <ul className="list-input">
             <li>
                <span className="ititle">Teacher's Name: {this.state.Teacher}</span>
            </li>
        </ul>
        <br />
        <ul className="list-input">
             <li>
                <span className="ititle">Student's Name: {this.state.firstname + " " + this.state.lastname}</span>
            </li>
        </ul>
    
        <ul className="list-input">
            <li>
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                 Decline
                </button>
        </div>
        </li>
    </ul>
       </form>
    }else{
    if(this.state.acceptpending){
    content = <form onSubmit={this.SubmitHandlerForAccept}>
    <br />
        <span className="inf-title">Do you want to accept this subject registration?</span>
   <br />
   <ul className="list-input">
        <li>
            <span className="ititle">Subject's Name: {this.state.Subject}</span>
         </li>
    </ul>
    <br />
    <ul className="list-input">
         <li>
            <span className="ititle">Teacher's Name: {this.state.Teacher}</span>
        </li>
    </ul>
    <br />
    <ul className="list-input">
         <li>
            <span className="ititle">Student's Name: {this.state.firstname + " " + this.state.lastname}</span>
        </li>
    </ul>

    <ul className="list-input">
        <li>
        <div className="container-login-form-btna">
            <button type ="submit" className="login-form-btna">
             Accept
            </button>
    </div>
    </li>
</ul>
   </form>
    }else{
    if(this.state.getuserpendingsubject){
        let UserpendingSubjects = JSON.parse(this.state.pendingUserSubjects)
        content = <div>
        <br/>
    <span className="inf-title">{this.state.firstname + " "+ this.state.lastname+"'s"} pending subjects</span>
        <br/>
            <div className="targy">           
            <div className="atables">
             <table className="acontent-table">
                <thead>
                 <tr>
                    <th>Subject</th>
                    <th>Teacher</th>             
                    <th>Status</th> 
                    <th>Accept</th>
                    <th>Decline</th>   
                    <th>Resend</th>   
                </tr>   
            </thead>
  
        <tbody>
        { UserpendingSubjects.map(item => (
            <tr key={item._id}>
              <td data-label="Subject:">{item.targy}</td>
              <td data-label="Teacher:">{item.oktato}</td>  
              <td data-label="Status:">{item.tstatus}</td>                    
              <td data-label="Accept:">
              <input 
                    type="checkbox" 
                    className="CheckBoxAdmin"
                    checked={ this.state.getadministrate} 
                    data-mssg={item._id+'|'+item.targy+'|'+item.oktato+'|'+item.tstatus}
                     onChange={ this.handleClickForAccept }/>
              </td>
              <td data-label="Decline:">
              <input 
                    type="checkbox" 
                    className="CheckBoxAdmin"
                    checked={ this.state.getadministrate} 
                    data-mssg={item._id+'|'+item.targy+'|'+item.oktato+'|'+item.tstatus}
                     onChange={ this.handleClickForDecline }/>
              </td>  
              <td data-label="Resend:">
              <input 
                    type="checkbox" 
                    className="CheckBoxAdmin"
                    checked={ this.state.getadministrate} 
                    data-mssg={item._id+'|'+item.targy+'|'+item.oktato+'|'+item.tstatus}
                     onChange={ this.handleClickForResend }/>
              </td>            
            </tr>
          ))} 
        </tbody>
        </table>  
        </div>  
    </div></div>
    }else{
    if(this.state.pending){
        let allPendingSubjects = JSON.parse(this.state.pendingSubjects)
        let table = null;
        if(allPendingSubjects.length === 0){
            table = <div><span className="ititle">There are no pending subjetcs.</span></div>
        }
        else{
            table =   <div className="atables">
            <table className="acontent-table">
              <thead>
                  <tr>
                   <th>Email</th>
                   <th>First Name</th>             
                   <th>Last Name</th>
                   <th>Neptun code</th>  
                   <th>Supervisor</th>
                   <th>Subjects</th>
                  </tr>     
              </thead>
    
          <tbody>
          {allPendingSubjects.map(item => (
              <tr key={item._id}>
                <td data-label="Email:">{item.email}</td>
                      <td data-label="First name:">{item.firstname}</td>
                      <td data-label="Last name:">{item.lastname}</td>  
                      <td data-label="Neptun code:">{item.neptuncode}</td>  
                      <td data-label="Supervisor:">{item.supervisor}</td>  
                      <td data-label="Subjects:">
                          <input 
                                  type="checkbox" 
                                  className="CheckBoxAdmin"
                                  checked={ this.state.getuserpendingsubject} 
                                  data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname+'|'+item.phonenumber+
                                  '|'+ item.neptuncode+'|'+item.supervisor+'|'+item.doctoralprogram+'|'+item.programdirector+
                                  '|'+item.coursetype+'|'+item.semester}
                                  onChange={ this.handleClickForGetUserPendingSubject }/>
                      </td>            
              </tr>
            ))} 
          </tbody>
          </table>  
          </div>  
   
        }
        content = 
        <div>
        <br/>
        <span className="inf-title">All user with pending subject</span>
        <br/>
        
        <div className="targy">    
         <ul className="list-containers">
             <li className="paddingb">
                Show all user:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForPendingSubjects }/>
             </li> 
             <li className="paddingb">
                Show not administered:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForNotAdministrated }/>
             </li> 
        </ul>      
      {table}
    </div>
    </div>
    }else{
    if(this.state.getadministrate){
        content = <form onSubmit={this.SubmitHandlerForAdministrate}>
               <br />
        <span className="inf-title">Do you want to administer this subject registration?</span>
   <br />
   <ul className="list-input">
        <li>
            <span className="ititle">Subject's Name: {this.state.Subject}</span>
         </li>
    </ul>
    <br />
    <ul className="list-input">
         <li>
            <span className="ititle">Teacher's Name: {this.state.Teacher}</span>
        </li>
    </ul>
    <br />
    <ul className="list-input">
         <li>
            <span className="ititle">Student's Name: {this.state.firstname + " " + this.state.lastname}</span>
        </li>
    </ul>

    <ul className="list-input">
        <li>
        <div className="container-login-form-btna">
            <button type ="submit" className="login-form-btna">
             Administer
            </button>
    </div>
    </li>
</ul>
   </form>
    }
    else{
    if(this.state.administrate){
        let notadministratedsubject = JSON.parse(this.state.notadministratedUserSubjects)
        content = <div>
        <br/>
    <span className="inf-title">{this.state.firstname + " "+ this.state.lastname+"'s"} subjects</span>
        <br/>
            <div className="targy">           
            <div className="atables">
             <table className="acontent-table">
                <thead>
                 <tr>
                    <th>Subject</th>
                    <th>Teacher</th>             
                    <th>Status</th> 
                    <th>Administer</th>   
                </tr>   
            </thead>
  
        <tbody>
        {notadministratedsubject.map(item => (
            <tr key={item._id}>
              <td data-label="Subject:">{item.targy}</td>
              <td data-label="Teacher:">{item.oktato}</td>  
              <td data-label="Status:">{item.tstatus}</td>                    
              <td data-label="Administer:">
              <input 
                    type="checkbox" 
                    className="CheckBoxAdmin"
                    checked={ this.state.getadministrate} 
                    data-mssg={item._id+'|'+item.targy+'|'+item.oktato+'|'+item.tstatus}
                     onChange={ this.handleClickForAdministrateSubject }/>
              </td>             
            </tr>
          ))} 
        </tbody>
        </table>  
        </div>  
    </div></div>
    }else{
    if(this.state.onlynotadministrated){
        let notadminUsers = JSON.parse(this.state.notadministratedUsers);
        let table = null;
        if(notadminUsers.length === 0){
            table = <div><span className="ititle">There are no not administered subjetcs.</span></div>
        }
        else{
            table =   <div className="atables">
            <table className="acontent-table">
              <thead>
                  <tr>
                   <th>Email</th>
                   <th>First Name</th>             
                   <th>Last Name</th>
                   <th>Neptun code</th>  
                   <th>Supervisor</th>
                   <th>Subjects</th>
                  </tr>     
              </thead>
    
          <tbody>
          {notadminUsers.map(item => (
              <tr key={item._id}>
                <td data-label="Email:">{item.email}</td>
                      <td data-label="First name:">{item.firstname}</td>
                      <td data-label="Last name:">{item.lastname}</td>  
                      <td data-label="Neptun code:">{item.neptuncode}</td>  
                      <td data-label="Supervisor:">{item.supervisor}</td>  
                      <td data-label="Subjects:">
                          <input 
                                  type="checkbox" 
                                  className="CheckBoxAdmin"
                                  checked={ this.state.administrate} 
                                  data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname+'|'+item.phonenumber+
                                  '|'+ item.neptuncode+'|'+item.supervisor+'|'+item.doctoralprogram+'|'+item.programdirector+
                                  '|'+item.coursetype+'|'+item.semester}
                                  onChange={ this.handleClickForAdministration }/>
                      </td>            
              </tr>
            ))} 
          </tbody>
          </table>  
          </div>  
   
        }
        content = 
    <div>
        <br/>
        <span className="inf-title">Not Administered Users</span>
        <br/>
        
    <div className="targy">    
         <ul className="list-containers">
             <li className="paddingb">
                Show pending subjects:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForPendingSubjects }/>
             </li> 
             <li className="paddingb">
                Show all users:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForNotAdministrated }/>
             </li> 
        </ul>      
      {table}
    </div>
    </div>
    }
    else{
    if(this.state.getusersubjects){
    let Takenitems = JSON.parse(this.state.TakenCourses);
    let Currentitems = JSON.parse(this.state.CurrentCourses);
    let TakenTable = null;
    let CurrentTable = null;
    if(Takenitems.length === 0){
        TakenTable = <div><span className="ititle">There are no other taken subjetcs yet.</span></div>
    }
    else{
        TakenTable = <div className="targy">           
        <div className="atables">
          <table className="acontent-table">
            <thead>
                <tr>
                <th>Subject</th>
                <th>Teacher</th>             
                <th>Status</th>      
                </tr>   
            </thead>
  
        <tbody>
        {Takenitems.map(item => (
            <tr key={item._id}>
              <td data-label="Subject:">{item.targy}</td>
              <td data-label="Teacher:">{item.oktato}</td>                    
              <td data-label="Status:">{item.tstatus}</td>             
            </tr>
          ))} 
        </tbody>
        </table>  
        </div>  
    </div>
    }

    if(Currentitems.length === 0){
        CurrentTable = <div><span className="ititle">There are no current subjects yet.</span></div>
    }
    else{
        CurrentTable = <div className="targy">           
        <div className="atables">
          <table className="acontent-table">
            <thead>
                <tr>
                <th>Subject</th>
                <th>Teacher</th>             
                <th>Status</th>      
                </tr>   
            </thead>
  
        <tbody>
        {Currentitems.map(item => (
            <tr key={item._id}>
              <td data-label="Subject:">{item.targy}</td>
              <td data-label="Teacher:">{item.oktato}</td>                    
              <td data-label="Status:">{item.tstatus}</td>             
            </tr>
          ))} 
        </tbody>
        </table>  
        </div>  
    </div>
    }

    content = 
    <form onSubmit={this.SubmitHandler}>
        <br />
            <span className="inf-title">
             {this.state.firstname} {this.state.lastname}'s subjects
            </span>
        <br />
        <span className="ititle"> Current courses  </span>
        <br />
                {CurrentTable}
        <br />
        <span className="ititle"> Taken courses  </span>
        <br />
                {TakenTable}
        <br />

    </form>;
    }
    else{
    content= <form onSubmit={this.SubmitHandler}>
                  <br />
            <span className="inf-title">
                 User Subjects Administration 
			</span>
            <br />
    <div className="targy">  
        <ul className="list-containers">
             <li className="paddingb">
                Show pending subjects:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForPendingSubjects }/>
             </li> 
             <li className="paddingb">
                Show not administered:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={ this.handleClickForNotAdministrated }/>
             </li> 
        </ul>
      <div className="atables">
            <table className="acontent-table">
                <thead>
                 <tr>
                 <th>Email</th>
                 <th>First Name</th>             
                 <th>Last Name</th>
                 <th>Neptun code</th>  
                 <th>Supervisor</th>
                 <th>Subjects</th>
                 </tr>   
                </thead>
        
                
                <tbody>
                {this.props.items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Email:">{item.email}</td>
                    <td data-label="First name:">{item.firstname}</td>
                    <td data-label="Last name:">{item.lastname}</td>  
                    <td data-label="Neptun code:">{item.neptuncode}</td>  
                    <td data-label="Supervisor:">{item.supervisor}</td>  
                    <td data-label="Subjects:">
                        <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.getusersubjects} 
                                data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname+'|'+item.phonenumber+
                                '|'+ item.neptuncode+'|'+item.supervisor+'|'+item.doctoralprogram+'|'+item.programdirector+
                                '|'+item.coursetype+'|'+item.semester}
                                onChange={ this.handleClick }/>
                    </td>
                  </tr>
                ))} 
                </tbody>
            </table>    
        </div>
    </div> 
        </form>;
        }}}}}}}}}
        return ( 
        <div>          
            {content} 
            <br /> 
        </div> 
        )
    }
}

export default PostUserAdministration;
