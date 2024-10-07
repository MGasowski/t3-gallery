import { HorizontalInfiniteSlider } from "~/components/horizontal-infinite-slider";
import { InfiniteSlider } from "~/components/infinite-slider";
import { MasonryGalleryComponent } from "~/components/masonry-gallery";
import { categories } from "~/constants";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {/* <InfiniteSlider images={images} />4 */}
      <HorizontalInfiniteSlider images={images} />
      <MasonryGalleryComponent
        categories={categories}
        galleryItems={images.map((el) => ({
          id: el.id,
          src: el.url,
          alt: el.name,
          category: ["lifestyle"],
        }))}
      />
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <Images />
    </main>
  );
}
