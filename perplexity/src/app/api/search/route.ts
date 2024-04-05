import { domainFromUrl } from '@/app/helpers';
import { Source } from '@/app/interfaces/source';
import { type NextRequest } from 'next/server';
import { bingWebImageSearch, bingWebSearch } from '@/services/bing.service';
import {
  addSearchItemDocument,
  getCollectionDataByField,
} from '@/services/history.service';
import { mapDocumentsData } from '@/app/helpers/firestore.helper';
import { auth } from '@/lib/firebase';

export async function GET(req: NextRequest) {
  const authorization = req.headers.get('authorization');
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || typeof query !== 'string') {
    throw Error();
  }

  const { data: bingResult } = await bingWebSearch(query);
  const { data: bingImagesResult } = await bingWebImageSearch(query);

  const { value: webPageList } = bingResult.webPages;
  let relatedSearchesList = [];

  if (bingResult.relatedSearches) {
    relatedSearchesList = bingResult.relatedSearches.value;
  }

  if (authorization) {
    const decodedIdToken = await auth.verifyIdToken(authorization);
    const user = await auth.getUser(decodedIdToken.uid);

    if (user) {
      const searchItems = await getCollectionDataByField('userId', user.uid);
      const data = mapDocumentsData(searchItems.docs);

      if (searchItems.empty || !data.some((d) => d.query == query)) {
        const searchItem = {
          query,
          userId: user.uid,
          timestamp: Date.now(),
        };
        await addSearchItemDocument(searchItem);
      } else {
        searchItems.forEach((doc: any) => {
          const docData = doc.data();

          if (docData.query == query) {
            doc.ref.update({
              timestamp: Date.now(),
            });
          }
        });
      }
    }
  }

  return Response.json({
    sources: webPageList.map((webPage: Source) => ({
      ...webPage,
      domain: domainFromUrl(webPage.url),
    })),
    images: bingImagesResult.value,
    relatedSearches: relatedSearchesList,
  });
}
