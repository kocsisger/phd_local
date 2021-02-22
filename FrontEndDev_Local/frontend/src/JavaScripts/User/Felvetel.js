import React, {useState,useEffect} from 'react';
import '../../Style/App.css';
import PostForm from './PostFormJSUser/PostForm'
import Nav from './Nav';
import Userdata from './UserDataGetSet';

function Felvetel()  {

  useEffect(()=>{
    fetchItems();
    fetchSubjectItems();
    fetchTeacherNames();
    fetchDate();
  },[]);
  
  

  const [items,setItems] = useState([]);
  const [Subjectitems,setSubjectItems] = useState([]);
  const [Teachernames,setTeacherNames] = useState([]);
  const [dates,setDates] = useState([]);

  const fetchItems = async () =>{
    const data = await fetch(
      'http://localhost:50111/api/posts/'+Userdata.GetUserID()
      
    );
    const items = await data.json();    
    setItems(items);
  } ;

  const fetchDate = async () =>{
    const data = await fetch(
      'http://localhost:50111/api/editsemester/'+Userdata.GetUserID()+'/getdates'
    );
    const dates = await data.json();    
    setDates(dates);
    console.log(dates)
  } ;

  const fetchSubjectItems = async () =>{
    const subjectdata = await fetch(
      'http://localhost:50111/api/subjects'
      
    );
    const Subjectitems = await subjectdata.json();    
    setSubjectItems(Subjectitems);
    
  };

  const fetchTeacherNames = async () =>{
    const teachername = await fetch(
      'http://localhost:50111/api/NameAndEmail'
      
    );
    const Teachernames = await teachername.json();    
    setTeacherNames(Teachernames);
  };

  const handlePostSubmit = (person) => {
    setItems([...items, person])
    
  }
  
  return (
    <div>    
      <Nav />
      <div className="targy">  
      <br/>
      <span className="info-titleuser">Subject registration</span>
      <br/>  
            { dates ? <div className="inputs">{Subjectitems.length > 0 && <PostForm onPostSubmit={handlePostSubmit} Subjectitems={Subjectitems} teachernames={Teachernames} items={items}/>} </div> 
            : <span className="error-mess">&#x2612; No Subject Registration Period!</span>}
      <br/>
      <div className="tables">
        
        <table className="content-table">
            <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th>             
              <th>Subject Status</th>
              </tr>   
            </thead>    
            <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td data-label="Subject">{item.targy}</td>
                    <td data-label="Teacher">{item.oktato}</td>                    
                    <td data-label="Subject Status">{item.tstatus}</td>           
                              
                  </tr>
                ))} 
            </tbody>
      </table>    
</div>
</div>
    </div>
  );
}


export default Felvetel;
