import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Message, DEMO_MESSAGES } from "./types";

function WaveIndicator() {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[14, 20, 16, 24, 18, 22, 14].map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-primary rounded-full"
          style={{
            height: `${h}px`,
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const userMsg: Message = { id: Date.now(), role: "user", text: input, time };
    const alinaMsg: Message = {
      id: Date.now() + 1, role: "alina",
      text: "Привет! Чат с Алиной скоро будет доступен. Пока загляни в другие разделы — там много полезного для подготовки к урокам.",
      time
    };
    setMessages(prev => [...prev, userMsg, alinaMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "alina" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs text-primary font-bold">А</span>
                </div>
              )}
              <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-foreground rounded-tl-sm border border-border"
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setListening(!listening)}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              listening
                ? "bg-primary"
                : "bg-secondary hover:bg-muted border border-border"
            }`}
            style={listening ? { animation: "pulseRing 2s ease-in-out infinite" } : {}}
          >
            <Icon
              name={listening ? "MicOff" : "Mic"}
              size={16}
              className={listening ? "text-primary-foreground" : "text-muted-foreground"}
            />
          </button>

          {listening ? (
            <div className="flex-1 flex items-center gap-3 h-10 px-4 bg-secondary rounded-lg border border-primary/30">
              <WaveIndicator />
              <span className="text-sm text-muted-foreground">Слушаю...</span>
            </div>
          ) : (
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Напиши или нажми на микрофон..."
              className="flex-1 h-10 px-4 bg-secondary rounded-lg border border-border text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
            />
          )}

          <button
            onClick={sendMessage}
            disabled={!input.trim() || listening}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icon name="Send" size={15} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}