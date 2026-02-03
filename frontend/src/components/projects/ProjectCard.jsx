import AskAIButton from "./AskAIButton";

export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <h3>{project.title}</h3>
      <p><strong>Problem:</strong> {project.problem}</p>
      <p><strong>Solution:</strong> {project.solution}</p>

      <div className="stack">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <AskAIButton context={project.title} />
    </div>
  );
}