/**
 * Asigna el custom claim { admin: true } a un usuario de Firebase Auth.
 * Esto habilita el acceso completo (Firestore + Storage) en las reglas.
 *
 * Requisitos:
 *   1) Descarga una clave de cuenta de servicio:
 *      Consola Firebase → ⚙️ → Configuración → Cuentas de servicio →
 *      "Generar nueva clave privada" (guarda el JSON, NO lo subas al repo).
 *   2) Instala el SDK admin (temporal):  npm install firebase-admin --no-save
 *
 * Uso:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json \
 *     node scripts/set-admin-claim.js correo@ejemplo.com
 */
const admin = require("firebase-admin");

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Uso: node scripts/set-admin-claim.js <email>");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });

  // (Opcional) además registra el uid en la colección admins/{uid}.
  await admin
    .firestore()
    .collection("admins")
    .doc(user.uid)
    .set({ email, grantedAt: new Date().toISOString() });

  console.log(`✅ ${email} (uid ${user.uid}) ahora es administrador.`);
  console.log("Debe cerrar sesión y volver a entrar para refrescar el token.");
  process.exit(0);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
