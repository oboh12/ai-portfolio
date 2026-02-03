import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="ai-assistant">
      <button onClick={() => setOpen(!open)}>
        Ask My AI Assistant
      </button>
      {open && <ChatWindow />}
    </div>
  );
}