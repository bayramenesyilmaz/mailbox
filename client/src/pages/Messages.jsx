import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";


function Messages() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("login-user"));

  if (!user) {
    navigate("/");
  }

  const { id } = useParams();

  const [userMessages, setUserMessages] = useState();

  useEffect(() => {
    async function getData() {
      const response = await axios(`/api/${id}/messages`);

      setUserMessages(response.data);
    }
    getData();
  }, [id])

  return (

    userMessages ? userMessages.map(message => {

      return <div key={message.id} className={`messages-box ${message.isRead ? "opacity-75" : ""}`} >

        <div className={`message-box-left`}>
        
          {
            message.isRead ?
              <i className="fa-regular fa-envelope-open" />
              :
              <i className="fa-regular fa-envelope" />
          }

        </div>
        <Link className="router-link" to={`/detail/${message.id}`}>
          <div className="message-box-right" >
            <h4>{message.subject}</h4>
            <p className="text-truncate">{message.content}</p>
          </div>
        </Link>

      </div>
    })
      :
      <div>
        <p>Mesaj yok</p>
      </div>

  )
}

export default Messages;
