import SkillCard from "./SkillCard";
import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="grid">
        {skills.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </div>
    </section>
  );
}