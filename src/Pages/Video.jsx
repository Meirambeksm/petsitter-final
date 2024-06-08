import Button from "../Components/Button";
import Header from "../Components/Header";
import styles from "./Testing.module.css";

export default function Video() {
  return (
    <main className={styles.product}>
      <Header />
      <section>
        <div>
          <h2>Посмотрите видео перед игрой!</h2>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/A7lu3KS9GAk"
            height="500px"
            width="750px"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder={0}
            allowFullScreen
          ></iframe>

          <Button type="primary">СТАРТ ИГРЫ</Button>
        </div>
      </section>
    </main>
  );
}
