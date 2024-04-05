import { type NextRequest, NextResponse } from 'next/server';
import { getCollectionDataByField } from '@/services/history.service';
import { mapDocumentsData } from '@/app/helpers/firestore.helper';
import { auth } from '@/lib/firebase';

export const GET = async (req: NextRequest) => {
  try {
    const authorization = req.headers.get('authorization');
    if (!authorization) {
      return NextResponse.json(
        { error: 'No credentials sent!' },
        { status: 403 }
      );
    }
    const decodedIdToken = await auth.verifyIdToken(authorization);
    const user = await auth.getUser(decodedIdToken.uid);

    if (!authorization) {
      return NextResponse.json(
        { error: 'User does not exist!' },
        { status: 401 }
      );
    }
    const users = await getCollectionDataByField('userId', user.uid);
    const data = mapDocumentsData(users.docs);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Bad request.' },
      { status: 400 }
    );
  }
};
