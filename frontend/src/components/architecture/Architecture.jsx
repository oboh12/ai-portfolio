export default function Architecture() {
  return (
    <section id="architecture">
      <h2>Architecture</h2>
      <p>
        React frontend communicates with a Node.js backend that integrates
        Google Gemini AI and is deployed on Google Cloud Run.
      </p>
      <pre className="architecture-diagram">
React → Node.js API → Gemini API → Cloud Run
      </pre>
    </section>
  );
}