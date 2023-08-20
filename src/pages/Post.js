import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        className=""
        src={`https://${node.data.target.fields.file.url}`}
        height={node.data.target.fields.file.details.image.height}
        width={node.data.target.fields.file.details.image.width}
        alt={node.data.target.fields.description}
      />
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="mb-8 text-sm text-center">{children}</h6>
    ),
  },
  renderMark: {
    [MARKS.SUBSCRIPT]: (text) => <sub className="">{text}</sub>,
  },
};

export default function Post() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const { id } = useParams();
  const client = createClient({
    space: "gc4povo23a9e",
    accessToken: "K00k3D2P-bi8gvYW2CgRi43JFGJ4xSniiTu0Hc8VNT4",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const entries = await client.getEntries({
        content_type: "blogPost",
        order: "-fields.date",
      });
      if (entries.items) {
        setAllPosts([...entries.items]);
        setCurrentPost(entries.items.find((item) => item.sys.id === id));
      }
    };
    fetchPosts();
  }, [id]);

  // Reset scroll to the top when a new post is loaded
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [id]);

  const postIndex = allPosts.findIndex((post) => post.sys.id === id);
  const previousPost =
    postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;

  if (!currentPost) return null;

  return (
    <main className="container mx-auto md:w-3/4 px-6 py-8 pt-24">
      <img
        className="w-full h-[200px] sm:h-[500px] object-cover rounded-xl mb-4"
        src={currentPost.fields.bannerImage.fields.file.url}
        alt={currentPost.fields.title}
      />
      <div className="">
        <div className="bg-white px-4 pb-2 rounded-lg mt-8">
          <h1 className="my-2 pt-4 text-4xl font-bold">
            {currentPost.fields.title}
          </h1>
          <h2 className="my-2 text-xl">
            Written by {currentPost.fields.author}
          </h2>
          <h2 className="my-2 text-xl">
            {new Date(currentPost.fields.date).toLocaleDateString()}
          </h2>
          {documentToReactComponents(
            currentPost.fields.blogText,
            RICHTEXT_OPTIONS
          )}
        </div>

        <div className="mt-6 pt-6">
          {previousPost && (
            <Link
              to={`/post/${previousPost.sys.id}`}
              className="bg-blue-900 text-white rounded px-5 py-3 mr-4"
            >
              Previous Post
            </Link>
          )}
          {nextPost && (
            <Link
              to={`/post/${nextPost.sys.id}`}
              className="bg-blue-900 text-white rounded px-5 py-3"
            >
              Next Post
            </Link>
          )}
        </div>

        <div className="flex flex-wrap my-8 rounded-lg">
          {allPosts
            .filter((post) => post.sys.id !== id)
            .map((post, i) => (
              <Link
                to={`/post/${post.sys.id}`}
                className="w-full md:w-1/2 md:pl-6"
                key={i}
              >
                <div
                  className="h-[200px] bg-cover bg-center relative rounded-lg mb-6"
                  style={{
                    backgroundImage: `url(${post.fields.bannerImage.fields.file.url})`,
                  }}
                >
                  <div className="w-full absolute bottom-0 p-2 bg-blue-900 text-white">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {post.fields.title}
                    </h2>
                    <h3 className="text-sm sm:text-xl">
                      {new Date(post.fields.date).toLocaleDateString()}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
