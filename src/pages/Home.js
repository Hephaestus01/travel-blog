import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          August 8th, 2023
        </h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-8">
          Location: Torino, Italy
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          malesuada rhoncus eros, id bibendum velit tincidunt ut. Sed vel enim
          hendrerit, laoreet metus ut, aliquet libero. In culpa reprehenderit
          consequat incididunt qui commodo laboris occaecat minim labore. Ipsum
          sint anim eu esse aliqua nostrud commodo aliqua. Enim commodo
          consectetur aliqua minim excepteur enim qui nulla non officia.
          Pariatur et irure ad et deserunt Lorem voluptate irure minim consequat
          minim amet nostrud. Non ex exercitation fugiat ad id incididunt et qui
          pariatur laboris. Eu laborum deserunt ex anim Lorem commodo ea irure
          ad reprehenderit dolore id mollit. Laboris eu proident et commodo ex
          sunt consectetur nostrud laborum tempor non. Do eiusmod anim ullamco
          non culpa id nulla dolor dolor aliqua. Non esse laboris incididunt do
          cupidatat cupidatat enim labore esse. Pariatur veniam ut duis ut
          laboris minim est ipsum qui amet. Sunt excepteur ea nostrud velit
          reprehenderit officia id sint minim exercitation.
        </p>

        <p className="text-lg text-gray-800 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          malesuada rhoncus eros, id bibendum velit tincidunt ut. Sed vel enim
          hendrerit, laoreet metus ut, aliquet libero. In culpa reprehenderit
          consequat incididunt qui commodo laboris occaecat minim labore. Ipsum
          sint anim eu esse aliqua nostrud commodo aliqua. Enim commodo
          consectetur aliqua minim excepteur enim qui nulla non officia.
          Pariatur et irure ad et deserunt Lorem voluptate irure minim consequat
          minim amet nostrud. Non ex exercitation fugiat ad id incididunt et qui
          pariatur laboris. Eu laborum deserunt ex anim Lorem commodo ea irure
          ad reprehenderit dolore id mollit. Laboris eu proident et commodo ex
          sunt consectetur nostrud laborum tempor non. Do eiusmod anim ullamco
          non culpa id nulla dolor dolor aliqua. Non esse laboris incididunt do
          cupidatat cupidatat enim labore esse. Pariatur veniam ut duis ut
          laboris minim est ipsum qui amet. Sunt excepteur ea nostrud velit
          reprehenderit officia id sint minim exercitation.
        </p>
      </main>
    </div>
  );
}
