import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query, setDoc, Timestamp } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { firebaseConfig } from 'db/config';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LfNkuAcAAAAAEFH_R2IafuvPtCbamytv2mFMAGL"),
    isTokenAutoRefreshEnabled: true
});
signInAnonymously(getAuth()).then(() => console.log("Signed In"));
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
    if (end.toUpperCase().includes("EOD")) {
        end = date.add(1, "day").startOf("day");
    } else {
        end = dayjs(date.format("YYYY-MM-DD") + " " + end, timeFormats);
    }

    if (end < start) {
        window.alert("Start time is after end time.");
        return;
    }
    return setDoc(doc(activity, start.format("HH-mm-ss")), {
        name: name.toLowerCase().trim(),
        start: Timestamp.fromMillis(start.valueOf()),
        end: Timestamp.fromMillis(end.valueOf()),
    });
}

function getActivity(date) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    return getDocs(activity);
}

function listenForActivity(date, callback) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    return onSnapshot(query(activity), callback);
}

function deleteActivity(date, id) {
    const activity = collection(doc(usage, date.format("YYYY-MM-DD")), "activity");
    return deleteDoc(doc(activity, id));
}

export {addActivityDoc, getActivity, listenForActivity, deleteActivity};
