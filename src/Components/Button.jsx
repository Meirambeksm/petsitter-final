import styles from "./Button.module.css";

export default function Button({ children, onClick, type, disabled }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
