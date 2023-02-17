import React, { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [nodeUrl, setNodeUrl] = useState("");
  // const [peerUrl, setPeerUrl] = useState("");
  const [subscription, setSubscription] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:6117/api/send?nodeUrl=${nodeUrl}&subscription=${subscription}&message=${message}`;
    const response = await axios.get(url);
    setResponse(response.data);
  };

  const handleApiCall = async (event) => {
    event.preventDefault();
    const apiUrl = `http://127.0.0.1:6117/api/see`;
    const response = await axios.get(apiUrl);
    setApiResponse(response.data);
  };

  return (
    <div className="login-page">
      <h1>Send Message</h1>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="nodeUrl"
              type="text"
              placeholder="Node to connect to"
              value={nodeUrl}
              className="login-input"
              onChange={(e) => setNodeUrl(e.target.value)}
            />
          </div>
          <div>
            <input
              id="subscription"
              type="text"
              value={subscription}
              placeholder='Subscribe to'
              className="login-input"
              onChange={(e) => setSubscription(e.target.value)}
            />
          </div>
          <div>
            <input
              id="message"
              type="text"
              placeholder="Message to send"
              className="login-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <h1>Sent Message</h1>
      {response && (
        <div className="btn-container">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      <h1>API Response</h1>
      <div className="api-container-btn">
        <button onClick={handleApiCall}>Call API</button>
        </div>
        <div className="">
        {apiResponse && (
          <div>
            <div className="api-container">
              <p>{JSON.stringify((apiResponse)["message1"]).replace(/"([^"]+(?="))"/g, '$1')}</p>
              <p>{JSON.stringify((apiResponse)["message2"]).replace(/['"\\]/g, '')}</p>
            {/* <p>{JSON.stringify(apiResponse, null, 2)}</p> */}
            </div>
          </div>
        )}
        </div>
      
    </div>
  );
}

export default App;
