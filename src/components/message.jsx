import styles from "./message.module.css";

function Message({ element, classes }) {
  // console.log("Result", classes);
  return (
    <div className={styles.p}>
      {classes === "centre" ? (
        <div className={` ${styles.q}`}>
          <p>Admin :{element.message}</p>
        </div>
      ) : classes === "left" ? (
        <div className={` ${styles.r}`}>
          <p>You :{element.message}</p>
        </div>
      ) : (
        <div className={`${styles.q}`}>
          <p>
            {element.user}:{element.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Message;
