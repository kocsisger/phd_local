import React, {Component} from 'react';
import axios from 'axios';
import '../../../Style/adminpage.css';
import AdminData from '../AdminDataGetSet';

function refreshPage() {
    window.location.reload(false)
}

class PostAdminAdministration extends Component{
    constructor(props){
        super(props)
        this.state={
            AdminID:'',
            FirstName:'',
            LastName:'',
            Email:'',
            DeleteAdminID:'',
            DeleteAdminFirstName:'',
            DeleteAdminLastName:'',
            DeleteAdminEmail:'',
            GenerateAdminID:'',
            GenerateAdminFirstName:'',
            GenerateAdminLastName:'',
            GenerateAdminEmail:'',
            delete:false,
            edit:false,
            generate:false,
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
        axios.post('http://localhost:50111/api/editadmins',this.state)
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
            Email: datas[3],
            LastName: datas[2],
            FirstName: datas[1],
            AdminID: datas[0]
        })
    }

    SubmitHandlerForDelete= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/deleteadmins',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }

    SubmitHandlerForGenerate= e=>{ 
        e.preventDefault()
        axios.post('http://localhost:50111/api/gennewpassforadmin',this.state)
        .then(response => {
            alert(response.data);
            refreshPage() 
        })
        .catch(error => {
            alert(error)
            refreshPage() 
        })
    }

    SubmitHandlerForReloadPage= e=>{ 
        e.preventDefault()
        refreshPage() 
    }

    handleClickforDelete = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            DeleteAdminEmail: datas[3],
            DeleteAdminLastName: datas[2],
            DeleteAdminFirstName: datas[1],
            DeleteAdminID: datas[0],
            delete: !this.state.delete,
        })   
    }

    handleClickforGenNewPassForAdmin = event => {
        const datas = event.target.dataset.mssg.split('|');
        this.setState({
            GenerateAdminEmail: datas[3],
            GenerateAdminLastName: datas[2],
            GenerateAdminFirstName: datas[1],
            GenerateAdminID: datas[0],
            generate: !this.state.generate,
        })   
    }
    
    render(){
        let content = null;
        if(this.state.DeleteAdminID === AdminData.GetAdminID() || this.state.GenerateAdminID === AdminData.GetAdminID()){
            content = <form onSubmit={this.SubmitHandlerForReloadPage}>
            <br />
            <span className="inf-title">You cannot delete or generate a new password for your own user!</span>
            <br />
            <span className="ititle">(If you would like to change your password, you can do it on your profile.)</span>
    <ul className="list-input">
        <li>
        <div className="container-login-form-btna">
            <button type ="submit" className="login-form-btna">
                Leave
            </button>
        </div>
        </li>
    </ul>
       </form>
        }else{
        if(this.state.generate){
            content =  
            <form onSubmit={this.SubmitHandlerForGenerate}>
                 <span className="inf-title">Would you like to generate <br/> a new password for this admin?</span>
            <br />
            <ul className="list-input">
             <li>

             <span className="ititle">Email: {this.state.GenerateAdminEmail}</span>
             </li>
         </ul>
         <br />
         <ul className="list-input">
             <li>
             <span className="ititle">Admin's name: {this.state.GenerateAdminFirstName} {this.state.GenerateAdminLastName}</span>
             </li>
         </ul>
 
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
        }else
        {
        if(this.state.delete){
            content =  
            <form onSubmit={this.SubmitHandlerForDelete}>
                 <span className="inf-title">Do you want to delete this admin?</span>
            <br />
            <ul className="list-input">
             <li>

             <span className="ititle">Email: {this.state.DeleteAdminEmail}</span>
             </li>
         </ul>
         <br />
         <ul className="list-input">
             <li>
             <span className="ititle">Admin's name: {this.state.DeleteAdminFirstName} {this.state.DeleteAdminLastName}</span>
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
             <br/>
             <span className="inf-title">
                Edit Admins
		</span>
        <br />
        <ul className="list-input">
             <li>
             <div>
                 <span className="txt1">
                     First Name:
                 </span>
             </div>
             
             <div className="wrap-inputa">
                 <input className="inputa" type="text" name="FirstName" value={this.state.FirstName} onChange={e => {
                     this.setState({ FirstName: e.target.value})}} required/>
             </div>
             </li>
         </ul>

         <ul className="list-input">
             <li>
             <div>
                 <span className="txt1">
                     Last Name:
                 </span>
             </div>
             
             <div className="wrap-inputa">
                 <input className="inputa" type="text" name="LastName" value={this.state.LastName} onChange={e => {
                     this.setState({ LastName: e.target.value})}} required/>
             </div>
             </li>
         </ul>

         <ul className="list-input">
             <li>
             <div>
                 <span className="txt1">
                     Admin's email:
                 </span>
             </div>
             
             <div className="wrap-inputa">
                 <input className="inputa" type="email" name="Email" value={this.state.Email} onChange={e => {
                     this.setState({Email: e.target.value})}} required/>
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
                 <br />
            <span className="inf-title">
                 Admin Administration 
			</span>
            <br />
    <div className="targy">  
      <div className="atables">
            <table className="acontent-table">
                <thead>
                 <tr>
                 <th>Email</th>
                 <th>First Name</th>             
                 <th>Last Name</th> 
                 <th>Edit</th> 
                 <th>Delete</th>
                 <th>Gen.</th>  
                 </tr>   
                </thead>
        
                
                <tbody>
                {this.props.items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Email:">{item.email}</td>
                    <td data-label="First name:">{item.firstname}</td>
                    <td data-label="Last name:">{item.lastname}</td>          
                    <td data-label="Edit:">
                        <input 
                            type="checkbox" 
                            className="CheckBoxAdmin"
                            checked={ this.state.edit} 
                            data-mssg={item._id+"|"+item.firstname+"|"+item.lastname+"|"+item.email}
                            onChange={ this.handleClick }/>
                    </td>   
                    <td data-label="Del.:">
                        <input 
                            type="checkbox" 
                            className="CheckBoxAdmin"
                            checked={ this.state.delete} 
                            data-mssg={item._id+"|"+item.firstname+"|"+item.lastname+"|"+item.email}
                            onChange={ this.handleClickforDelete } />  
                    </td>
                    <td data-label="Gen.:">
                        <input 
                            type="checkbox" 
                            className="CheckBoxAdmin"
                            checked={ this.state.delete} 
                            data-mssg={item._id+"|"+item.firstname+"|"+item.lastname+"|"+item.email}
                            onChange={ this.handleClickforGenNewPassForAdmin } />  
                    </td>                
                  </tr>
                ))} 
                </tbody>
            </table>    
        </div>
    </div>  
        </form>;
        }
    }}}
        return ( 
        <div>          
            {content}
            <br />  
        </div> 
        )
    }
}

export default PostAdminAdministration;