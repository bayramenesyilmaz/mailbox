import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Anasayfa() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState([{}]);

  useEffect(() => {
    async function getData() {
      const response = await axios("/api");

      setData(response.data);
    }
    getData();

  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    data.users.map(user => {
      if (user.email === email && user.password === password) {
        localStorage.setItem("login-user",JSON.stringify({id:user.id, email:user.email}))
        navigate(`/about/${user.id}`);
      }else{
        console.log("hata");
      }
    })

    setEmail("");
    setPassword("");
  }


  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="bg-light p-2 border border-primary p-4 mb-2 rounded-1 w-lg-50 ">

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name='username' value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label name='password' htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>

    </div>
  )
}

export default Anasayfa