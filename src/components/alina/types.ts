export type IconName = string;
export type Tab = "chat" | "tasks" | "weather" | "history" | "settings" | "about";

export interface Message {
  id: number;
  role: "user" | "alina";
  text: string;
  time: string;
}

export interface TaskStep {
  step: number;
  title: string;
  content: string;
}

export const SUBJECTS = [
  "Математика", "Физика", "Химия", "Биология",
  "История", "Литература", "Английский", "Информатика",
  "География", "Обществознание"
];

export const DEMO_MESSAGES: Message[] = [
  { id: 1, role: "alina", text: "Привет! Я Алина, твой умный помощник. Задай вопрос, попроси решить задачу или просто поговори со мной.", time: "09:00" },
  { id: 2, role: "user", text: "Привет, Алина! Помоги решить уравнение 2x + 5 = 13", time: "09:01" },
  { id: 3, role: "alina", text: "Конечно! Перейди на вкладку «Задачи» — там я разберу его пошагово со всеми объяснениями.", time: "09:01" },
];

export const DEMO_STEPS: TaskStep[] = [
  { step: 1, title: "Запись уравнения", content: "2x + 5 = 13" },
  { step: 2, title: "Переносим числа в правую часть", content: "2x = 13 − 5" },
  { step: 3, title: "Вычисляем правую часть", content: "2x = 8" },
  { step: 4, title: "Находим x", content: "x = 8 ÷ 2 = 4" },
  { step: 5, title: "Ответ и проверка", content: "x = 4 ✓   Проверка: 2·4 + 5 = 8 + 5 = 13 ✓" },
];

export const WEATHER_DATA = {
  city: "Москва",
  temp: 7,
  feels: 4,
  condition: "Облачно",
  humidity: 72,
  wind: 5,
  forecast: [
    { day: "Пт", icon: "Cloud", temp: 7 },
    { day: "Сб", icon: "Sun", temp: 12 },
    { day: "Вс", icon: "CloudRain", temp: 9 },
    { day: "Пн", icon: "CloudSun", temp: 11 },
    { day: "Вт", icon: "Sun", temp: 14 },
  ]
};

export const HISTORY_ITEMS = [
  { id: 1, type: "chat", title: "Разговор об учёбе", preview: "Обсуждали как готовиться к ЕГЭ", date: "Сегодня, 09:00", subject: null },
  { id: 2, type: "task", title: "Уравнение 2x + 5 = 13", preview: "Математика — решено пошагово", date: "Сегодня, 09:01", subject: "Математика" },
  { id: 3, type: "task", title: "Закон Ома для участка цепи", preview: "Физика — объяснение формулы", date: "Вчера, 18:30", subject: "Физика" },
  { id: 4, type: "chat", title: "Беседа о планетах", preview: "Говорили о Солнечной системе", date: "Вчера, 15:00", subject: null },
  { id: 5, type: "task", title: "Состав воды H₂O", preview: "Химия — строение молекулы", date: "22 марта", subject: "Химия" },
];

export const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "chat", label: "Чат", icon: "MessageCircle" },
  { key: "tasks", label: "Задачи", icon: "BookOpen" },
  { key: "weather", label: "Погода", icon: "CloudSun" },
  { key: "history", label: "История", icon: "History" },
  { key: "settings", label: "Настройки", icon: "Settings" },
  { key: "about", label: "Алина", icon: "Info" },
];
