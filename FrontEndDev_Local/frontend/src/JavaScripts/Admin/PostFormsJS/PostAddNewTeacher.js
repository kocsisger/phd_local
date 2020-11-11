import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';

function refreshPage() {
    window.location.reload(false)
}

class PostAddNewTeacher extends Component{
    constructor(props){
        super(props)
        this.state={
            TeacherName:'',
            TeacherEmail:'',
            EditTeacherName:'',
            EditTeacherEmail:'',
            EditTeacherID:'',
            edit:false,
            DeleteTeacherEmail:'',
            DeleteTeacherName:'',
            DeleteTeacherID:'',
            delete:false
        }
        this.handleChange = this.handleClick.bind(this);
    }
    
    changeHandler = (e) =>{
        this.setState({ [e.target.name]:e.target.value})
    }

    SubmitHandler = e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/getteachers',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }

    SubmitHandlerForEdit= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/editteachers',this.state)
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
        axios.post('http://localhost:50111/api/deleteteachers',this.state)
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
            EditTeacherEmail: datas[2],
            EditTeacherName: datas[1],
            EditTeacherID: datas[0]
        })   
    }

    handleClickforDelete = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            DeleteTeacherEmail: datas[2],
            DeleteTeacherName: datas[1],
            DeleteTeacherID: datas[0],
            delete: !this.state.delete,
        })   
    }
    
    render(){
        const{TeacherName,TeacherEmail}=this.state;
        let content = null;
        if(this.state.delete){
            content =  
            <form onSubmit={this.SubmitHandlerForDelete}>
                 <span className="inf-title">Do you want to delete this teacher?</span>
            <br />
            <ul className="list-input">
             <li>

             <span className="ititle">Email: {this.state.DeleteTeacherEmail}</span>
             </li>
         </ul>
         <br />
         <ul className="list-input">
             <li>
             <span className="ititle">Teacher's name: {this.state.DeleteTeacherName}</span>
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
        }
        else{
        if (this.state.edit) {
             content =  
         <form onSubmit={this.SubmitHandlerForEdit}>
             <span className="inf-title">
                Edit Teachers
		</span>
        <br />
            <ul className="list-input">
             <li>
             <div>
                 <span className="txt1">
                     Teacher's name:
                 </span>
             </div>
             
             <div className="wrap-inputa">
                 <input className="inputa" type="text" name="EditTeacherName" value={this.state.EditTeacherName} onChange={e => {
                     this.setState({ EditTeacherName: e.target.value})}} required/>
             </div>
             </li>
         </ul>
         <ul className="list-input">
             <li>
             <div>
                 <span className="txt1">
                     Teacher's email:
                 </span>
             </div>
             
             <div className="wrap-inputa">
                 <input className="inputa" type="email" name="EditTeacherEmail" value={this.state.EditTeacherEmail} onChange={e => {
                     this.setState({ EditTeacherEmail: e.target.value})}} required/>
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
                Teacher Administration 
		</span>
        <br />
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Teacher's name:
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="text" name="TeacherName" value={TeacherName} onChange={this.changeHandler} required/>
                </div>
                </li>
            </ul>
            <ul className="list-input">
                <li>
                <div>
                    <span className="txt1">
                        Teacher's email:
                    </span>
                </div>
                
                <div className="wrap-inputa">
                    <input className="inputa" type="email" name="TeacherEmail" value={TeacherEmail} onChange={this.changeHandler} required/>
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
           
        <div className="targy">  
          <div className="atables">
                <table className="acontent-table">
                    <thead>
                     <tr>
                     <th>Teacher's name</th>
                     <th>Email</th>             
                     <th>Edit</th> 
                     <th>Delete</th>     
                     </tr>   
                    </thead>
                    <tbody>
                    {this.props.items.map(item => (
                      <tr key={item._id}>
                        <td data-label="Name">{item.TeacherName}</td>
                        <td data-label="Email">{item.TeacherEmail}</td>                    
                        <td data-label="Edit:">
                            <input 
                                        type="checkbox"
                                        className="CheckBoxAdmin"
                                        checked={ this.state.edit} 
                                        data-mssg={item._id+"|"+item.TeacherName+"|"+item.TeacherEmail}
                                        onChange={ this.handleClick } />
                        </td>
                        <td data-label="Del.:">
                            <input 
                                    type="checkbox"
                                    className="CheckBoxAdmin"
                                    checked={ this.state.delete} 
                                    data-mssg={item._id+"|"+item.TeacherName+"|"+item.TeacherEmail}
                                    onChange={ this.handleClickforDelete } />
                        </td>                
                      </tr>
                    ))} 
                    </tbody>
                </table>   
            </div>
        </div>
        </form>;
        }}
        return ( 
        <div>          
            {content}
            <br />  
        </div> 
        )
    }
}

export default PostAddNewTeacher;