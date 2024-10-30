import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "post",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params, preview = false }) {
  const currentClient = preview ? previewClient : client;
  const { items } = await currentClient.getEntries({
    content_type: "post",
    "fields.slug": params.slug,
  });

  return {
    props: { post: items[0], preview },

  };
}

export default function RecipeDetails({ post, preview }) {
  const { featuredImage, title, timeItTook, tools, method } = post.fields;

  console.log(post);
  return (
    <div>
      {preview && (
        <>
          You are previewing content:
          <Link href="src\pages\api\exit-preview">Exit preview</Link>
        </>
      )}
      <div className="banner">
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Take about {timeItTook} hours </p>
        <h3>Ingredients</h3>

        {tools.map((tll) => (
          <span key={tll}>{tll}</span>
        ))}
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
          color: white;
        }
        body {
          color: white;
        }
        .banner h2 {
          margin: 0;
          color: black;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
          color: white;
        }
        p {
          color: white;
        }
        .info span::after {
          content: ",     ";
        }
        .info {
          color: white;
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
}
