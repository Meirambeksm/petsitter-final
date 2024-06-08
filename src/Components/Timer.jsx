import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer({ sendData }) {
  const [remainingTime, setRemainingTime] = useState(600);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerId);
          sendData();
          navigate("/video");
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <p>
        Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
}
