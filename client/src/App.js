import React,{ useState, useEffect } from 'react';
import Axios from 'axios';
import "./App.css";

function App() {
  const [formInputs, setFormInputs] = useState({
    title: "",
    body: "",
  });
  const [blogPosts, setBlogPosts] = useState([]);
  var count = 0;
  

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInputs(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function submit(event) {
    event.preventDefault();

    const payload = {
      title: formInputs.title,
      body: formInputs.body
    }

    Axios({
      url: "/api/save",
      method: "post",
      data: payload
    })
      .then(() => {
        console.log("Data has been sent to the server.");
        setFormInputs({
          title: "",
          body: "",
        });
        count++;
        getBlogPosts();
      })
      .catch(() => {
        console.log("Internal server error");
      });
    
    
  }

  

  useEffect(() => {
    getBlogPosts();
  },[count]);

  function getBlogPosts() {
    Axios.get("/api")
      .then((response) => {
        const data = response.data;
        setBlogPosts(data);
        console.log("Successfully fetched data");
      })
      .catch(() => {
        alert("Error");
      });
  }

  function deletePost(id) {

    Axios({
      url: "/api/delete",
      method: "post",
      data: {Id: id}
    })
      .then(() => {
        getBlogPosts();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  }
  

  return (
    <div className="app">
      <h1>Welcome to my App</h1>
      <form onSubmit={submit}>
        <div className="form-input">
          <input type="text" name="title" value={formInputs.title} placeholder="Title" onChange={handleChange}/>
        </div>
        <div className="form-input">
          <textarea name="body" cols="30" style={{ fontSize: '1.2rem' }} rows="10" value={formInputs.body} placeholder="Body" onChange={handleChange} />
        </div>
        <button>Submit</button>
      </form>
      <div className="blog-posts">
        {blogPosts.map((post,index) => {
          return (
            <div key={index} className="blog">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={()=>{deletePost(post._id)}}>Delete</button>
            </div>
          );
        }) }
      </div>
    </div>
  );
}

export default App;
