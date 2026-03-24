import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab, TABS } from "@/components/alina/types";
import ChatTab from "@/components/alina/ChatTab";
import { TasksTab, WeatherTab, HistoryTab, SettingsTab, AboutTab } from "@/components/alina/TabViews";

export default function Index() {
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[700px] bg-card rounded-2xl border border-border flex flex-col overflow-hidden shadow-2xl shadow-black/50 animate-slide-up">
        <div className="flex-shrink-0 px-5 py-4 border-b border-border flex items-center justify-between bg-card/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">А</span>
            </div>
            <div>
              <div className="text-sm font-semibold leading-none mb-0.5">Алина</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Онлайн</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
              <Icon name="Search" size={15} className="text-muted-foreground" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
              <Icon name="MoreVertical" size={15} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {tab === "chat" && <ChatTab />}
          {tab === "tasks" && <TasksTab />}
          {tab === "weather" && <WeatherTab />}
          {tab === "history" && <HistoryTab />}
          {tab === "settings" && <SettingsTab />}
          {tab === "about" && <AboutTab />}
        </div>

        <div className="flex-shrink-0 border-t border-border px-1 py-1 bg-card">
          <div className="flex">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg transition-all ${
                  tab === t.key
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={t.icon as string} size={17} />
                <span className="text-[10px] font-medium leading-none">{t.label}</span>
                {tab === t.key && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
