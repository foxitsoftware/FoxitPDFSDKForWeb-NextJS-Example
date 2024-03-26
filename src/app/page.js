import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ul>
        <li>
          <a href="/examples/demo-guide">Demo Guide</a>
        </li>
        <li>
          <a href="/examples/dev-guide">Developer Guide</a>
        </li>
      </ul>
    </main>
  );
}
