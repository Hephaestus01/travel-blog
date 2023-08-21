import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const client = createClient({
    space: "gc4povo23a9e",
    accessToken: "K00k3D2P-bi8gvYW2CgRi43JFGJ4xSniiTu0Hc8VNT4",
  });

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await client.getEntries({
        content_type: "blogPost",
      });
      if (entries.items) {
        const sortedPosts = [...entries.items].sort((a, b) => {
          return new Date(b.fields.date) - new Date(a.fields.date);
        });
        setBlogPosts(sortedPosts);
      }
    };
    fetchEntries();
  }, []);

  const recentPost = blogPosts[0];
  const previousPosts = blogPosts.slice(1);

  return (
    <main className="container mx-auto md:w-3/4 px-6 py-8 pt-24">
      {recentPost && (
        <div
          className="h-[500px] bg-cover bg-center sm:bg-start-100 relative rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${recentPost.fields.bannerImage.fields.file.url})`,
          }}
        >
          <div className="absolute bottom-0 p-6 bg-blue-900 text-white">
            <h1 className="text-4xl font-bold">{recentPost.fields.title}</h1>
            <h2 className="text-xl">
              {new Date(recentPost.fields.date).toLocaleDateString()}
            </h2>
            <Link
              to={`/post/${recentPost.sys.id}`}
              className="mt-4 inline-block bg-blue-500 text-white rounded px-5 py-3"
            >
              Read More
            </Link>
          </div>
        </div>
      )}

      {previousPosts.map((post) => (
        <div
          key={post.sys.id}
          className="flex flex-col sm:flex-row bg-white shadow-md rounded-md overflow-hidden mt-6"
        >
          <img
            className="w-full sm:w-1/2 h-[200px] object-cover rounded-t-md"
            src={post.fields.bannerImage.fields.file.url}
            alt={post.fields.title}
          />
          <div className="w-full sm:w-1/2 p-6">
            <h2 className="text-2xl font-bold text-black">
              {post.fields.title}
            </h2>
            <h3 className="text-xl text-black">
              {new Date(post.fields.date).toLocaleDateString()}
            </h3>
            <Link
              to={`/post/${post.sys.id}`}
              className="mt-4 inline-block bg-blue-500 text-white rounded px-5 py-3"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
