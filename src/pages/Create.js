import React, { useState } from "react";
import ReactQuill from "react-quill";
import { db, auth } from "../services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore"; 
import "react-quill/dist/quill.snow.css"; // import styles

export default function Create() {
  const [text, setText] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const savePost = async () => {
    await addDoc(collection(db, "posts"),{
      content: text,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText(""); // clear the editor
  };

  return (
    <div>
      <ReactQuill value={text} onChange={setText} modules={modules} />
      <button onClick={savePost}>Save Post</button>
    </div>
  );
}
