import SlateEditor from "./_components/SlateEditor";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <SlateEditor />
    </div>
  );
}
