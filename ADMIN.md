# Módulo de Administración — Bet-el Casa Abierta

Panel admin en **`/admin`** con Firebase Authentication, CRUD en tiempo real de
Firestore y gestión de Firebase Storage. Protegido por **rol de administrador**.

---

## 1. Arquitectura (Clean Architecture por capas)

```
UI (src/admin/components, src/pages/admin.tsx)
   ↓ hooks (useAuth, useFirestoreSubscription, useToast, useConfirm)
Servicios (authService, firestoreRepository, storageAdminService)
   ↓
Firebase (config, auth, errors)  ← variables de entorno
```

| Capa | Archivos | Responsabilidad |
|------|----------|-----------------|
| Firebase | `src/firebase/{config,auth,errors,storage}.ts` | Inicialización + utilidades |
| Servicios | `src/services/{authService,firestoreRepository,storageAdminService}.ts` | Acceso a datos (Repository) |
| Estado | `src/context/AuthContext.tsx`, `src/hooks/useFirestoreSubscription.ts` | Sesión + suscripciones |
| Config | `src/admin/collections.config.ts` | Esquema de colecciones (1 sola fuente de verdad) |
| UI | `src/admin/AdminApp.tsx`, `src/admin/components/*` | Login, layout, CRUD, Storage |

**Principios:** SOLID (repositorio genérico + config declarativa = Open/Closed),
DRY (un `DocumentForm` y un `CollectionManager` sirven para todas las
colecciones), KISS (navegación por estado, sin router extra), manejo de errores
centralizado (`toFriendlyError`), tipado fuerte y credenciales por entorno.

### ¿Cómo agregar una colección nueva al panel?
Solo añade una entrada en `COLLECTIONS` (`src/admin/collections.config.ts`) con
sus campos. La tabla, el formulario, la validación y el dashboard se generan
solos. **No se toca la UI.**

---

## 2. Funcionalidades

- **Login** con email/contraseña (Firebase Auth), con estados de carga y error.
- **Ruta privada:** sin sesión → login; con sesión sin rol admin → acceso
  denegado; con rol admin → panel.
- **Dashboard** con conteos en vivo por colección.
- **Menú lateral** responsive (drawer en móvil).
- **CRUD** por colección: crear, editar, eliminar (con confirmación),
  **búsqueda/filtrado**, validación, y **tiempo real** (`onSnapshot`).
- **Próximo Retiro** se administra como documento único (`siteConfig/nextRetreat`),
  incluido el switch `showRegistrationButton`.
- **Mensajes de contacto** en solo lectura (+ eliminar).
- **Storage:** carpetas (`events`, `gallery`, `siteConfig`), subir con barra de
  progreso, vista previa, eliminar.
- **Notificaciones** (toasts) de éxito/error.

---

## 3. Configurar Firebase desde cero

> Si ya seguiste `FIREBASE.md`, solo te faltan los pasos 3.1 y 3.4.

### 3.1 Habilitar Authentication
Consola Firebase → **Build → Authentication → Comenzar** → habilita
**Correo/contraseña** → pestaña **Users → Agregar usuario** (crea tu cuenta admin).

### 3.2 Firestore y Storage
Ya cubiertos en `FIREBASE.md` (colecciones `events`, `gallery`, `siteConfig`,
`contactMessages`; Storage con carpetas `events/`, `gallery/`, `siteConfig/`).

### 3.3 Publicar reglas de seguridad
```bash
firebase deploy --only firestore:rules,storage
```

### 3.4 Asignar el rol de administrador
**Opción A — Custom Claim (recomendada; habilita Firestore + Storage):**
```bash
# 1) Consola → ⚙️ → Cuentas de servicio → Generar clave privada (serviceAccount.json)
# 2) Instala el SDK admin temporalmente
npm install firebase-admin --no-save
# 3) Asigna el rol
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json \
  node scripts/set-admin-claim.js tu-correo@ejemplo.com
```
Cierra sesión y vuelve a entrar para refrescar el token.

**Opción B — Documento `admins/{uid}` (solo Firestore, sin Storage):**
Crea en Firestore la colección `admins` con un documento cuyo **ID sea el UID**
del usuario (lo ves en Authentication → Users). Útil para pruebas, pero **las
subidas a Storage requieren la Opción A**.

---

## 4. Uso

1. `npm run develop` (o producción) y entra a **`/admin`**.
2. Inicia sesión con tu cuenta admin.
3. Administra Eventos, Galería, Próximo Retiro, Mensajes y Almacenamiento.

Los cambios se reflejan **al instante** en el sitio público (gracias a los
listeners en tiempo real).

---

## 5. Despliegue

```bash
npm run build
npx firebase-tools deploy            # hosting + reglas (según firebase.json)
```
Configura las variables `GATSBY_FIREBASE_*` en el entorno de build del hosting.
La ruta `/admin` está marcada `noindex` y excluida en `robots.txt`.

---

## 6. Seguridad — resumen

- **Autenticación** obligatoria para el panel (Firebase Auth).
- **Autorización** por rol admin (custom claim o `admins/{uid}`).
- **Firestore Rules:** lectura pública solo de contenido; escritura solo admin;
  `contactMessages` se crea validado y solo el admin lo lee.
- **Storage Rules:** lectura pública de imágenes; escritura solo admin, solo
  imágenes ≤ 5 MB.
- **Defensa en profundidad:** la UI oculta acciones, pero la seguridad real la
  imponen las reglas del servidor (no se confía en el cliente).
