import Button from "../Components/Button";
import Header from "../Components/Header";
import styles from "./Testing.module.css";
import { questions } from "../Components/Questions";
import { useState } from "react";
import Timer from "../Components/Timer";
import { useNavigate } from "react-router-dom";

export default function Testing({ personalData }) {
  const [startTest, setStartTest] = useState(false);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleStart() {
    setStartTest(true);
  }

  function handleAnswer() {
    setCounter((counter) => counter + 1);
    result.push(answer);
    console.log(`${counter} из ${questions.length}`);
    if (counter + 1 === questions.length) {
      sendData();
    }
    setAnswer(null);
  }

  async function sendData() {
    setIsLoading(true);
    navigate("/video");
    const finalData = { ...personalData, result: result };

    try {
      const url = "http://localhost:9000/contact-details";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Data sent successfully!", result);
      } else {
        console.log("Error sending data:", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setIsLoading(false);
  }

  return (
    <main className={styles.product}>
      <Header />
      <section>
        {!startTest && (
          <div>
            <h2>Инструкция по психологическому тесту</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis quo debitis optio fugiat assumenda consectetur modi
              libero quibusdam magnam odio mollitia quas repellat eius facilis,
              inventore minus enim quidem iste blanditiis, molestiae dolorem!
              Debitis, perspiciatis omnis, suscipit temporibus a, nam distinctio
              velit totam ab reiciendis officiis minima vitae ea rem?
            </p>
            <Button type="primary" onClick={() => handleStart()}>
              Начать тест
            </Button>
          </div>
        )}

        {startTest && (
          <div className={styles.test}>
            <h2>
              {isLoading
                ? "Отправка данных..."
                : `Вопрос ${counter + 1} из ${questions.length}`}
            </h2>
            <p>{questions[counter]}</p>

            <div className={styles.answer}>
              <input
                className={styles.option}
                type="radio"
                name="option"
                id="yes"
                value={1}
                checked={answer == 1 ? true : false}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <label className={styles.label} htmlFor="yes">
                Да
              </label>
              <br />

              <input
                className={styles.option}
                type="radio"
                name="option"
                id="no"
                value={0}
                checked={answer == 0 ? true : false}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <label className={styles.label} htmlFor="no">
                Нет
              </label>
            </div>
            <Button
              type={counter < questions.length - 1 ? "primary" : "secondary"}
              disabled={answer === null}
              className={styles.button}
              onClick={() => handleAnswer()}
            >
              {counter < questions.length - 1 ? "Дальше" : "Завершить тест"}
            </Button>
            <Timer sendData={sendData} />
          </div>
        )}
      </section>
    </main>
  );
}
