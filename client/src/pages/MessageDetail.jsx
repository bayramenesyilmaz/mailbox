import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MessageDetail() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("login-user"));

  if (!user) {
    navigate("/");
  }

  const { messageId } = useParams();

  const { id: userId } = JSON.parse(localStorage.getItem("login-user"));

  const [userMessage, setUserMessage] = useState();

  useEffect(() => {
    async function getData() {
      const response = await axios(`/api/${userId}/messages/${messageId}`);

      setUserMessage(response.data);
    }
    getData();
  }, [messageId, userId])
  console.log(userMessage);

  return (
    userMessage &&
      <div className="card w-50">
        <div className="card-header">
          {userMessage.subject}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{userMessage.content}</p>
          </blockquote>
        </div>
      </div>

  )
}

export default MessageDetail
