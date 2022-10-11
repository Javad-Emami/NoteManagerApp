
import React,{useState} from 'react' 
import Constant from '../Utilities/Constant'
import CreateNote from './CreateNote'
import UpdateNote from './UpdateNote';
import { useNavigate } from 'react-router-dom';



export default function NoteDetails(props) {
  const initialFormData=Object.freeze({
    userId:props.post.id,
});
    const [formData,setFormData]=useState([]);
    const [showNewNote, setShowNewNote] = useState(false);
    const [noteBeingUpdated, setNoteBeingUpdated] = useState(null);
    //const navigate=useNavigate();

   
    // console.log(`the Id is: ${initialFormData.userId}`);
    
    function getUserNote(){
    const url = `https://localhost:7253/api/Note?userid=${initialFormData.userId}`; 
    fetch(url, {
    method: "GET",
 
})
    .then((response) => response.json())
    .then((responsefromServer) => {
      setFormData(responsefromServer);
    });       
    }

    function notedelete(id) {
      const url = `https://localhost:7253/api/Note/${id}`;
  
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((responsefromServer) => {
          console.log(responsefromServer);
          NoteDeleted(id);
        });
    
    }
   
      return (
        <div className="container">
        <div className="row min-vh-100">
          <div className="col d-flex flex-column justify-content align-items-center">
           {showNewNote === false && noteBeingUpdated=== null && (<div>
            <h1>User Note Details</h1>
            
            <button onClick={getUserNote} className="btn btn-dark btn-lg w-100">Get User Notes</button>
            <button onClick={() => setShowNewNote(true)} className="btn btn-secondary btn-lg w-100 mt-4">Add Note</button>
            {/* <button onClick={()=> {}} className="btn btn-secondary btn-lg w-100 mt-3">Go Home</button> */}
            </div>
           )}
          </div>
            {formData && showNewNote===false && noteBeingUpdated === null && UserNotes()}
            {showNewNote && <CreateNote NoteCreation={NoteCreation} />}
            {noteBeingUpdated !== null && (<UpdateNote index={noteBeingUpdated} NoteUpdated={NoteUpdated}/>)} 
            
        </div>
        </div>
      );

    function UserNotes(){
      return (
        <div>
         <div className="table-responsive mt-5">
         <table className="table table-bordered border-dark">
           <thead>
             <tr>
               <th scope="col" className="center">User Id</th>
               <th scope="col">Content</th>
               <th scope="col">Date Created</th>
               <th scope="col">Date Modified</th>
               <th scope="col">views</th>
               <th scope="col">Published</th>            
             </tr>
           </thead>
           <tbody>
           {formData.map((index) => (
                 <tr key={index.id}>
                 <th scope="row">{index.userId}</th>
                 <td>{index.content}</td>
                 <td>{index.dateCreated}</td>
                 <td>{index.dateModified}</td>
                 <td>{index.views}</td>
                 <td>{String(index.published)}</td>
                 <td>
                  <button onClick={() => setNoteBeingUpdated(index)} className="btn btn-dark btn-lg mx-3 my-3">Update Note</button>
                  <button onClick={() => {if (window.confirm(`Are You Sure To Delete?`)) NoteDeleted(index.id);}} className="btn btn-secondary btn-lg">Delete Note</button>
                 </td>
                 </tr>
                 ))}
           </tbody>
         </table>
        
       </div>           
      </div>
          
        )}

        function NoteCreation(createnote){

          setShowNewNote(false);

          if (createnote === null) {
            return;
          }
          alert(`Note Successfully Added!`);
          getUserNote();
        }

        function NoteUpdated(updatednote) {
          setNoteBeingUpdated(null);
          if (updatednote === null) {
            return;
          }
          let copyupdated = [...formData];
          const index = copyupdated.findIndex((copyupdatedcopy, currentIndex) => {
            if (copyupdatedcopy.id === updatednote.id) {
              return true;
            }
          });
          if (index !== -1) {
            copyupdated[index] = updatednote;
          }
          setFormData(copyupdated);
      
          alert("Note Successfully Updated !");
        }

        function NoteDeleted(noteid) {
          let copyupdated = [...formData];
          const index = copyupdated.findIndex((copyupdatedcopy, currentIndex) => {
            if (copyupdatedcopy.id === noteid) {
              return true;
            }
          });
          if (index !== -1) {
            copyupdated.splice(index, 1);
          }
          alert("User Successfully Deleted !");
          setFormData(copyupdated);
        }
    }
    



