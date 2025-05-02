# GraphQL Subscription API

API de notificaciones en tiempo real usando GraphQL Subscriptions con NestJS y Redis.

## Requisitos

- Node.js v20 o superior
- Docker y Docker Compose
- Redis

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Iniciar los servicios con Docker:
```bash
docker-compose up --build
```

## Uso

Accede al GraphQL Playground en: http://localhost:3000/graphql

### Suscribirse a notificaciones

Primero, necesitas suscribir a un usuario para que pueda recibir notificaciones:

```graphql
mutation {
  subscribeToNotifications(userId: "user1")
}
```

### Escuchar notificaciones

Abre una nueva pestaña en el GraphQL Playground y ejecuta la siguiente suscripción:

```graphql
subscription {
  notificationSent(userId: "user1") {
    id
    message
    timestamp
    userId
  }
}
```

### Enviar una notificación

En otra pestaña del GraphQL Playground, ejecuta la siguiente mutación:

```graphql
mutation {
  sendNotification(message: "Hola mundo", userId: "user1") {
    id
    message
    timestamp
    userId
  }
}
```

### Desuscribirse de notificaciones

Para dejar de recibir notificaciones:

```graphql
mutation {
  unsubscribeFromNotifications(userId: "user1")
}
```

## Estructura del Proyecto

```
src/
├── app.module.ts
├── main.ts
├── notification/
│   ├── notification.module.ts
│   ├── notification.resolver.ts
│   ├── notification.service.ts
│   └── notification.type.ts
└── redis/
    ├── redis.module.ts
    └── redis.service.ts
```

## Tecnologías Utilizadas

- NestJS
- GraphQL
- Redis
- Docker
- TypeScript 