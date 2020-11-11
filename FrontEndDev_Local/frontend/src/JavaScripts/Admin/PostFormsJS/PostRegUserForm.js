import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';

function refreshPage() {
    window.location.reload(false)
}

class PostRegUserForm extends Component{
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            phonenumber:'',
            neptuncode:'',
            supervisor:'',
            supervisorID:'',
            doctoralprogram:'',
            coursetype:'',
            semester:'',
            programdirector:'',
        }
    }


    SubmitChangeHandlerForProgramDirector = (targyId) =>{
        const selectedTargy = this.props.Porgramitems.find(doctoralprogram => doctoralprogram._id === targyId)
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
        axios.post('http://localhost:50111/api/RegUser',this.state)
        .then(response => {
            alert(response.data);
            refreshPage();
        })
        .catch(error => {
            alert("An error occurred during the registration. The registration failed!");
            refreshPage();
        })
    }
    render(){
        const{firstname,lastname,email,phonenumber,neptuncode,programdirector}=this.state;
        return (            
        <form onSubmit={this.SubmitHandler}>
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                   Email
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="email" name="email" value={email} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Phone Number
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="tel" name="phonenumber" value={phonenumber} onChange={this.changeHandler} required/>
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
                <input className="inputa" type="text" name="firstname" value={firstname} onChange={this.changeHandler} required/>
            </div>
            </li>
            <li>
            <div>
                <span className="txt1">
                    Last name
                </span>
            </div>
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="lastname" value={lastname} onChange={this.changeHandler} required/>
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
                     <option value="" selected disabled hidden> -- Please choose a teacher! -- </option>
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
                <input className="inputa" type="text" name="neptuncode" value={neptuncode} onChange={this.changeHandler} required/>
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
                            <option value="" selected disabled hidden> -- Please choose a Doctoral Program! -- </option>
                            {this.props.Porgramitems.map(item => (                                
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
                <input  className="inputa"  disabled="disabled"  placeholder="Automatic Field" type="text" name="programdirector" value={programdirector} onChange={this.changeHandler} required/>
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
                    <option value="" selected disabled hidden> -- Please choose the type of course! -- </option>
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
                    <option value="" selected disabled hidden> -- Please choose a number! -- </option>
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
        
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                    Registration
                </button>
            </div>
        </form>
        )
    }
}

export default PostRegUserForm;
