import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Nav from "./subcomponents/Nav";

export default function Header() {
  const signout = async () => {
    await signOut(auth);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    setIsLoggedIn(!!user);
  });

  return (
    <>
      <div className="sticky top-0 w-full flex items-center justify-between h-16 py-2 px-6 bg-white border-b-2 border-gray-200">
        <Link to="/">
          <p href="/" className="text-2xl font-bold text-red-600">
            Kailey and Matt's Travel Blog
          </p>
        </Link>

        {/* For mobile */}
        <div className="visible sm:invisible absolute top-0 right-0">
          <Nav />
        </div>

        {/* For desktop */}
        <div className="invisible sm:visible w-96">
          <div className="flex flex-row justify-end mx-auto">
            <a href="/about" className="nav-link px-4">
              About
            </a>
            <a href="/map" className="nav-link px-4">
              Map
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
