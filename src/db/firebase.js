import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from 'db/config';

import dayjs from 'dayjs';

initializeApp(firebaseConfig);
const db = getFirestore();
const usage = collection(db, "usage");

function addActivity(date, name, start, end) {
    const timeFormats = ["HH:mm:ss", "hh:mm:ss A", "hh:mm:ss a", "HH:mm", "hh:mm A", "hh:mm a"];
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    addDoc(activity, {
        name: name,
        start: Timestamp.fromMillis(dayjs(start, timeFormats).valueOf()),
        end: Timestamp.fromMillis(dayjs(end, timeFormats).valueOf()),
    });
}

function getActivities(date) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    return getDocs(activity);
}

export {addActivity, getActivities}
