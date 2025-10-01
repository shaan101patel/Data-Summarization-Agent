import styles from "./page.module.css";

const checklistItems = [
  "Load and validate the Censys host dataset on the server",
  "Normalize risk indicators, services, and threat intel for quick triage",
  "Trigger server-only LLM summaries with clear guardrails",
];

const resourceLinks = [
  {
    href: "https://nextjs.org/docs/app",
    label: "Next.js App Router docs",
  },
  {
    href: "https://zod.dev",
    label: "Zod validation library",
  },
  {
    href: "https://vitest.dev/guide",
    label: "Vitest testing guide",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.badge}>Project kickoff</p>
        <h1>Data Summarization Agent</h1>
        <p className={styles.tagline}>
          A streamlined Next.js foundation for exploring Censys host data and delivering
          concise, risk-aware summaries powered by server actions.
        </p>
        <div className={styles.actions}>
          <a
            className={styles.primaryAction}
            href="https://github.com/shaan101patel/Data-Summarization-Agent/blob/main/SampleData/hosts_dataset.json"
            target="_blank"
            rel="noreferrer"
          >
            View sample dataset
          </a>
          <a
            className={styles.secondaryAction}
            href="https://github.com/shaan101patel/Data-Summarization-Agent/blob/main/README.md"
            target="_blank"
            rel="noreferrer"
          >
            Read the project guide
          </a>
        </div>
      </section>

      <section className={styles.cardGrid} aria-label="Upcoming milestones">
        <article className={styles.card}>
          <h2>What&apos;s next</h2>
          <ul>
            {checklistItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={styles.card}>
          <h2>Key resources</h2>
          <ul>
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
        <article className={styles.card}>
          <h2>Quality guardrails</h2>
          <p>
            Husky runs linting, strict type checks, and tests before every commit.
            Prettier keeps formatting consistent across the codebase.
          </p>
          <p className={styles.subtle}>
            Use `npm run format:write` before submitting a PR.
          </p>
        </article>
      </section>
    </main>
  );
}
