import { formatRelative } from "date-fns";
import makeFirstLetterUppercase from "./make-first-letter-uppercase";

export default function formatFirebaseTimestamp (timestamp: any, isFirstLetterUppercase=true) {
    if (!timestamp) return 'Unknown date';
    
    // Assuming timestamp is a Firestore Timestamp object
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const formatedDate = formatRelative(date, new Date())
    
    return !isFirstLetterUppercase ? formatedDate : makeFirstLetterUppercase(formatedDate)
  };