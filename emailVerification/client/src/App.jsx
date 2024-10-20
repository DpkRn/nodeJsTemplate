import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMes, setErrorMes] = useState(false);
  const [text, setText] = useState('');
  const [msgInfo, setMsgInfo] = useState({
    from: "d.wizard.techno@gmail.com",
    to: "",
    subject: "",
    html: "", 
  });

  useEffect(() => {
    setMsgInfo((prev) => ({
      ...prev,
      html: `
        <h1 style="color: blue;">Hello!</h1>
        <p style="color: green;">${text}</p>
        <p style="color: red;">Have a great day!</p>
      `,
    }));
  }, [text]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/sendmessage', msgInfo);
      console.log(response);
      if (response.status === 200) {
        if (response.data.success) {
          setIsSent(true);
          setErrorMes(false);
        } else {
          setErrorMes(true);
        }
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setErrorMes(true);
    } finally {
      setLoading(false);
    }
  };

  const setTo = (e) => {
    setMsgInfo({ ...msgInfo, to: e.target.value });
  };

  const setSubject = (e) => {
    setMsgInfo({ ...msgInfo, subject: e.target.value });
  };

  const setTextMsg = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="log-form">
      <h2>Send Message to Email</h2>
      <form onSubmit={sendMessage}>
        <input 
          type="email" 
          title="username" 
          placeholder="to: email" 
          value={msgInfo.to} 
          onChange={setTo} 
          required 
        />
        <input 
          type="text" 
          title="subject" 
          placeholder="subject"  
          value={msgInfo.subject} 
          onChange={setSubject} 
          required 
        />
        <textarea 
          className='txtArea'  
          placeholder="message"  
          value={text} 
          onChange={setTextMsg} 
          required 
        />
        <hr />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {isSent && <p className="send">Message sent!</p>}
        {errorMes && <p className="send" style={{ color: "red" }}>Something went wrong!</p>}
      </form>
    </div>
  );
}

export default App;
