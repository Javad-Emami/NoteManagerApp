import React,{useState} from 'react' 
import Constant from '../Utilities/Constant'

export default function GetUserById(props) {
   const [formData,setFormData]=useState(null); 

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
        console.log('id is:',e.target.value);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();   
        const idvalue={
            id:formData.id
        };
        let obj = idvalue.id;
       

    const url = `https://localhost:7253/api/User/id?id=${obj}`; 
    fetch(url, {
      method: "GET",
   
  })
      .then((response) => response.json())
      .then((responsefromServer) => {
        setFormData(responsefromServer);
      });

          {formData && ShowUserTable();}

      };

  return (
   <div>
   <div>
       <form className="w-100 px-5">
            
            <h1 className="mt-5">Get User by ID</h1>
            <div>
              <label> Enter User Id:</label>
              <input  name='id' type="number" className="form-control" onChange={handleChange}/>
            </div>
            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => ShowUserTable(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
       </form>
    </div>
    {formData!==null &&  ShowUserTable()}
</div>
    
  );


  function ShowUserTable() {
    
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
          </tr>
        </thead>
        <tbody>
        <tr>
              <th scope="row">{formData.id}</th>
              <td>{formData.firstName}</td>
              <td>{formData.lastName}</td>
              <td>{formData.email}</td>
              <td>{formData.age}</td>
              <td>{formData.webSite}</td>
              </tr>
        </tbody>
      </table>
    </div>
     ) }
       
      
  }


