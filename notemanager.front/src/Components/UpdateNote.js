import React,{useState} from 'react' 
import Constant from '../Utilities/Constant'
import { Switch } from 'antd';

export default function UpdateNote(props) {
    const initialFormData=Object.freeze({
        content:props.index.content,
        dataCreated:props.index.dataCreated,
        dataModified:Date().toLocaleString(),
        views:props.index.views,
        published:''
    });
        const [formData,setFormData]=useState(initialFormData);
        const[toggle,setToggle]=useState(false);
        

        const toggler = () => {
            toggle ? setToggle(false):setToggle(true);
        }
        

        const handleChange=(e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value,
            });
        };
        const handleSubmit=(e)=>{
            e.preventDefault();   
            const NoteToUpdate={
                id:props.index.id,
                content:formData.content,
                dataModified:Date().toLocaleString(),
                views:formData.views,
                published:toggle
            };



            const url='https://localhost:7253/api/Note/noteId'
            fetch(url,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(NoteToUpdate)
              })
              .then(response=>response.json())
              .then(responsefromServer=>{
               console.log(responsefromServer);
              })
            //   .catch((error)=>{
            //     console.log(error);
            //     alert(error);
            //   });
            

              props.NoteUpdated(NoteToUpdate);
        };

  return (
    <div>
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Update Note</h1>
            <div className='mt-2'>
                <label className='h4 form-label'>Content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange}/>
            </div>
            {/* <div className='mt-5'>
                <label className='h3 form-label'>Data Created</label>
                <input value={formData.dataCreated} name="datacreated" type="text" className="form-control" onChange={handleChange}/>
            </div> */}
            <div className='mt-2'>
                <label className='h4 form-label'>Data Modified</label>
                <input value={formData.dataModified} name="dataModified" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>Views</label>
                <input value={formData.views} name="views" type="number" className="form-control" onChange={handleChange}/>
            </div>
            <div className='mt-2'>
                <label className='h4 form-label'>Published</label>
                 <Switch onClick={toggler} value={toggle} name="published" onChange={toggler} />
                {/* <input value={formData.published} name="webSite" type="text" className="form-control" onChange={handleChange}/> */}
            </div>
            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={()=>props.NoteUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    </div>
  );
}
