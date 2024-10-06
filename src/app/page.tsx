import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
