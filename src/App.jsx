//import socketIO from "socket.io-client";
//const EndPoint = "http://localhost:8080/";
//const socket = socketIO(EndPoint, { transports: ["websocket"] });
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import logo from "./assets/image.png";
import { useRef, useState } from "react";
let user = "";
function App() {
  //socket.on("connect", () => {});

  const name = useRef(null);

  const [userName, setuserName] = useState();

  function fun() {
    if (userName) {
      setuserName(true);
      user = name.current.value;
    } else {
      alert("Enter Your Name!!!");
    }
  }

  return (
    <div className={styles.r}>
      <div className={`card ${styles.p}`}>
        <div className={styles.q}>
          <img src={logo} className={`card-img-top ${styles.q}`} alt="..." />
        </div>

        <div className={`card-body ${styles.t}`}>
          <h1 className="card-title">CHAT APP</h1>

          <div className={styles.a}>
            <input
              type="text"
              placeholder="Enter Your Name"
              className={styles.s}
              ref={name}
              onChange={(e) => setuserName(e.target.value)}
            />
            <button type="button" className="btn btn-success" onClick={fun}>
              <Link
                to={userName ? "/chat" : "/"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Submit
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
export { user };
