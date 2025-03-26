export default function serializeFirestoreData(firestoreData: any) {
  const object = {
    ...firestoreData,
    updatedAt: firestoreData.updatedAt?.toDate() || null,
    createdAt: firestoreData.createdAt?.toDate() || null,
    lastFeedbackAt: firestoreData.lastFeedbackAt?.toDate() || null,
  };
  return object;
}
