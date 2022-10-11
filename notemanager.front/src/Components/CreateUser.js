import React,{useState} from 'react' 
import Constant from '../Utilities/Constant'

export default function CreateUser(props) {
    const initialFormData=Object.freeze({
        firstName:'',
        lastName:'',
        email:'',
        age:'',
        webSite:''
    });
        const [formData,setFormData]=useState(initialFormData);
        

        const handleChange=(e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value,
            });
        };
        const handleSubmit=(e)=>{
            e.preventDefault();   
            const UserToCreate={
                id:formData.id,
                firstName:formData.firstName,
                lastName:formData.lastName,
                email:formData.email,
                age:formData.age,
                website:formData.webSite
            };



            const url=Constant.API_URL_CREATE_USER;
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(UserToCreate)
              })
              .then(response=>response.json())
              .then(responsefromServer=>{
               console.log(responsefromServer);
              })
              .catch((error)=>{
                console.log(error);
                alert(error);
              });

              props.UserCreation(UserToCreate);
        };

  return (
    <div>
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create New User</h1>
            <div className='mt-2'>
                <label className='h4 form-label'>First Name</label>
                <input value={formData.firstName} name="firstName" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>Last Name</label>
                <input value={formData.lastName} name="lastName" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>Email</label>
                <input value={formData.email} name="email" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>Age</label>
                <input value={formData.age} name="age" type="number" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>WebSite</label>
                <input value={formData.webSite} name="webSite" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={()=>props.UserCreation(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    </div>
  );
}
