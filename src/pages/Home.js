import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { data } from "../data/blog-posts";

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
    <>
      {data.map((post, index) => (
        <div className="bg-gray-100">
          <main className="max-w-4xl mx-auto py-8 px-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {post.date}
            </h1>
            <h2 className="text-2xl font-medium text-gray-700 mb-8">
              Location: {post.location}
            </h2>
            {post.paragraphs.map((paragraph, index) => (
              <p className="text-lg text-gray-800 mb-8">
                {paragraph}
              </p>
            ))}
          </main>
        </div>
      ))}
    </>
  );
}
