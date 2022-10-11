import React, { useState } from "react";
import { Switch } from "antd";

export default function CreateUser(props) {
  const initialFormData = Object.freeze({
    userId: "",
    content: "",
    dataCreated: Date().toLocaleString(),
    dataModified: Date().toLocaleString(),
    views: "",
    published: "false",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [toggle, setToggle] = useState(false);

  console.log({ toggle });

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  // const switchhandleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
  //         setToggle(event.target.toggle)
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const NoteToCreate = {
      userId: formData.userId,
      content: formData.content,
      dataCreated: formData.dataCreated,
      dataModified: formData.dataModified,
      views: formData.views,
      published: toggle,
    };

    const url = "https://localhost:7253/api/Note";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NoteToCreate),
    })
      .then((response) => response.json())
      .then((responsefromServer) => {
        console.log(responsefromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.NoteCreation(NoteToCreate);
  };

  return (
    <div>
      <form className="w-100 px-5">
        <h1 className="mt-5">Create New Note</h1>
        <div className="mt-2">
          <label className="h4 form-label">User ID</label>
          <input
            value={formData.userId}
            name="userId"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="h4 form-label">Content</label>
          <input
            value={formData.content}
            name="content"
            type="textarea"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="h4 form-label">Data Created</label>
          <input
            value={formData.dataCreated}
            name="dataCreated"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="h4 form-label">Data Modified</label>
          <input
            value={formData.dataModified}
            name="dataModified"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="h4 form-label">Views</label>
          <input
            value={formData.views}
            name="views"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="h4 form-label">Published</label>
          <Switch onClick={toggler} onChange={toggler} />
          {/* <input value={formData.webSite} name="webSite" type="text" className="form-control" onChange={handleChange}/> */}
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-dark btn-lg w-100 mt-5"
        >
          Submit
        </button>
        <button
          onClick={() => props.UserCreation(null)}
          className="btn btn-secondary btn-lg w-100 mt-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
