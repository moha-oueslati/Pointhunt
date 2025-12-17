import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function codeGenerate(hostname: string){

const code = Math.floor(1000 + Math.random() * 9000).toString();
const ref = doc(db, "codes", code);

await setDoc(ref, {
    host: hostname,
    createdAt: Date.now(),
    status: "waiting"
  });

  return code;
}

