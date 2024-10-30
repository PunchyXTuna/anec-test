import { createClient } from "contentful";

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

const handler = async (req, res) => {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const response = await previewClient.getEntries({
    content_type: "post",
    "fields.slug": slug,
  });

  const post = response?.items?.[0];

  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});
  const url = `/${post.fields.slug}`;
  res.writeHead(307, { Location: url });
  res.end();
};

export default handler;
