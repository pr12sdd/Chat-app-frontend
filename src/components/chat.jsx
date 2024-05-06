import { CgArrowRightO } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { user } from "../App.jsx";
import socketIO from "socket.io-client";
import styles from "./chat.module.css";
import Message from "./message.jsx";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const EndPoint = "https://chat-app-backend-ma55.onrender.com";
let socket;
function Chat() {
  // socket = socketIO(EndPoint, { transports: ["websocket"] });

  let data = useRef();

  const [details, setDetails] = useState([]);

  const [id, setId] = useState();
  function fun() {
    //console.log("This is the id", id);
    const x = data.current.value;
    socket.emit("message", { info: x, infoid: id });
    data.current.value = "";
  }

  useEffect(() => {
    socket = socketIO(EndPoint, { transports: ["websocket"] });
    setId(socket.id);
    // socket = socketIO(EndPoint, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("Socket Connected");
      setId(socket.id);
    });
    //console.log(socket);
    socket.on("welcome", (data) => {
      setDetails([...details, { message: data.message }]);
      console.log(data.user, data.message);
    });
    socket.on("userjoined", (data) => {
      setDetails([...details, { message: data.message }]);
      console.log(data.user, data.message);
    });
    socket.emit("joined", { user });

    socket.on("leave", (data) => {
      console.log(data.user, data.message);
      setDetails([...details, { message: data.message }]);
    });

    return () => {
      socket.emit("dissconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setDetails([
        ...details,
        { user: data.user, message: data.message, userid: data.id },
      ]);
      //console.log(data);
    });
    return () => {
      socket.off();
    };
  }, [details]);
  return (
    <div className={styles.r}>
      <div className={`card text-center ${styles.q}`}>
        <div className={`card-header ${styles.p}`}>
          <Link to="/" style={{ color: "white" }}>
            <ImCross className={styles.f} size={10} />
          </Link>
          {/* <ImCross className={styles.f} size={30} /> */}
        </div>
        <ReactScrollToBottom className={`card-body ${styles.s}`}>
          {details.map((element) => (
            <div>
              <Message
                key={element.message}
                element={element}
                classes={
                  element.userid === undefined
                    ? "centre"
                    : id === element.userid
                    ? "left"
                    : "right"
                }
              />
            </div>
          ))}
        </ReactScrollToBottom>

        <div className={`card-footer text-body-secondary ${styles.d}`}>
          <input
            type="text"
            placeholder="Type a message"
            className={styles.a}
            ref={data}
            onKeyDown={(e) => (e.code === "Enter" ? fun() : "")}
          />
          <button type="button" className={`${styles.b}`} onClick={fun}>
            <CgArrowRightO size={60} className={styles.c} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
