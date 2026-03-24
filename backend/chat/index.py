"""
Бэкенд Алины — отправляет сообщения в OpenAI и возвращает ответ.
Алина — умный помощник для школьников: отвечает на вопросы, решает задачи, помогает с экзаменами.
"""
import json
import os
from openai import OpenAI

SYSTEM_PROMPT = """Ты Алина — умный и дружелюбный помощник для школьников и студентов.

Твои задачи:
- Отвечать на любые учебные вопросы по математике, физике, химии, биологии, истории, литературе, английскому, информатике, географии, обществознанию
- Решать задачи пошагово с подробными объяснениями каждого шага
- Помогать готовиться к экзаменам: ЕГЭ, ОГЭ, ВПР, олимпиадам
- Объяснять сложные темы простым языком
- Проверять решения и указывать на ошибки

Стиль общения:
- Говори по-русски, дружелюбно и ясно
- Для задач всегда давай пошаговое решение с объяснениями
- Используй эмодзи умеренно для живости
- Будь краткой, но информативной
- Если вопрос не по учёбе — отвечай коротко и возвращай к учебным темам"""


def handler(event: dict, context) -> dict:
    """Обрабатывает сообщение пользователя и возвращает ответ Алины через OpenAI."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    messages = body.get("messages", [])
    user_message = body.get("message", "")

    if not user_message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Пустое сообщение"}, ensure_ascii=False),
        }

    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    chat_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in messages[-10:]:
        role = "assistant" if msg.get("role") == "alina" else "user"
        chat_messages.append({"role": role, "content": msg.get("text", "")})
    chat_messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=chat_messages,
        max_tokens=1000,
        temperature=0.7,
    )

    reply = response.choices[0].message.content

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"reply": reply}, ensure_ascii=False),
    }
