import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';

function refreshPage() {
    window.location.reload(false)
}

class PostAddNewSubjectForm extends Component{
    constructor(props){
        super(props)
        this.state={
            DirectorID:'',
            ProgramName:'',
            ProgramDirectorName:'',
            DeleteDirectorID:'',
            DeleteProgramName:'',
            DeleteProgramDirector:'',
            delete:false,
            edit:false
        }
        this.handleChange = this.handleClick.bind(this);
    }
    
    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }
    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getdoctoralprograms',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }
    SubmitHandlerForDelete= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/deleteprograms',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }

    SubmitChangeHandlerForTeachers = (teacherId) =>{
        const selectedTeacher = this.props.teachernames.find(teacher => teacher._id === teacherId)
        this.setState({
            ProgramDirectorName: selectedTeacher.TeacherName                
        })         
    }

    handleClickforDelete = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            DeleteProgramDirector: datas[2],
            DeleteProgramName: datas[1],
            DeleteDirectorID: datas[0],
            delete: !this.state.delete,
        })   
    }

    SubmitHandlerForEdit= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/editdoctoralprograms',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }

    handleClick = event => {
        const datas = event.target.dataset.mssg.split('|');   
        this.setState({      
            edit: !this.state.edit,
            ProgramDirectorName: datas[2],
            ProgramName: datas[1],
            DirectorID: datas[0]
        }) 
    }
    render(){
        const{ProgramName}=this.state;
        let content = null;
        if(this.state.delete){
            content =  
            <form onSubmit={this.SubmitHandlerForDelete}>
                 <span className="inf-title">Do you want to delete this Program?</span>
            <br />
            <ul className="list-input">
             <li>

             <span className="ititle">Program Name: {this.state.DeleteProgramName}</span>
             </li>
         </ul>
         <br />
         <ul className="list-input">
             <li>
             <span className="ititle">Program Leader: {this.state.DeleteProgramDirector}</span>
             </li>
         </ul>
 
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
        } else {
        if (this.state.edit) {
            content =  
        <form onSubmit={this.SubmitHandlerForEdit}>
            <span className="inf-title">
               Edit Doctoral Programs
            </span>
       <br />
           <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Program:
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="ProgramName" value={this.state.ProgramName} onChange={e => {
                    this.setState({ ProgramName: e.target.value})}} required/>
            </div>
            </li>
        </ul>
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Program Leader:
                </span>
            </div>
            
            <div className="wrap-inputa">
            <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForTeachers(e.target.value)} value={this.state.value} required>
                <option value={this.state.ProgramDirectorName} selected disabled hidden>{this.state.ProgramDirectorName}</option>
                        {this.props.teachernames.map(item => (                                
                                <option key={item._id} name ="ProgramDirectorName" value={item._id}>{item.TeacherName}</option>
                        )) } 
            </select>
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
        </form>;
       }
       else{
        content= <form onSubmit={this.SubmitHandler}>
        <span className="inf-title">
                 Doctoral Programs 
		</span>
        <br />
        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Doctoral Program:
                </span>
            </div>
            
            <div className="wrap-inputa">
                <input className="inputa" type="text" name="ProgramName" value={ProgramName} onChange={this.changeHandler} required/>
            </div>
            </li>
        </ul>


        <ul className="list-input">
            <li>
            <div>
                <span className="txt1">
                    Program Leader:
                </span>
            </div>
            
            <div className="wrap-inputa">
            <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForTeachers(e.target.value)} value={this.state.value} required>
                     <option value="" selected disabled hidden> -- Please choose a teacher! -- </option>
                        {this.props.teachernames.map(item => (                                
                                <option key={item._id} name ="ProgramDirectorName" value={item._id}>{item.TeacherName}</option>
                        )) } 
            </select>
            </div>
            </li>
        </ul>

        <ul className="list-input">
            <li>
            <div className="container-login-form-btna">
                <button type ="submit" className="login-form-btna">
                    Registration
                </button>
            </div>
            </li>
        </ul>
        <br />
    <div className="targy">  
      <div className="atables">
            <table className="acontent-table">
                <thead>
                 <tr>
                 <th>Doctoral Program</th>
                 <th>Program Leader</th>             
                 <th>Edit</th>
                 <th>Delete</th>     
                 </tr>   
                </thead>        
                <tbody>
                {this.props.items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Program:">{item.ProgramName}</td>
                    <td data-label="Leader:">{item.ProgramDirectorName}</td>                    
                    <td data-label="Edit:">
                            <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.edit} 
                                data-mssg={item._id+"|"+item.ProgramName+"|"+item.ProgramDirectorName}
                                onChange={ this.handleClick }/>
                    </td>
                    <td data-label="Del.:">
                        <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.delete} 
                                data-mssg={item._id+"|"+item.ProgramName+"|"+item.ProgramDirectorName}
                                onChange={ this.handleClickforDelete } />
                    </td>                     
                  </tr>
                ))} 
                </tbody>
            </table>    
            </div>
         </div>  
        </form>
       }}

     return (            
        <div>          
            {content}
            <br /> 
        </div> 
        )
    }
}

export default PostAddNewSubjectForm;