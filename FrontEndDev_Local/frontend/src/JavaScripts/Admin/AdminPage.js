import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import Nav from './AdminNav';
import '../../Style/adminpage.css';
import UsersAdministrationForm from './PostFormsJS/PostUserAdministrationForm'


function  Users() {
    useEffect(()=>{
        fetchDoctoralProgram();
        fetchTeacherNames();
        fetchItems();
      },[]);
      
      const [items,setItems] = useState([]);
      const [DoctoralPrograms,setDoctoralPrograms] = useState([]);
      const [Teachernames,setTeacherNames] = useState([]);
    
    const fetchItems = async () =>{
    const data = await fetch(
      'http://localhost:50111/api/getusers'
          
        );
        const items = await data.json();    
        setItems(items);
    };

    const fetchDoctoralProgram = async () =>{
      const data = await fetch(
        'http://localhost:50111/api/getdoctoralprograms'
      );
      const items = await data.json();    
      setDoctoralPrograms(items);
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
                <Nav/> 
                <UsersAdministrationForm items={items} teachernames={Teachernames} DoctoralPrograms={DoctoralPrograms}/>
    </div>
    </div>
</div>
</div>
  );
}

export default Users;
