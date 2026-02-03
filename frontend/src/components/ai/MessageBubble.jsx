export default function MessageBubble({ role, text, className = "" }) {
  return (
    <div className={`message ${role} ${className}`}>
      <p>{text}</p>
    </div>
  );
}