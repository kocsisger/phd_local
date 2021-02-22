import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import Nav from './AdminNav';
import PostFormNewSubject from './PostFormsJS/PostAddNewSubjectForm';
import '../../Style/adminpage.css';


function Subjects() {
    useEffect(()=>{
        fetchItems();
        fetchTeacherNames();
      },[]);
      
      
    
      const [items,setItems] = useState([]);
      const [Teachernames,setTeacherNames] = useState([]);
    
      const fetchItems = async () =>{
        const data = await fetch(
          'http://localhost:50111/api/getsubjects'
          
        );
        const items = await data.json();    
        setItems(items);
      } ;

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
                <br />
    <PostFormNewSubject teachernames={Teachernames} items={items}/>
    </div>
    </div>
</div>
</div>
  );
}

export default Subjects;