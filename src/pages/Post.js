import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="mb-8">{children}</p>;
    },
    [BLOCKS.HEADING_6]: (node, children) => {
      return <h6 className="mb-8 text-sm text-center">{children}</h6>;
    },
  },
  renderMark: {
    [MARKS.SUBSCRIPT]: (text) => <sub className="">{text}</sub>,
  },
};

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const client = createClient({
    space: "gc4povo23a9e",
    accessToken: "K00k3D2P-bi8gvYW2CgRi43JFGJ4xSniiTu0Hc8VNT4",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const entry = await client.getEntry(id);
      if (entry) setPost(entry);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <main className="container mx-auto md:w-3/4 px-6 py-8 pt-24">
      <img
        className="w-full h-[500px] object-cover rounded-t-md"
        src={post.fields.bannerImage.fields.file.url}
        alt={post.fields.title}
      />
      <div className="mt-8">
        <h1 className="text-4xl font-bold">{post.fields.title}</h1>
        <h2 className="text-xl">
          {new Date(post.fields.date).toLocaleDateString()}
        </h2>
        {documentToReactComponents(post.fields.blogText, RICHTEXT_OPTIONS)}
      </div>
    </main>
  );
}
