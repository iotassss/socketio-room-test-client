import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import io from 'socket.io-client';
import { useState, useEffect } from "react";

const socket = io("http://localhost:5001");

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    // path名をroom名とする
    const roomName = window.location.pathname;
    socket.emit("join-room", roomName);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Chat Room {id}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter any message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Room;
