import DeIkLogo from '../../Style/DeIKLogo.png';
import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import Nav from './AdminNav';
import PostFormNewTeacher from './PostFormsJS/PostAddNewTeacher';
import '../../Style/adminpage.css';

function Subjects() {
    useEffect(()=>{
        fetchItems();
      },[]);
      
      const [items,setItems] = useState([]);
    
      const fetchItems = async () =>{
        const data = await fetch(
          'http://localhost:50111/api/getteachers'
          
        );
        const items = await data.json();    
        setItems(items);
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
    <PostFormNewTeacher items={items}/>
    </div>
    </div>
</div>
</div>
  );
}

export default Subjects;