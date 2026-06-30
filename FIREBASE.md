# Integración con Firebase — Bet-el Casa Abierta

Este documento explica la arquitectura de la integración y el **paso a paso para
configurar Firebase desde cero**.

Las secciones **Eventos**, **Galería**, **Próximo Retiro** y **Contacto** se
administran 100 % desde Firebase (Firestore + Storage), sin datos estáticos y
**en tiempo real** (los cambios se reflejan sin volver a desplegar).

---

## 1. Arquitectura

```
src/
├── firebase/
│   ├── config.ts        # Inicialización (lee variables de entorno)
│   ├── errors.ts        # Manejo de errores centralizado (mensajes en español)
│   └── storage.ts       # Resolución de URLs de Storage con caché en memoria
├── services/            # Capa de acceso a datos (desacopla Firebase de la UI)
│   ├── eventsService.ts        # subscribeEvents()  (onSnapshot, tiempo real)
│   ├── galleryService.ts       # subscribeGallery() (onSnapshot, tiempo real)
│   ├── nextRetreatService.ts   # subscribeNextRetreat() (doc único, tiempo real)
│   └── contactService.ts       # sendContactMessage() (escritura)
├── context/
│   └── ContentContext.tsx  # ContentProvider: 1 sola suscripción por colección,
│                           # expone { data, loading, error } + retry()
└── types/index.ts       # Modelos de dominio y documentos de Firestore (tipados)
```

**Principios aplicados**

- **Separación de responsabilidades / Clean Architecture:** la UI nunca llama a
  Firebase directamente; usa hooks (`useEvents`, `useGallery`, `useNextRetreat`)
  que leen del `ContentProvider`, que a su vez usa la **capa de servicios**.
- **SOLID:** cada servicio tiene una única responsabilidad; los modelos de
  dominio (URLs ya resueltas) están separados de los documentos de Firestore
  (rutas de Storage).
- **Optimización de lecturas:** se usa `onSnapshot` (un solo listener por
  colección, compartido por toda la app vía contexto), consultas con
  `where("active","==",true)` + `orderBy("order")`, y **caché de URLs de
  Storage** para no re-resolver la misma imagen en cada snapshot.
- **Configuración por entorno:** credenciales solo en variables `GATSBY_FIREBASE_*`.
- **Degradación elegante:** si no hay credenciales, la app no rompe; las
  secciones simplemente no se muestran.

---

## 2. Paso a paso: configurar Firebase desde cero

### 2.1 Crear el proyecto
1. Entra a <https://console.firebase.google.com/> → **Agregar proyecto**.
2. Nombre (ej. `betel-website`), acepta y crea.

### 2.2 Registrar la app web y obtener credenciales
1. En el proyecto → ⚙️ **Configuración del proyecto** → pestaña **Tus apps** →
   icono **Web (`</>`)**.
2. Registra la app (ej. "Bet-el Web"). Copia el objeto `firebaseConfig`.

### 2.3 Habilitar Firestore
1. Menú **Build → Firestore Database → Crear base de datos**.
2. Modo **producción**, elige la región (ej. `nam5` / `us-central`).

### 2.4 Crear las colecciones
Crea estas colecciones (puedes crear un documento de ejemplo en cada una; ver
sección 4):
- `events`
- `gallery`
- `siteConfig` → con un documento de **ID exactamente** `nextRetreat`
- `contactMessages` (se llena sola con el formulario)

### 2.5 Configurar Firebase Storage
1. Menú **Build → Storage → Comenzar** (modo producción).
2. Sube tus imágenes en carpetas: `events/`, `gallery/`, `siteConfig/`.
   - En cada documento de Firestore guardarás la **ruta** (ej.
     `events/encuentro.jpg`) en el campo `imagePath`; la app obtiene la URL de
     descarga dinámicamente.

### 2.6 Publicar las reglas de seguridad
Con [Firebase CLI](https://firebase.google.com/docs/cli):
```bash
npm install -g firebase-tools
firebase login
firebase use --add            # selecciona tu proyecto
firebase deploy --only firestore:rules,firestore:indexes,storage
```
Esto publica `firestore.rules`, `firestore.indexes.json` y `storage.rules`
(incluidos en la raíz del repo). Los índices son necesarios para las consultas
`active + order`.

> Alternativa sin CLI: copia el contenido de `firestore.rules` y `storage.rules`
> en la pestaña **Rules** de Firestore y Storage en la consola. Los índices los
> puede sugerir Firestore automáticamente (aparece un enlace en consola la
> primera vez que se ejecuta la consulta).

### 2.7 (Recomendado) Habilitar Authentication
Para que el panel/administración pueda escribir (las reglas exigen
`request.auth != null`):
1. **Build → Authentication → Comenzar** → habilita **Correo/contraseña**.
2. Crea un usuario admin.

### 2.8 Configurar variables de entorno
```bash
cp .env.example .env.development
cp .env.example .env.production
```
Rellena con los valores de `firebaseConfig`:
```env
GATSBY_FIREBASE_API_KEY=...
GATSBY_FIREBASE_AUTH_DOMAIN=...
GATSBY_FIREBASE_PROJECT_ID=...
GATSBY_FIREBASE_STORAGE_BUCKET=...
GATSBY_FIREBASE_MESSAGING_SENDER_ID=...
GATSBY_FIREBASE_APP_ID=...
GATSBY_FIREBASE_MEASUREMENT_ID=...
GATSBY_SITE_URL=https://tu-dominio
```

### 2.9 Despliegue
```bash
npm run build        # genera /public
# Sube /public a tu hosting (Netlify, Vercel, Firebase Hosting, etc.)
```
Las variables `GATSBY_FIREBASE_*` deben estar configuradas en el panel del
hosting para el build de producción.

---

## 3. Comportamiento del botón de inscripción (tiempo real)

El documento `siteConfig/nextRetreat` tiene el campo booleano
`showRegistrationButton`:
- `true`  → el Hero **muestra** el botón "Inscríbete por WhatsApp".
- `false` → lo **oculta** por completo.

Como la app está suscrita con `onSnapshot`, **cambiar ese campo en la consola de
Firestore actualiza la web al instante**, sin redeploy.

---

## 4. Documentos JSON de ejemplo

### Colección `events` (un documento por evento)
```json
{
  "name": "Retiro de Jóvenes 'Encuentro'",
  "date": "30 de julio al 01 de agosto de 2026",
  "location": "CDMX, México — zona sur, Álvaro Obregón",
  "description": "Un fin de semana para tener un encuentro personal con Jesús a través del Kerigma, la oración y la comunidad.",
  "imagePath": "events/encuentro-portada.jpg",
  "infoImagePath": "events/encuentro-flyer.jpg",
  "order": 1,
  "active": true,
  "startDate": "2026-07-30T18:00",
  "endDate": "2026-08-01T20:00"
}
```

### Colección `gallery` (un documento por imagen)
```json
{
  "title": "Retiro de jóvenes 2025",
  "imagePath": "gallery/retiro-2025-01.jpg",
  "order": 1,
  "active": true
}
```

### Documento `siteConfig/nextRetreat` (ID = `nextRetreat`)
```json
{
  "title": "Retiro de Jóvenes “Encuentro”",
  "date": "30 de julio al 01 de agosto de 2026",
  "href": "#eventos",
  "imagePath": "siteConfig/proximo-retiro.jpg",
  "showRegistrationButton": true,
  "whatsappText": "¡Hola! Quiero inscribirme en el Retiro de Jóvenes Encuentro 2026."
}
```

### Colección `contactMessages` (la genera el formulario)
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+52 55 1234 5678",
  "message": "Quiero más información sobre el próximo retiro.",
  "createdAt": "<timestamp del servidor>",
  "handled": false
}
```

> En los campos `imagePath` también puedes poner una **URL completa**
> (`https://...`) o una **ruta pública local** (`/images/...`); la app las usa
> tal cual sin llamar a Storage.

---

## 5. Notas

- **Índices compuestos:** las consultas de `events` y `gallery` filtran por
  `active` y ordenan por `order`, por lo que requieren un índice compuesto
  (incluido en `firestore.indexes.json`). Si ves un error de "index required" en
  consola, abre el enlace que Firestore sugiere y créalo con un clic.
- **Imágenes:** sube en `events/`, `gallery/`, `siteConfig/` de Storage y
  referencia la ruta en `imagePath`/`infoImagePath`.
- **Reintentos:** cada sección muestra un botón "Reintentar" si la carga falla;
  vuelve a suscribir todas las fuentes.
