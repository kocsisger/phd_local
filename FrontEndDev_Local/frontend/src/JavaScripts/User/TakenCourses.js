
import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import Nav from './Nav';
import Userdata from './UserDataGetSet';
function TakenCourses() {

  useEffect(()=>{
    fetchItems();    
  },[]);
  
  const [items,setItems] = useState([]);

  const fetchItems = async () =>{
    const data = await fetch(
      'http://localhost:50111/api/posts/'+Userdata.GetUserID()+'/history/h'
      
    );
   
    
    const items = await data.json(); 
      
    setItems(items);    

  } ;
  
  if(items.length!==0){
    return (
      <div>    
      <Nav />
  
      <div className="targy">        
      <br/>
      <span className="info-titleuser">Course History</span>     
      <br/>
      <div className="tables">
        
        <table className="content-table">
            <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th> 
              <th>Status</th>  
              </tr>   
            </thead>
        
                
    
            <tbody>
                {              
                items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Subject">{item.targy}</td>
                    <td data-label="Teacher">{item.oktato}</td> 
                    <td data-label="Status">{item.tstatus}</td>
                  </tr>
                ))
                
                } 
            </tbody>
      </table>    
  </div>
  </div>
    </div>
    );
  }
  else{
    return(
      <div>    
      <Nav />
  
      <div className="targy">        
      <br/>
      <span className="info-titleuser">Course History</span>     
      <br/>   
      <div className="tables">
        
        <table className="content-table">
            <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th> 
              <th>Status</th>              
              </tr>   
            </thead>
            <tbody>
                  <tr>
                    <td data-label="Subject"></td>
                    <td data-label="Teacher"></td>
                    <td data-label="Status"></td> 
                  </tr>
            </tbody>
      </table>    
  </div>
  </div>
    </div>
    );
  }
  
}

export default TakenCourses;
