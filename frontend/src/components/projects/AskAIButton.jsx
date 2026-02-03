export default function AskAIButton({ context }) {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("ask-ai", { detail: context })
        )
      }
    >
      Ask AI about this
    </button>
  );
}