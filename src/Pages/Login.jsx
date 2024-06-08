import styles from "./Login.module.css";
import Button from "../Components/Button";
import { InputMask } from "primereact/inputmask";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useEffect, useState } from "react";

export default function Login({ handleDataChange }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phone, setPhone] = useState("");
  const [pet, setPet] = useState("Dog");
  const emailExists = details.some((detail) => detail.email === email);

  useEffect(function () {
    async function fetchContacts() {
      try {
        const res = await fetch("http://localhost:9000/contact-details");
        const data = await res.json();
        setDetails(data);
      } catch {
        alert("There was an error loading data...");
      }
    }
    fetchContacts();
  }, []);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (emailExists) return;

    const personalData = {
      email: email,
      fullName: `${firstName} ${secondName}`,
      phone: phone,
      pet: pet,
    };

    handleDataChange(personalData);
    navigate("/testing");
  };

  return (
    <main className={styles.login}>
      <Header />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="example@mail.com"
            name="email"
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailExists && (
            <span className={styles.message}>
              Ошибка: такой email уже существует!
            </span>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="firstName">Имя</label>
          <input
            placeholder="Иван"
            name="firstName"
            type="text"
            pattern="[A-Za-zА-Яа-я]+"
            id="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="name">Фамилия</label>
          <input
            placeholder="Иванов"
            name="lastName"
            type="text"
            pattern="[A-Za-zА-Яа-я]+"
            id="lastName"
            required
            onChange={(e) => setSecondName(e.target.value)}
            value={secondName}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="phone">Телефон</label>
          <InputMask
            id="phone"
            name="phone"
            type="tel"
            required={false}
            mask="+7 (999)-999 99 99"
            placeholder="+7 777-700 77 77"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></InputMask>
        </div>

        <div className={styles.row}>
          <label htmlFor="pet">Питомец</label>
          <select
            name="pet"
            id="pet"
            value={pet} // problem
            onChange={(e) => setPet(e.target.value)}
          >
            <option value="dog">Собака</option>
            <option value="cat">Кот</option>
          </select>
        </div>

        <div>
          <Button type="primary">Начать тест</Button>
        </div>
      </form>
    </main>
  );
}
