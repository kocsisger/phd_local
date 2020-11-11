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
            SubjectID:'',
            Subject:'',
            SubjectEN:'',
            Teacher:'',
            DeleteSubjectID:'',
            DeleteSubjectEN:'',
            DeleteSubject:'',
            DeleteTeacher:'',
            edit:false,
            delete:false,
        }
        this.handleChange = this.handleClick.bind(this);
    }
    
    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }
    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getsubjects',this.state)
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
            Teacher: selectedTeacher.TeacherName                
        })         
    }

    SubmitHandlerForEdit= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/editsubjects',this.state)
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
            SubjectEN: datas[3],
            Teacher: datas[2],
            Subject: datas[1],
            SubjectID: datas[0]
        })   
    }

    handleClickforDelete = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            DeleteSubjectEN: datas[3],
            DeleteTeacher: datas[2],
            DeleteSubject: datas[1],
            DeleteSubjectID: datas[0],
            delete: !this.state.delete,
        })   
    }

    SubmitHandlerForDelete= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/deletesubjects',this.state)
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
            const{Subject,SubjectEN}=this.state;
            let content = null;
            if(this.state.delete){
                content =  
                <form onSubmit={this.SubmitHandlerForDelete}>
                     <span className="inf-title">Do you want to delete this Subject?</span>
                <br />
                <ul className="list-input">
                 <li>
    
                 <span className="ititle">Subject (HU): {this.state.DeleteSubject}</span>
                 </li>
             </ul>
             <br />
             <ul className="list-input">
                 <li>
    
                 <span className="ititle">Subject (EN): {this.state.DeleteSubjectEN}</span>
                 </li>
             </ul>
             <br/>
             <ul className="list-input">
                 <li>
                 <span className="ititle">Teacher's Name: {this.state.DeleteTeacher}</span>
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
            }else{
            if (this.state.edit) {
                content =  
            <form onSubmit={this.SubmitHandlerForEdit}>
                <span className="inf-title">
                   Edit Subject
                </span>
           <br />
               <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Subject (HU):
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="text" name="Subject" value={this.state.Subject} onChange={e => {
                        this.setState({ Subject: e.target.value})}} required/>
                </div>
                </li>
            </ul>
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Subject (EN):
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="text" name="Subject" value={this.state.SubjectEN} onChange={e => {
                        this.setState({ SubjectEN: e.target.value})}} required/>
                </div>
                </li>
            </ul>
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                       Teacher's name:
                    </span>
                </div>
                
                <div className="wrap-inputa">
            <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForTeachers(e.target.value)} value={this.state.value} required>
                <option value={this.state.Teacher} selected disabled hidden>{this.state.Teacher}</option>
                        {this.props.teachernames.map(item => (                                
                                <option key={item._id} name ="Teacher" value={item._id}>{item.TeacherName}</option>
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
            content=  <form onSubmit={this.SubmitHandler}>
            <span className="inf-title">
                 Subject Administration 
			</span>
            <br />
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Subject's name (HU):
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="text" name="Subject" value={Subject} onChange={this.changeHandler} required/>
                </div>
                </li>
            </ul>

            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Subject's name (EN):
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="text" name="SubjectEN" value={SubjectEN} onChange={this.changeHandler} required/>
                </div>
                </li>
            </ul>
    
    
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Teacher's name:
                    </span>
                </div>
                
                <div className="wrap-inputa">
                <select className="inputa" onChange={(e) => this.SubmitChangeHandlerForTeachers(e.target.value)} value={this.state.value} required>
                         <option value="" selected disabled hidden> -- Please choose a teacher! -- </option>
                            {this.props.teachernames.map(item => (                                
                                    <option key={item._id} name ="Teacher" value={item._id}>{item.TeacherName}</option>
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
                     <th>Subject (HU)</th>
                     <th>Subject (EN)</th>
                     <th>Teacher's name</th>            
                     <th>Edit</th>
                     <th>Delete</th>      
                     </tr>   
                    </thead>
            
                    
                    <tbody>
                    {this.props.items.map(item => (
                      <tr key={item._id}>
                        <td data-label="Subject (HU):">{item.Subject}</td>
                        <td data-label="Subject (EN):">{item.SubjectEN}</td>
                        <td data-label="Teacher:">{item.Teacher}</td>                    
                        <td data-label="Edit:">
                            <input 
                                type="checkbox" 
                                className="CheckBoxAdmin"
                                checked={ this.state.edit} 
                                data-mssg={item._id+"|"+item.Subject+"|"+item.Teacher+"|"+item.SubjectEN}
                                onChange={ this.handleClick }/>
                        </td>
                        <td data-label="Del.:">
                            <input 
                                    type="checkbox" 
                                    className="CheckBoxAdmin"
                                    checked={ this.state.delete} 
                                    data-mssg={item._id+"|"+item.Subject+"|"+item.Teacher+"|"+item.SubjectEN}
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