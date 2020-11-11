import DeIkLogo from '../../Style/DeIKLogo.png' 
import React, {useState,useEffect} from 'react';
import '../../Style/adminpage.css';
import PostRegUserForm from './PostFormsJS/PostRegUserForm';
import Nav from './AdminNav';




function AdminPageRegUser() {

  useEffect(()=>{
    fetchItems();    
    fetchTeacherNames();
  },[]);

  const [items,setItems] = useState([]);
  const [Teachernames,setTeacherNames] = useState([]);

  const fetchItems = async () =>{
    const data = await fetch(
      'http://localhost:50111/api/getdoctoralprograms'
    );
    const items = await data.json();    
    setItems(items);
  };

  const fetchTeacherNames = async () =>{
    const teachername = await fetch(
        'http://localhost:50111/api/NameAndEmail'
        
      );
      const Teachernames = await teachername.json();    
      setTeacherNames(Teachernames);  
  };

  

  return (
<div>
<style>{'body { background-color: #f6f6f6; }'}</style>
<div className="limitera">
<div className="containera">
    <div className="wrap-logina">
        <div className="img-wrapa">
            <img src={DeIkLogo} alt={"DeIkLogo"}/> 
        </div>
        <div className="titlea"> 
            <span className="login-form-title">
            Doctoral School <br /> of Informatics
			</span>
        </div>
            <Nav/>
            <br />
            <span className="inf-title">
                 User Registration 
			</span>
            <br />
            <PostRegUserForm Porgramitems={items} teachernames={Teachernames}/>
    </div>
</div>
</div>
</div>
  );
}

export default AdminPageRegUser;