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
    <header className="z-10 fixed top-0 left-0 w-full flex items-center justify-between h-16 px-6 bg-blue-900 text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">Kailey and Matt's Travel Blog</h1>
      </Link>

      {/* For mobile */}
      <div className="sm:hidden">
        <Nav />
      </div>

      {/* For desktop */}
      <nav className="hidden sm:flex space-x-4">
        <Link to="/about" className="text-xl">
          About
        </Link>
        {/* <Link to="/map" className="text-xl">
          Map
        </Link> */}
      </nav>
    </header>
  );
}
