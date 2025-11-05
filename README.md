# Bellezapp Backend - POS System API

Backend REST API para sistema POS (Point of Sale) de tiendas de belleza desarrollado con Node.js, Express, TypeScript y MongoDB.

## 🚀 Características

- **Sistema Multi-Tienda**: Soporte para múltiples sucursales
- **Gestión de Inventario**: Control completo de productos, categorías, proveedores y ubicaciones
- **Ventas y Órdenes**: Procesamiento de ventas con actualización automática de inventario
- **Caja**: Gestión de apertura/cierre de caja con conciliación automática
- **Clientes**: CRM con seguimiento de compras y programa de lealtad
- **Finanzas**: Registro de transacciones financieras con reportes
- **Autenticación JWT**: Sistema seguro de autenticación y autorización
- **Roles y Permisos**: Control de acceso basado en roles

## 📋 Requisitos Previos

- Node.js 18+
- MongoDB 6.0+
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd bellezapp-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bellezapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

4. Inicia MongoDB:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Ejecuta el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📚 API Endpoints

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| POST | `/register` | Registrar nuevo usuario | No |
| POST | `/login` | Iniciar sesión | No |
| GET | `/profile` | Obtener perfil del usuario | Sí |

**Registro:**
```json
POST /api/auth/register
{
  "username": "admin",
  "email": "admin@bellezapp.com",
  "password": "securepass123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin"
}
```

**Login:**
```json
POST /api/auth/login
{
  "username": "admin",
  "password": "securepass123"
}
```

### 👥 Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Requiere Auth | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/` | Listar todos los usuarios | Sí | admin |
| GET | `/:id` | Obtener usuario por ID | Sí | - |
| POST | `/` | Crear nuevo usuario | Sí | admin |
| PATCH | `/:id` | Actualizar usuario | Sí | admin |
| DELETE | `/:id` | Eliminar usuario | Sí | admin |
| POST | `/assign-store` | Asignar tienda a usuario | Sí | admin |

### 🏪 Tiendas (`/api/stores`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todas las tiendas |
| GET | `/:id` | Obtener tienda por ID |
| POST | `/` | Crear nueva tienda |
| PATCH | `/:id` | Actualizar tienda |
| DELETE | `/:id` | Eliminar tienda |

**Crear Tienda:**
```json
POST /api/stores
{
  "name": "Sucursal Centro",
  "address": "Calle Principal 123",
  "phone": "555-0100",
  "email": "centro@bellezapp.com",
  "status": "active"
}
```

### 📦 Productos (`/api/products`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar productos (filtros: storeId, categoryId, supplierId, lowStock) |
| GET | `/:id` | Obtener producto por ID |
| POST | `/` | Crear nuevo producto |
| PATCH | `/:id` | Actualizar producto |
| DELETE | `/:id` | Eliminar producto |
| PATCH | `/:id/stock` | Actualizar stock |

**Crear Producto:**
```json
POST /api/products
{
  "name": "Shampoo Hidratante 500ml",
  "description": "Shampoo profesional para cabello seco",
  "purchasePrice": 15.00,
  "salePrice": 25.00,
  "weight": 0.5,
  "categoryId": "cat_id",
  "supplierId": "sup_id",
  "locationId": "loc_id",
  "storeId": "store_id",
  "stock": 50,
  "foto": "https://example.com/image.jpg"
}
```

**Actualizar Stock:**
```json
PATCH /api/products/:id/stock
{
  "quantity": 10,
  "operation": "add"  // "add" o "subtract"
}
```

### 🏷️ Categorías (`/api/categories`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todas las categorías |
| GET | `/:id` | Obtener categoría por ID |
| POST | `/` | Crear nueva categoría |
| PATCH | `/:id` | Actualizar categoría |
| DELETE | `/:id` | Eliminar categoría |

### 🚚 Proveedores (`/api/suppliers`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos los proveedores |
| GET | `/:id` | Obtener proveedor por ID |
| POST | `/` | Crear nuevo proveedor |
| PATCH | `/:id` | Actualizar proveedor |
| DELETE | `/:id` | Eliminar proveedor |

### 📍 Ubicaciones (`/api/locations`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar ubicaciones (filtro: storeId) |
| GET | `/:id` | Obtener ubicación por ID |
| POST | `/` | Crear nueva ubicación |
| PATCH | `/:id` | Actualizar ubicación |
| DELETE | `/:id` | Eliminar ubicación |

### 👤 Clientes (`/api/customers`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar clientes (filtro: search) |
| GET | `/top` | Obtener mejores clientes |
| GET | `/:id` | Obtener cliente por ID |
| POST | `/` | Crear nuevo cliente |
| PATCH | `/:id` | Actualizar cliente |
| DELETE | `/:id` | Eliminar cliente |

**Crear Cliente:**
```json
POST /api/customers
{
  "name": "María González",
  "phone": "555-1234",
  "email": "maria@example.com",
  "address": "Av. Principal 456"
}
```

### 🎁 Descuentos (`/api/discounts`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar descuentos (filtro: isActive) |
| GET | `/active` | Obtener descuentos activos vigentes |
| GET | `/:id` | Obtener descuento por ID |
| POST | `/` | Crear nuevo descuento |
| PATCH | `/:id` | Actualizar descuento |
| DELETE | `/:id` | Eliminar descuento |

### 🛒 Órdenes/Ventas (`/api/orders`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar órdenes (filtros: storeId, customerId, date, paymentMethod) |
| GET | `/report` | Obtener reporte de ventas |
| GET | `/:id` | Obtener orden por ID |
| POST | `/` | Crear nueva orden |

**Crear Orden:**
```json
POST /api/orders
{
  "customerId": "customer_id",
  "storeId": "store_id",
  "userId": "user_id",
  "paymentMethod": "efectivo",
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 25.00
    }
  ]
}
```

**Métodos de Pago:** `efectivo`, `tarjeta`, `transferencia`, `otro`

### 💵 Caja (`/api/cash`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/register/open` | Abrir caja |
| POST | `/register/close/:id` | Cerrar caja |
| GET | `/movements` | Listar movimientos de caja |
| POST | `/movements` | Registrar movimiento de caja |

**Abrir Caja:**
```json
POST /api/cash/register/open
{
  "storeId": "store_id",
  "userId": "user_id",
  "openingAmount": 100.00
}
```

**Cerrar Caja:**
```json
POST /api/cash/register/close/:id
{
  "closingAmount": 850.00
}
```

### 💰 Finanzas (`/api/financial`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar transacciones (filtros: storeId, type, category, dates) |
| GET | `/report` | Obtener reporte financiero |
| GET | `/:id` | Obtener transacción por ID |
| POST | `/` | Crear nueva transacción |
| PATCH | `/:id` | Actualizar transacción |
| DELETE | `/:id` | Eliminar transacción |

### 🎭 Roles (`/api/roles`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos los roles |
| GET | `/:id` | Obtener rol por ID |
| POST | `/` | Crear nuevo rol |
| PATCH | `/:id` | Actualizar rol |
| DELETE | `/:id` | Eliminar rol |

## 🔒 Autenticación

Todas las rutas excepto `/api/auth/register` y `/api/auth/login` requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al iniciar sesión y debe incluirse en todas las peticiones protegidas.

## 🏗️ Estructura del Proyecto

```
bellezapp-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración MongoDB
│   ├── controllers/             # Lógica de negocio
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   │   ├── cash.controller.ts
│   │   └── ...
│   ├── models/                  # Modelos Mongoose
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   └── ...
│   ├── routes/                  # Definición de rutas
│   ├── middleware/              # Middlewares
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   └── server.ts               # Punto de entrada
├── dist/                       # Código compilado
├── .env                       # Variables de entorno
├── package.json
└── tsconfig.json
```

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test
```

## 🔄 Migración desde SQLite

Si vienes del sistema anterior con SQLite, consulta [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) para instrucciones detalladas.

## 📝 Licencia

ISC

## 👨‍💻 Desarrollo

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar TypeScript
npm run build

# Iniciar en producción
npm start
```

## 🐛 Solución de Problemas

**Error: Cannot connect to MongoDB**
- Verifica que MongoDB esté ejecutándose
- Comprueba la URI en el archivo `.env`

**Error: JWT token invalid**
- Verifica que el token sea válido y no haya expirado
- Asegúrate de incluir el prefijo "Bearer " en el header

**Error: Validation failed**
- Revisa que todos los campos requeridos estén presentes
- Verifica el formato de los datos enviados
#   b e l l e z a p p - b a c k e n d  
 