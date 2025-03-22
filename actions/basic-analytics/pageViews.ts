import { adminDb, admin } from '../../lib/firebaseAdmin';

export async function updatePageView(productId: string) {
  const docRef = adminDb.collection('products').doc(productId);
  await adminDb.runTransaction(async (transaction) => {
    const doc = await transaction.get(docRef);
    if (!doc.exists) {
      transaction.set(docRef, { pageViews: 1 });
    } else {
      transaction.update(docRef, { pageViews: admin.firestore.FieldValue.increment(1) });
    }
  });
}

export async function getPageViews(productId: string) {
  const doc = await adminDb.collection('products').doc(productId).get();
  return doc.exists ? doc.data()?.pageViews || 0: 0;
}