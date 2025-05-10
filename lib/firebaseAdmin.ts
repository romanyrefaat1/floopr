import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace any escaped newline characters in your private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    // Optional: If you have a databaseURL defined in your Firebase project
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const adminDb = admin.firestore();
export { admin, adminDb };
