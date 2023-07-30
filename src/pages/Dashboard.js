import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          console.log(doc.data());
          setAllPosts([...allPosts, doc.data()]);
        });
      } else if (!authUser) {
        console.log("not signed in");
      }
      return userAuth;
    });
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Account Dashboard
        </h1>
        <div className="flex flex-row justify-start w-3/4">
          <div className="text-lg text-gray-800 my-2">Account Email:</div>
          <div className="text-lg text-gray-800 my-2 pl-4">
            {/* {userInfo.email} */}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="/locations">
            <button className="bg-emerald-400 text-gray-800 hover:bg-emerald-600 font-semibold py-2 px-4 rounded-md drop-shadow-md">
              Create New Blog Post
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
