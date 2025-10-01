import styles from "./page.module.css";

const severityLegend = [
  {
    level: "Critical",
    description: "Active exploitation detected or imminent compromise.",
    tone: "critical",
    icon: "⛔",
  },
  {
    level: "High",
    description: "Severe vulnerabilities or weaponized malware observed.",
    tone: "high",
    icon: "⚠️",
  },
  {
    level: "Medium",
    description: "Actionable risk requiring sustained monitoring.",
    tone: "medium",
    icon: "△",
  },
  {
    level: "Low",
    description: "Minor findings or hygiene improvements recommended.",
    tone: "low",
    icon: "ℹ️",
  },
];

const nextSteps = [
  {
    title: "Normalize host telemetry",
    detail:
      "Derive deterministic risk badges, port summaries, and threat labels to power filters and prompts.",
  },
  {
    title: "Streamline summarization",
    detail:
      "Use server actions with prompt guardrails, retries, and transparent error states for operators.",
  },
  {
    title: "Design accessible oversight",
    detail:
      "Deliver clear hierarchy, keyboard-friendly controls, and severity badges backed by text + icons.",
  },
];

const resourceLinks = [
  {
    href: "https://github.com/shaan101patel/Data-Summarization-Agent/blob/main/SampleData/hosts_dataset.json",
    label: "View sample dataset",
  },
  {
    href: "https://github.com/shaan101patel/Data-Summarization-Agent/blob/main/README.md",
    label: "Read the project guide",
  },
  {
    href: "https://censys.io/", // placeholder for brand alignment
    label: "Visit Censys",
  },
];

export default function Home() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden>
              ◎
            </span>
            <span className={styles.brandText}>Censys Collections Preview</span>
          </div>
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#main">Dashboard</a>
            <a href="#severity">Severity Guide</a>
            <a href="#actions">Plan</a>
          </nav>
        </div>
      </header>

      <main id="main" className={styles.main} role="main">
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div>
            <p className={styles.leadIn}>Track your queries with confidence</p>
            <h1 id="hero-heading">Data Summarization Agent</h1>
            <p className={styles.tagline}>
              Load Censys host data, triage meaningful signals, and generate concise LLM-backed
              insights without exposing keys to the client.
            </p>
            <div className={styles.actionRow}>
              {resourceLinks.map((link) => (
                <a key={link.href} className={styles.primaryAction} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <aside className={styles.legend} aria-labelledby="severity">
            <h2 id="severity">Severity legend</h2>
            <ul>
              {severityLegend.map((item) => (
                <li key={item.level} className={styles[`legendItem-${item.tone}`]}>
                  <span className={styles.legendIcon} aria-hidden>
                    {item.icon}
                  </span>
                  <div>
                    <p className={styles.legendLabel}>{item.level}</p>
                    <p className={styles.legendDescription}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section
          id="actions"
          className={styles.trackSection}
          aria-labelledby="actions-heading"
        >
          <h2 id="actions-heading">Launch checklist</h2>
          <div className={styles.cardGrid}>
            {nextSteps.map((step) => (
              <article key={step.title} className={styles.card}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.accessibility} aria-labelledby="accessibility-heading">
          <h2 id="accessibility-heading">Accessibility at a glance</h2>
          <ul>
            <li>Semantic regions (<code>header</code>, <code>main</code>, <code>section</code>)
              ensure assistive tech reads context accurately.</li>
            <li>Keyboard users get skip links and persistent focus rings for navigation.</li>
            <li>Severity metadata pairs icons with text so meaning never depends on color.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
