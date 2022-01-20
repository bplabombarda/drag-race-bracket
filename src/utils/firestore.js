import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore/lite';
import firebase from './firebase';

export const db = getFirestore(firebase);

export async function getSeasons(active = false) {
  const seasonsCol = collection(db, 'seasons');
  const seasonQuery = query(seasonsCol, where('active', '==', true));
  const snapshot = active
    ? await getDocs(seasonQuery)
    : await getDocs(seasonsCol);

  return snapshot.docs.reduce(
    (acc, season) => ({
      ...acc,
      [season.id]: season.data(),
    }),
    {}
  );
}

export async function getSubmissionsBySeasonId(seasonId) {
  const seasonRef = doc(db, 'seasons', seasonId);
  const submissionCol = collection(seasonRef, 'submissions');
  const snapshot = await getDocs(submissionCol);

  return snapshot.docs.reduce(
    (acc, submission) => ({
      ...acc,
      [submission.id]: submission.data(),
    }),
    {}
  );
}

export async function setSelections({ email, seasonId, selections }) {
  const seasonDoc = doc(db, 'seasons', seasonId);
  const submissionDoc = doc(seasonDoc, 'submissions', email);
  const snapshot = await setDoc(submissionDoc, selections);

  return snapshot;
}
