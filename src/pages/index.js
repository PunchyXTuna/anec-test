import { createClient } from "contentful";
import { resolve } from "styled-jsx/css";
import PostCard from "./components/PostCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const previewClient = createClient({
    host: "preview.contentful.com",
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "post" });

  return {
    props: {
      posts: res.items,
    },
  };
}

export default function Recipes({ posts }) {
  console.log(posts);


  return (
    <div className="project-list">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}

      <style jsx>{`
        .project-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
