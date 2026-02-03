export default function SkillCard({ skill }) {
  return (
    <div className="card">
      <h3>{skill.title}</h3>
      <ul>
        {skill.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}