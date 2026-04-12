# Promo App

Сервіс для пошуку акцій та знижок на продукти в українських магазинах - АТБ, Сільпо та інших.

## Стек технологій

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Data Base:** SQLite
- **Authorization:** JWT, bcrypt
- **DevOps:** Docker

## Запуск через Docker

Це найпростіший спосіб. Потрібен лише встановлений Docker.

```bash
git clone https://github.com/mokhnatchuk/promo-app.git
cd promo-app
cp backend/.env.example backend/.env
docker compose up --build
```

Сервер запуститься на http://localhost:3111

## Локальний запуск

```bash
cd backend
npm install
npx knex migrate:latest
npx knex seed:run
npm start
```

## Команда

- [Василь](https://github.com/mokhnatchuk) — Backend / DevOps
- [Всеволод](https://github.com/savamix2013) — Frontend / BA
