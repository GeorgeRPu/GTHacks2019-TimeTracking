import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from 'db/config';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

initializeApp(firebaseConfig);
const db = getFirestore();
const usage = collection(db, "usage");

const timeFormats = [
    "h:mm a", "h:mm A", "h:mm:ss a", "h:mm:ss A",
    "hh:mm a", "hh:mm A", "hh:mm:ss a", "hh:mm:ss A",
    "H:mm:ss", "H:mm", "HH:mm:ss", "HH:mm",
].map(format => "YYYY-MM-DD" + " " + format);

function addActivityDoc(date, name, start, end) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    start = dayjs(date.format("YYYY-MM-DD") + " " + start, timeFormats);
    end = dayjs(date.format("YYYY-MM-DD") + " " + end, timeFormats);
    console.log(start);
    console.log(end);
    if (end < start) {
        window.alert("Start time is after end time.");
        return;
    }
    return setDoc(doc(activity, start.format("HH-mm-ss")), {
        name: name,
        start: Timestamp.fromMillis(start.valueOf()),
        end: Timestamp.fromMillis(end.valueOf()),
    });
}

function getActivity(date) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    return getDocs(activity);
}

export {addActivityDoc, getActivity}
