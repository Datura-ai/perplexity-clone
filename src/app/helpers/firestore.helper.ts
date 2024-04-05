export const mapDocumentsData = (data: FirebaseFirestore.DocumentData[]) =>
  data.map((d: FirebaseFirestore.DocumentData) => d.data());
