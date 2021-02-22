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
	        supervisorID:'',
            edit:false,
            delete:false,
            deletefirstname:'',
            deleteUserID:'',
            deletelastname:'',
            deleteemail:'',
            deletephonenumber:'',
            deleteneptuncode:'',
            deletesupervisor:'',
            deletedoctoralprogram:'',
            deletecoursetype:'',
            deletesemester:'',
            deleteprogramdirector:'',
            generate:'',
            generateID:'',
            generateName:'',
            generateEmail:'',
            addnewsemester:false,
        }
        this.handleChange = this.handleClick.bind(this);
    }

    refreshPage() {
        window.location.reload(false)
    }
    

    SubmitChangeHandlerForProgramDirector = (targyId) =>{
        const selectedTargy = this.props.DoctoralPrograms.find(doctoralprogram => doctoralprogram._id === targyId)
        this.setState({
            doctoralprogram: selectedTargy.ProgramName,
            programdirector: selectedTargy.ProgramDirectorName,
        })}

    SubmitChangeHandlerForSupervisor = (teacherId) =>{
            const selectedTeacher = this.props.teachernames.find(teacher => teacher._id === teacherId)
            this.setState({
                supervisor: selectedTeacher.TeacherName,
		        supervisorID: selectedTeacher._id
            })         
        }

    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }

    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getteachers',this.state)
        .then(response => {
            alert(response.data);
            this.refreshPage() 
        })
        .catch(error => {
            alert(error)
            this.refreshPage() 
        })
    }

    SubmitHandlerForEdit= event =>{ 
        event.preventDefault()
        axios.post('http://localhost:50111/api/editusers',this.state)
        .then(response => {
            alert(response.data);
            this.refreshPage() 
        })
        .catch(error => {
            alert(error)
            this.refreshPage() 
        })
    }

    handleClick = event => {
       
        const datas = event.target.dataset.mssg.split('|');  
        this.setState({      
            edit: !this.state.edit,
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
            semester:datas[10],
        })
    }

    SubmitHandlerForDelete= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/deleteusers',this.state)
        .then(response => {
            alert(response.data);
            this.refreshPage() 
        })
        .catch(error => {
            alert(error)
            this.refreshPage() 
        })
    }

    SubmitHandlerForGenerateUserPass= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/gennewpassforusers',this.state)
        .then(response => {
            alert(response.data);
            this.refreshPage() 
        })
        .catch(error => {
            alert(error)
            this.refreshPage() 
        })
    }
    SubmitHandlerForAddNewSemester= event =>{ 
        event.preventDefault()
        axios.post('http://localhost:50111/api/editusers/addnewsemester',this.state)
        .then(response => {
            alert(response.data);
            this.refreshPage() 
        })
        .catch(error => {
            alert(error)
            this.refreshPage() 
        })
    }

    handleClickforGenNewPass = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            generateID:datas[0],
            generateEmail:datas[1],
            generateName:datas[2] + " " + datas[3],
            generate: !this.state.generate,
        })   
    }

    handleClickforDelete = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            deleteUserID:datas[0],
            deleteemail:datas[1],
            deletefirstname:datas[2],
            deletelastname:datas[3],
            deletephonenumber:datas[4],
            deleteneptuncode:datas[5],
            deletesupervisor:datas[6],
            deletedoctoralprogram:datas[7],
            deleteprogramdirector:datas[8],
            deletecoursetype:datas[9],
            deletesemester:datas[10],
            delete: !this.state.delete,
        })   
    }

    handleClickForAddNewSemester = event => {
        this.setState({
            addnewsemester:!this.state.addnewsemester,
        })   
    }
    
    render(){
        let content = null;
        if(this.state.addnewsemester){
            content = <form onSubmit={this.SubmitHandlerForAddNewSemester} name={this.name}>
            <br/>
                 <span className="inf-title">Would you like to add new semester for every users?</span>
            <br/>
            <span className="ititle">(If you press add, then everyone get +1 semester)</span>

             <ul className="list-input">
                 <li>
                        <div className="container-login-form-btna">
                             <button type ="submit" className="login-form-btna">
                            Add
                             </button>
                        </div>
                </li>
            </ul>
            </form>
        }else{
        if(this.state.generate){
            content = <form onSubmit={this.SubmitHandlerForGenerateUserPass} name={this.name}>
            <br/>
                 <span className="inf-title">Would you like to generate a new password for this user?</span>
            <br/>

            <ul className="list-input">
             <li>
                 <span className="ititle">Name: {this.state.generateName} </span>
             </li>
            </ul>

            <ul className="list-input">
             <li>
                <span className="ititle">Email: {this.state.generateEmail}</span>
             </li>
             </ul>
             <br/>

             <ul className="list-input">
                 <li>
                        <div className="container-login-form-btna">
                             <button type ="submit" className="login-form-btna">
                            Generate
                             </button>
                        </div>
                </li>
            </ul>
            </form>
        }else{
        if(this.state.delete){
            content =  
            <form onSubmit={this.SubmitHandlerForDelete} name={this.name}>
                 <br />
                 <span className="inf-title">Do you want to delete this User?</span>
            <br />
            <ul className="list-input">
             <li>
                 <span className="ititle">Name: {this.state.deletefirstname} {this.state.deletelastname}</span>
             </li>
            </ul>
            <ul className="list-input">
             <li>
                 <span className="ititle">Neptun Code: {this.state.deleteneptuncode}</span>
             </li>
             </ul>
             <br/>
            <ul className="list-input">
             <li>
                 <span className="ititle">Email: {this.state.deleteemail}</span>
             </li>
            </ul>
            <ul className="list-input"> 
                <li>
                 <span className="ititle">Phone Number: {this.state.deletephonenumber}</span>
                </li>
            </ul>
             <ul className="list-input">
             <li>
                 <span className="ititle">Semester: {this.state.deletesemester}</span>
             </li>
            </ul>
            <ul className="list-input">
             <li>
                 <span className="ititle">Supervisor: {this.state.deletesupervisor}</span>
             </li>
             </ul>
             <ul className="list-input">
             <li>
                 <span className="ititle">Course type: {this.state.deletecoursetype}</span>
             </li>
            </ul>
            <br />
            <ul className="list-input">
             <li>
                 <span className="ititle">Doctoral Program: {this.state.deletedoctoralprogram}</span>
             </li>
            </ul>
            <br />
            <ul className="list-input">
             <li>
                 <span className="ititle">Program Leader: {this.state.deleteprogramdirector}</span>
             </li>
            </ul>
         <br />
         <ul className="list-input">
            <li>
                <div className="container-login-form-btna">
                 <button type ="submit" className="login-form-btna">
                     Delete
                 </button>
                </div>
            </li>
        </ul>
            </form>
        }
        else{
            if (this.state.edit) {
             content =  
         <form onSubmit={this.SubmitHandlerForEdit}>
             <br/>
             <span className="inf-title">
                Edit Users
		</span>
        <br />
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                   Email
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="email" name="email" value={this.state.email} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Phone Number
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="tel" name="phonenumber" value={this.state.phonenumber} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>

        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    First name
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="firstname" value={this.state.firstname} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Last name
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="lastname" value={this.state.lastname} onChange={this.changeHandler} required/>
            </div>
            </li>
            </ul>
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Supervisor
                </span>
            </div>
            
            <div className="wrap-inputa">
            
            <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForSupervisor(e.target.value)} value={this.state.value} required>
        <option value={this.state.supervisor} selected disabled hidden>{this.state.supervisor}</option>
                        {this.props.teachernames.map(item => (                                
                                <option key={item._id} name ="supervisor" value={item._id}>{item.TeacherName}</option>
                        )) } 
            </select>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Neptun code
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="neptuncode" value={this.state.neptuncode} onChange={this.changeHandler} required/>
            </div>
            </li>
            </ul>
            
         <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Doctoral Program
                </span>
            </div>
            
            <div className="wrap-inputa">
            <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForProgramDirector(e.target.value)} value={this.state.value} required>
                            <option value={this.state.doctoralprogram} selected disabled hidden>{this.state.doctoralprogram}</option>
                            {this.props.DoctoralPrograms.map(item => (                                
                                <option key={item._id} name ="ProgramName" value={item._id}>{item.ProgramName}</option>
                        )) } 
            </select>

            </div>
            </li>
            <li>
            <div>
                <span className="txt1">    
                    Program Leader
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input  className="inputa"  disabled="disabled"  placeholder="Automatic Field" type="text" name="programdirector" value={this.state.programdirector} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">    
                    Course Type
                </span>
            </div>
            
            <div className="wrap-inputa">
                <select name="coursetype" className="inputa" onChange={this.changeHandler} required>
                        <option value={this.state.coursetype} selected disabled hidden>{this.state.coursetype}</option>
                    <option value="Nappali">Nappali</option>
                    <option value="Levelező">Levelező</option>
                </select>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Semester
                </span>
            </div>
            
            <div className="wrap-inputa">
            <select name="semester" className="inputa" onChange={this.changeHandler} required>
                    <option value={this.state.semester} selected disabled hidden> {this.state.semester} </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
            </select>
            </div>
            </li>
        </ul>
            <br/>
        
                <div className="container-login-form-btna">
                    <button type ="submit" className="login-form-btna">
                        Save
                    </button>
                </div>
            </form>;
        }
        else{
         content= <form onSubmit={this.SubmitHandler}>
                  <br />
            <span className="inf-title">
                 User Administration 
			</span>
            <br />
    <div className="targy">  
    <ul className="list-containers">
             <li className="paddingb">
                Add new semester for users:
             </li>
             <li className="paddingl">
             <input 
                type="checkbox" 
                className="CheckBoxAdmin"
                onChange={this.handleClickForAddNewSemester}/>
             </li> 
        </ul>
      <div className="atables">
            <table className="acontent-table">
                <thead>
                 <tr>
                 <th>Email</th>
                 <th>First Name</th>             
                 <th>Last Name</th>
                 <th>Phone number</th>  
                 <th>Neptun code</th>  
                 <th>Supervisor</th>
                 <th>Doctoral Program</th>  
                 <th>Program Leader</th> 
                 <th>Course Type</th>  
                 <th>Sem.</th>
                 <th>Edit</th>
                 <th>Del.</th>
                 <th>Gen.</th>
                 </tr>   
                </thead>
        
                
                <tbody>
                {this.props.items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Email:">{item.email}</td>
                    <td data-label="First name:">{item.firstname}</td>
                    <td data-label="Last name:">{item.lastname}</td>  
                    <td data-label="Phone:">{item.phonenumber}</td>  
                    <td data-label="Neptun code:">{item.neptuncode}</td>  
                    <td data-label="Supervisor:">{item.supervisor}</td>  
                    <td data-label="DoctoralProgram:">{item.doctoralprogram}</td> 
                    <td data-label="ProgramLeader:">{item.programdirector}</td>   
                    <td data-label="Course type:">{item.coursetype}</td>  
                    <td data-label="Semester:">{item.semester}</td> 
                    <td data-label="Edit:">
                        <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.edit} 
                                data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname+'|'+item.phonenumber+
                                '|'+ item.neptuncode+'|'+item.supervisor+'|'+item.doctoralprogram+'|'+item.programdirector+
                                '|'+item.coursetype+'|'+item.semester}
                                onChange={ this.handleClick }/>
                    </td>
                    <td data-label="Del.:">
                        <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.delete} 
                                data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname+'|'+item.phonenumber+
                                '|'+ item.neptuncode+'|'+item.supervisor+'|'+item.doctoralprogram+'|'+item.programdirector+
                                '|'+item.coursetype+'|'+item.semester}
                                onChange={ this.handleClickforDelete } />
                    </td>
                    <td data-label="Gen.::">
                        <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.generate} 
                                data-mssg={item._id+'|'+item.email+'|'+item.firstname+'|'+item.lastname}
                                onChange={ this.handleClickforGenNewPass } />
                    </td>         
                  </tr>
                ))} 
                </tbody>
            </table>    
        </div>
    </div> 
        </form>;
        }}}}
        return ( 
        <div>          
            {content} 
            <br /> 
        </div> 
        )
    }
}

export default PostUserAdministration;
