import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Chat = () => {
  const rooms = [1, 2, 3];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Chat App</h2>
        <ul>
          {rooms.map((room, index) => (
            <li key={index}>
              <Link href={`/chat/${room}`}>
                Room {room}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Chat;
