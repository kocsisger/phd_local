import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import Nav from './AdminNav';
import AdminAdministrationForm from './PostFormsJS/PostAdminAdministrationForm';
import '../../Style/adminpage.css';


function  Users() {
    useEffect(()=>{
        fetchItems();
      },[]);
      
      
    
      const [items,setItems] = useState([]);
    
      const fetchItems = async () =>{
        const data = await fetch(
          'http://localhost:50111/api/getadmins'
          
        );
        const items = await data.json();    
        setItems(items);
      } ;
    
  return (
<div>
<style>{'body { background-color: #f6f6f6; }'}</style>
<div className="limitera">
    <div className="containera">
        <div className="wrap-logina">
                <Nav/>
                <AdminAdministrationForm items={items}/>
    </div>
    </div>
</div>
</div>
  );
}

export default Users;