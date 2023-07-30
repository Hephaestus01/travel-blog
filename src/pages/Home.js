import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { data } from "../data/blog-posts";

import { db, auth } from "../services/firebaseConnection";
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";

export default function Home() {
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const userAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log(authUser);
        let querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          setAllPosts([...allPosts, doc.data()]);
        });
        console.log(allPosts);
      } else if (!authUser) {
        console.log("not signed in");
      }
      return userAuth;
    });
  }, []);

  return (
    <>
      {allPosts.map((post, index) => (
        <div key={post.id} dangerouslySetInnerHTML={{ __html: post.content }} />
      ))}
    </>
  );
}
