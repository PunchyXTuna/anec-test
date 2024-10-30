import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }) {
  // Check if post and post.fields are defined
  if (!post || !post.fields) {
    return <div>Post data is not available.</div>;
  }

  const { title, slug, timeItTook, thumbnail } = post.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Took {timeItTook} hours</p>
        </div>
        <div className="actions">
          <Link legacyBehavior href={"/posts/" + slug}>
            <a>Check it Out!</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
        }
        .content {
          background: black;
          box-shadow: 1px 3px 5px #f3e640;
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: white;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #f3e640;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
