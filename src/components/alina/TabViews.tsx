import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  IconName,
  SUBJECTS,
  DEMO_STEPS,
  WEATHER_DATA,
  HISTORY_ITEMS,
} from "./types";

export function TasksTab() {
  const [subject, setSubject] = useState("Математика");
  const [taskText, setTaskText] = useState("2x + 5 = 13");
  const [solved, setSolved] = useState(true);
  const [loading, setLoading] = useState(false);

  const solve = () => {
    setLoading(true);
    setSolved(false);
    setTimeout(() => {
      setLoading(false);
      setSolved(true);
    }, 1400);
  };

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SUBJECTS.map(s => (
          <button
            key={s}
            onClick={() => { setSubject(s); setSolved(false); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
              subject === s
                ? "bg-primary/15 border-primary/50 text-primary"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Условие задачи · {subject}
        </label>
        <textarea
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          rows={3}
          placeholder="Введи условие задачи..."
          className="w-full px-4 py-3 bg-secondary rounded-lg border border-border text-sm outline-none focus:border-primary/50 transition-colors resize-none placeholder:text-muted-foreground"
        />
      </div>

      <div>
        <button
          onClick={solve}
          disabled={loading || !taskText.trim()}
          className="w-full h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Решаю...
            </>
          ) : (
            <>
              <Icon name="Zap" size={15} className="text-primary-foreground" />
              Решить пошагово
            </>
          )}
        </button>
      </div>

      {solved && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Пошаговое решение</span>
          </div>
          {DEMO_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="step-appear flex gap-4 p-4 bg-secondary rounded-lg border border-border"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-primary font-mono font-semibold">{step.step}</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground mb-1 font-medium">{step.title}</div>
                <div className="text-sm text-foreground font-mono">{step.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function WeatherTab() {
  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="bg-secondary rounded-xl border border-border p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon name="MapPin" size={13} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{WEATHER_DATA.city}</span>
            </div>
            <div className="text-6xl font-light tracking-tight">{WEATHER_DATA.temp}°</div>
            <div className="text-sm text-muted-foreground mt-1">{WEATHER_DATA.condition}</div>
          </div>
          <Icon name="Cloud" size={60} className="text-muted-foreground/25" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ощущается", value: `${WEATHER_DATA.feels}°`, icon: "Thermometer" },
            { label: "Влажность", value: `${WEATHER_DATA.humidity}%`, icon: "Droplets" },
            { label: "Ветер", value: `${WEATHER_DATA.wind} м/с`, icon: "Wind" },
          ].map(item => (
            <div key={item.label} className="bg-muted rounded-lg p-3 text-center">
              <Icon name={item.icon as IconName} size={15} className="text-primary mx-auto mb-1.5" />
              <div className="text-sm font-semibold">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Прогноз на 5 дней</div>
        <div className="grid grid-cols-5 gap-2">
          {WEATHER_DATA.forecast.map((day, idx) => (
            <div
              key={day.day}
              className="bg-secondary rounded-lg border border-border p-3 text-center"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
              <Icon name={day.icon as IconName} size={18} className="text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/8 border border-primary/20 rounded-lg p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-start gap-3">
          <Icon name="Info" size={15} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Для получения реального прогноза погоды нужно подключить API. Напиши мне — настрою!
          </p>
        </div>
      </div>
    </div>
  );
}

export function HistoryTab() {
  const [filter, setFilter] = useState<"all" | "chat" | "task">("all");
  const filtered = HISTORY_ITEMS.filter(item => filter === "all" || item.type === filter);

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="flex gap-2">
        {([["all", "Всё"], ["chat", "Диалоги"], ["task", "Задачи"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filter === key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className="animate-fade-in p-4 bg-secondary rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-all group"
            style={{ animationDelay: `${idx * 0.06}s` }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.type === "task" ? "bg-primary/15 border border-primary/20" : "bg-muted border border-border"
              }`}>
                <Icon
                  name={item.type === "task" ? "BookOpen" : "MessageCircle"}
                  size={14}
                  className={item.type === "task" ? "text-primary" : "text-muted-foreground"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-medium truncate">{item.title}</span>
                  {item.subject && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.subject}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{item.preview}</div>
                <div className="text-xs text-muted-foreground/50 mt-1">{item.date}</div>
              </div>
              <Icon name="ChevronRight" size={15} className="text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsTab() {
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState("ru");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-4 space-y-5 overflow-y-auto h-full">
      <section className="space-y-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Голос Алины</div>
        <div className="bg-secondary rounded-xl border border-border p-4 space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Скорость речи</span>
              <span className="text-xs font-mono text-primary">{voiceSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range" min={0.5} max={2} step={0.1}
              value={voiceSpeed}
              onChange={e => setVoiceSpeed(Number(e.target.value))}
              className="w-full accent-primary h-1 rounded-full cursor-pointer"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Тон голоса</span>
              <span className="text-xs font-mono text-primary">{voicePitch.toFixed(1)}</span>
            </div>
            <input
              type="range" min={0.5} max={2} step={0.1}
              value={voicePitch}
              onChange={e => setVoicePitch(Number(e.target.value))}
              className="w-full accent-primary h-1 rounded-full cursor-pointer"
            />
          </div>
          <button className="w-full h-9 bg-primary/10 border border-primary/25 text-primary text-sm rounded-lg hover:bg-primary/20 transition-all flex items-center justify-center gap-2">
            <Icon name="Play" size={14} className="text-primary" />
            Прослушать голос
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Оформление</div>
        <div className="bg-secondary rounded-xl border border-border p-4">
          <div className="grid grid-cols-2 gap-2">
            {(["dark", "light"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                  theme === t
                    ? "bg-primary/15 border-primary/50 text-primary"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "dark" ? "🌙 Тёмная" : "☀️ Светлая"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Язык интерфейса</div>
        <div className="bg-secondary rounded-xl border border-border p-4">
          <div className="grid grid-cols-2 gap-2">
            {[{ v: "ru", l: "🇷🇺 Русский" }, { v: "en", l: "🇬🇧 English" }].map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setLanguage(v)}
                className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                  language === v
                    ? "bg-primary/15 border-primary/50 text-primary"
                    : "bg-muted border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Уведомления</div>
        <div className="bg-secondary rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Звуковые сигналы</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-all relative ${notifications ? "bg-primary" : "bg-muted border border-border"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications ? "left-6" : "left-1"}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutTab() {
  const capabilities = [
    { icon: "MessageCircle", title: "Свободный диалог", desc: "Общается на любые темы — от музыки до философии" },
    { icon: "BookOpen", title: "Все школьные предметы", desc: "Математика, физика, химия, история и ещё 7 предметов" },
    { icon: "ListOrdered", title: "Пошаговые решения", desc: "Разбирает задачи по шагам с полными объяснениями" },
    { icon: "CloudSun", title: "Погода и прогноз", desc: "Текущая погода и прогноз на 5 дней для любого города" },
    { icon: "Mic", title: "Голосовой ввод", desc: "Говори — Алина слышит и понимает тебя" },
    { icon: "History", title: "История диалогов", desc: "Сохраняет все разговоры и решённые задачи" },
  ];

  return (
    <div className="p-4 space-y-5 overflow-y-auto h-full">
      <div className="bg-secondary rounded-xl border border-border p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-primary">А</span>
        </div>
        <h2 className="text-xl font-semibold mb-1">Алина</h2>
        <p className="text-sm text-muted-foreground mb-4">Персональный умный помощник для школьников</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/25 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">Онлайн и готова помочь</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Возможности</div>
        {capabilities.map((cap, idx) => (
          <div
            key={cap.icon}
            className="animate-fade-in flex gap-4 p-4 bg-secondary rounded-lg border border-border"
            style={{ animationDelay: `${idx * 0.07}s` }}
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon name={cap.icon as IconName} size={17} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium mb-0.5">{cap.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-2 animate-fade-in">
        <span className="text-xs text-muted-foreground/40 font-mono">Алина v1.0 · 2026</span>
      </div>
    </div>
  );
}
