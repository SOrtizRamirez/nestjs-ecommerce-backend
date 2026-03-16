# NestJS E-Commerce Backend

Backend completo de e-commerce construido con **NestJS, PostgreSQL y TypeORM**, siguiendo una arquitectura modular y buenas prácticas de desarrollo backend.

Este proyecto implementa la lógica principal de un sistema de comercio electrónico: autenticación, gestión de productos, carrito de compras, órdenes, pagos, envíos, reseñas y cupones.

Está diseñado como **API REST escalable**, preparada para integrarse con aplicaciones frontend (React, Angular, Next.js, etc.).

---

# Arquitectura

El proyecto utiliza una **arquitectura modular basada en dominios**, donde cada módulo representa una funcionalidad del sistema.

```
src
│
├ auth
├ users
├ addresses
├ categories
├ products
├ cart
├ orders
├ payments
├ shipments
├ reviews
├ coupons
├ seed
│
├ common
│   ├ decorators
│   ├ guards
│   ├ filters
│   ├ interceptors
│   └ entities
│
├ config
│
├ app.module.ts
└ main.ts
```

---

# Tecnologías utilizadas

| Tecnología        | Uso                     |
| ----------------- | ----------------------- |
| NestJS            | Framework backend       |
| PostgreSQL        | Base de datos           |
| TypeORM           | ORM                     |
| JWT               | Autenticación           |
| bcrypt            | Hash de contraseñas     |
| class-validator   | Validación de DTOs      |
| class-transformer | Transformación de datos |

---

# Base de datos

La base de datos está modelada para cubrir el flujo completo de un e-commerce.

Principales entidades:

```
User
Address
Category
Product
ProductImage
Cart
CartItem
Order
OrderItem
Payment
Shipment
Review
Coupon
```

Relaciones clave:

```
User → Addresses
User → Orders
Product → Category
Product → Reviews
Cart → CartItems
Order → OrderItems
Order → Payment
Order → Shipment
```

---

# Autenticación

El sistema utiliza **JWT Authentication**.

Endpoints principales:

```
POST /auth/register
POST /auth/login
```

Características:

* contraseñas encriptadas con bcrypt
* tokens JWT
* control de roles
* protección de rutas

Roles soportados:

```
admin
customer
```

---

# Users

Permite gestionar usuarios registrados.

Endpoints:

```
GET /users
GET /users/profile
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

Funciones:

* obtener perfil
* actualizar perfil
* listar usuarios (admin)
* eliminar usuarios (admin)

---

# Addresses

Los usuarios pueden tener múltiples direcciones.

Endpoints:

```
POST /addresses
GET /addresses
PATCH /addresses/:id
DELETE /addresses/:id
```

Uso principal:

* seleccionar dirección en checkout

---

# Categories

Permite organizar los productos por categorías.

Endpoints:

```
POST /categories
GET /categories
GET /categories/:id
PATCH /categories/:id
DELETE /categories/:id
```

Soporta **categorías jerárquicas**.

---

# Products

Módulo central del catálogo.

Endpoints:

```
POST /products
GET /products
GET /products/:id
PATCH /products/:id
DELETE /products/:id
```

Características:

* relación con categorías
* múltiples imágenes por producto
* paginación
* filtros por categoría

Ejemplo de consulta:

```
GET /products?page=1&limit=10
```

---

# Cart

Cada usuario tiene un carrito de compras.

Endpoints:

```
GET /cart
POST /cart
PATCH /cart/:itemId
DELETE /cart/:itemId
DELETE /cart
```

Funciones:

* agregar producto
* modificar cantidad
* eliminar producto
* vaciar carrito

---

# Orders

Convierte el carrito en una orden.

Endpoints:

```
POST /orders
GET /orders
GET /orders/:id
```

Proceso:

```
cart → order → order_items
```

Al crear una orden:

* se calculan totales
* se crean order_items
* se vacía el carrito

---

# Payments

Registra pagos asociados a órdenes.

Endpoints:

```
POST /payments
GET /payments
GET /payments/:id
```

Campos principales:

```
provider
transaction_id
amount
status
```

Preparado para integrar con:

```
Stripe
PayPal
MercadoPago
```

---

# Shipments

Gestiona el envío de las órdenes.

Endpoints:

```
POST /shipments
GET /shipments
GET /shipments/:id
PATCH /shipments/:id
```

Información almacenada:

```
carrier
tracking_number
status
shipped_at
delivered_at
```

---

# Reviews

Permite que los usuarios valoren productos.

Endpoints:

```
POST /reviews
GET /reviews/product/:productId
```

Características:

* rating de 1 a 5
* comentario opcional
* relación usuario-producto

---

# Coupons

Sistema de cupones de descuento.

Endpoints:

```
POST /coupons
GET /coupons
GET /coupons/:code
```

Tipos de descuento:

```
percentage
fixed
```

---

# Seed

Permite poblar la base de datos con datos iniciales.

Endpoint:

```
POST /seed
```

Crea automáticamente:

```
admin user
categorías
productos de prueba
```

---

# Seguridad

El proyecto implementa varias capas de seguridad:

* JWT Authentication
* Roles Guard
* DTO Validation
* Password Hashing
* Exception Filters

---

# Qué hace este proyecto

✔ Autenticación de usuarios
✔ Gestión de catálogo
✔ Carrito de compras
✔ Checkout y órdenes
✔ Registro de pagos
✔ Seguimiento de envíos
✔ Sistema de reseñas
✔ Cupones de descuento
✔ Seed de base de datos

---

# Qué NO hace este proyecto

Este proyecto **no incluye**:

* interfaz frontend
* procesamiento real de pagos (Stripe/MercadoPago)
* integración con servicios de envío reales
* sistema de notificaciones
* gestión avanzada de inventario
* subida de imágenes a cloud storage

Estas funcionalidades pueden agregarse posteriormente.

---

# Cómo ejecutar el proyecto

### Instalar dependencias

```
npm install
```

### Configurar variables de entorno

Crear archivo `.env`:

```
### Configurar variables de entorno

Crear archivo `.env`:

DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
JWT_SECRET=supersecretkey

```

### Nota sobre PostgreSQL en producción

Cuando se utiliza PostgreSQL en servicios cloud como Render, la conexión requiere SSL.

El proyecto está configurado para conectarse automáticamente usando:

ssl: {
  rejectUnauthorized: false
}

### Ejecutar servidor

```
npm run start:dev
```

---

# Deploy

El backend puede desplegarse fácilmente en plataformas cloud como Render.

Pasos generales:

1. Crear una base de datos PostgreSQL en Render
2. Copiar la External Database URL
3. Configurar la variable de entorno:

DATABASE_URL

4. Desplegar el servicio backend

---

# Estado del proyecto

El backend implementa **la lógica principal de un e-commerce funcional**, y está diseñado como base para expandirse hacia un sistema de producción completo.

---

# Author

**Sharon**

Backend Developer specialized in:
**FullStack Development**

---

# Contact-me

**GitHub:** SOrtizRamirez
**Linkedin:** https://www.linkedin.com/in/sharonfullstack/
**Gmail:** ortizramirezs@gmail.com
