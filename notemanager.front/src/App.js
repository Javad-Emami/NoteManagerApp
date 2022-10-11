import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Constant from "./Utilities/Constant";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import GetUserById from "./Components/GetUserById";
import NoteDetails from "./Components/NoteDetails";


function App() {
  const [User, setUser] = useState([]);
  const [showNewUser, setShowNewUser] = useState(false);
  const [userBeingUpdated, setUserBeingUpdated] = useState(null);
  const [userbyID, setUserbyID] = useState(false);
  const [showNotes, setShowNotes]=useState(null);
 

  function getUsers() {
    const url = Constant.API_URL_GET_ALL_USERS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsfromServer) => {
        setUser(postsfromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  
  function usrdelete(id) {
    let obj=id;
    console.log(obj);
    const url = `https://localhost:7253/api/User/id?id=${obj}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((responsefromServer) => {
        console.log(responsefromServer);
        UserDeleted(id);
      });
  
  }
  return (
      <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content align-items-center">
         
          {showNewUser === false &&  userBeingUpdated=== null && userbyID ===false  && showNotes===null && (<div>
                <h1>Note Manager Application</h1>
                <div className="mt-5">
                  <button onClick={getUsers} className="btn btn-dark btn-lg w-100">Get Users</button>
                  <button onClick={() => setShowNewUser(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create a User</button>
                  <button onClick={()=>setUserbyID(true)} className="btn btn-secondary btn-lg w-100 mt-4">Show User By ID</button>
             
                </div>
              </div>
            )}
         

 
          {User.length > 0 && showNewUser === false && userBeingUpdated === null && showNotes===null &&  renderpostsTable() }
          {userbyID && <GetUserById/>}
          {showNewUser && <CreateUser UserCreation={UserCreation} />}
          {userBeingUpdated !== null && (<UpdateUser post={userBeingUpdated} UserUpdated={UserUpdated}/>)}   
          {showNotes !==null && (<NoteDetails post={showNotes} />)}    
          
     
          </div>
          
      </div>
      
    </div>
   

  );

  function direction(){
    return(
      <div className="direction">
          <Router>
            <Routes>
              <Route path="/" element={<NoteDetails/>}/>
            </Routes>

          </Router>
      </div>
    )
  }

  function renderpostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col" className="center">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">WebSite</th>
              <th scope="col">Details</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {User.map((post, index) => (
              <tr key={index}>
                <th scope="row">{post.id}</th>
                <td>{post.firstName}</td>
                <td>{post.lastName}</td>
                <td>{post.email}</td>
                <td>{post.age}</td>
                <td>{post.webSite}</td>
                <td>
                  <button onClick={() => setShowNotes(post)} className="btn btn-dark btn-lg mx-3 my-3">
                    Note Details
                  </button>
                    
                </td>
                <td>
                  <button onClick={() => setUserBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => {if (window.confirm(`Are You Sure To Delete?`)) usrdelete(post.id)}} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setUser([])} className="btn btn-dark btn-lgw-100">Clear The List</button>
      </div>
    );
  }


  function UserCreation(createduser) {
    setShowNewUser(false);

    if (createduser === null) {
      return;
    }
    alert(`User Successfully Added!`);
    getUsers();
  }

  function UserUpdated(updateduser) {
    setUserBeingUpdated(null);
    if (updateduser === null) {
      return;
    }
    let copyupdated = [...User];
    const index = copyupdated.findIndex((copyupdatedcopy, currentIndex) => {
      if (copyupdatedcopy.id === updateduser.id) {
        return true;
      }
    });
    if (index !== -1) {
      copyupdated[index] = updateduser;
    }
    setUser(copyupdated);

    alert("User Successfully Updated !");
  }

  function UserDeleted(usrid) {
    let copyupdated = [...User];
    const index = copyupdated.findIndex((copyupdatedcopy, currentIndex) => {
      if (copyupdatedcopy.Id === usrid) {
        return true;
      }
    });
    if (index !== -1) {
      copyupdated.splice(index, 1);
    }
    setUser(copyupdated);
    alert("User Successfully Deleted !");
   
  }
  }
  
export default App;
