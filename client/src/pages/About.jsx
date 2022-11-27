import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function About() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("login-user"));

  if (!user) {
    navigate("/");
  }

  const { id } = useParams();

  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getData() {
      const response = await axios(`/api/${id}`);

      setUserData(response.data);
    }
    getData();
  }, [id])

  let total, unread;

  if (userData) {

    total = userData.message.length;
    unread = userData.message.filter((mes) => mes.isRead === false).length;
  }


  return (
    userData &&
    <div>

      <div className="card mt-2 p-5">
        <div className="card-header text-center">
          Merhaba {userData.name}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0 text-center">
            <p className="text-center">Toplam {total} üzerinden {unread} okunmamış mesajınız var.</p>
            <button className="btn btn-primary"><Link className="router-link text-light" to={`/messages/${id}`}>Mesajları göster</Link></button>
          </blockquote>
        </div>
      </div>

    </div>
  )
}

export default About
