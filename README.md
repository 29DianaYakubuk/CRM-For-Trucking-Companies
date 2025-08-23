# FleetOps Mini — MERN CRM для грузоперевозок

Учебный проект на стеке **MERN** для портфолио.  
Сценарий: система учёта заявок (грузов) и рейсов в траковом бизнесе.  
Можно добавлять грузы, редактировать их статус (в пути, завершено), смотреть детали и управлять своими заявками.

---

## 🚀 Стек
- **Backend:** Node.js, Express, Mongoose (MongoDB), JWT (аутентификация через httpOnly cookie), bcryptjs
- **Frontend:** React, TypeScript, Redux Toolkit, React Router, TailwindCSS
- **Dev Tools:** Cursor, VS Code, ts-node-dev, Docker (MongoDB)

---

## 📦 Основные возможности
- Регистрация и вход (cookie-based JWT)
- Добавление заявок на грузоперевозку (название груза, описание, статус)
- Просмотр списка грузов и детализация по каждому
- Редактирование и удаление заявок
- Статусы: `ожидает`, `в пути`, `доставлено`
- Приватные страницы (видны только авторизованным пользователям)
- Автоматические demo-данные (3 заявки создаются новому пользователю)

---

## 📂 Структура проекта
mern-mini/
backend/ # Express + Mongoose API (заявки, аутентификация)
frontend/ # React + Redux Toolkit клиент (UI для диспетчера/водителя)
README.md

---

## 🔧 Установка и запуск

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
2) Frontend
cd ../frontend
npm install
npm run dev
Открой http://localhost:5173 в браузере.
⚙️ Переменные окружения (backend)
Файл .env:
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/fleetops
JWT_SECRET=super_secret_change_me
COOKIE_NAME=token
CLIENT_URL=http://localhost:5173
📌 Roadmap
 CRUD для заявок
 Аутентификация (JWT cookie)
 Tailwind UI
 Пагинация и поиск по заявкам
 Роли пользователей (диспетчер/водитель)
 Тесты (Jest, RTL, Playwright)
 Деплой: Render (API) + Vercel (Frontend)
🎯 Цель проекта
Показать навыки разработки реальных B2B-систем:
архитектура MERN
аутентификация и приватные страницы
работа с формами, состоянием и API
аккуратный UI и бизнес-логика (логистика, статусы рейсов)
