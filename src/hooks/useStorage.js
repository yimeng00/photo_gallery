import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // checks if file or file.name is undefined/null before proceeding
    if (!file || !file.name) {
      setError("Invalid file!");
      return;
    }

    // references
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images');

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct);
      },
      (err) => {
        // Error function ...
        setError(err);
      },
      () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const createdAt = timestamp(); // Use serverTimestamp() for Firebase Firestore
          addDoc(collectionRef, { url: downloadURL, createdAt }); // Use addDoc() to add a document to the collection
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
