import React, {useState,useEffect} from 'react';
import Nav from './AdminNav';
import PostSemesterForm from './PostFormsJS/PostSemesterForm'

function Semester() {
    useEffect(()=>{
        fetchdates();
      },[]);
      
    const [semesterData,setSemesterData] = useState([]);

    const fetchdates = async () =>{
        const data = await fetch(
            'http://localhost:50111/api/editsemester'
          );
          const semesterData = await data.json();    
          setSemesterData(semesterData); 
      };

    return (
        <div>
            <style>{'body { background-color: #f6f6f6; }'}</style>
            <div className="limitera">
                <div className="containera">
                    <div className="wrap-logina">
                        <Nav />
                        <br />
                        <span className="inf-title">
                            Subject Registration period
			            </span>
                        <PostSemesterForm semesterData = {semesterData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Semester;