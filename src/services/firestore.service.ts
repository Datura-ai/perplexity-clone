import { db } from '@/lib/firebase';

export const getCollectionData = async (collection: any) => {
  const docsRef = await db.collection(collection);
  const mainDocs: Record<string, unknown>[] = [];

  const docs = await docsRef.get();
  docs.forEach(async (doc) => {
    mainDocs.push({ ...doc.data(), _id: doc.id });
  });

  return mainDocs;
};

export const listCollections = () => db.listCollections();

export const updateDocs = (
  docs: FirebaseFirestore.QuerySnapshot,
  data: Record<string, unknown>
) => docs.forEach((doc) => doc.ref.update(data));
