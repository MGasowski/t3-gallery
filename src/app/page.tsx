import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/3IJ7NdTBtYbj90cf3V7jvfJRK2MLDOs4pBQbk6PE8Sm7XWuV",
  "https://utfs.io/f/3IJ7NdTBtYbjOFqTnQ1ruc2KsYZbSPAl07RwDnUXaQCFoM5y",
  "https://utfs.io/f/3IJ7NdTBtYbjSoqoUvIcr7Oi4Lcu6WMTnzdegIlp5FbCxkKf",
  "https://utfs.io/f/3IJ7NdTBtYbjPzPxd6FJHb5I8sEANXzi1VhFcf4x6PBpMme0",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
