import { db } from '@/lib/firebase';
import { SearchItem } from '@/app/interfaces/searchItem';

const collectionRef = db.collection('history');

export const getCollectionDataByField = (name: string, value: string) =>
  collectionRef.where(name, '==', value).get();

export const addSearchItemDocument = (data: SearchItem) =>
  collectionRef.add(data);
