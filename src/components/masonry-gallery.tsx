"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define the structure for our gallery items
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string[];
}

export function MasonryGalleryComponent({
  galleryItems,
  categories,
}: {
  galleryItems: GalleryItem[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // {{ edit_1 }}

  const filteredItems = selectedCategory
    ? galleryItems.filter(
        (item) =>
          item.category.includes(selectedCategory) &&
          item.alt.toLowerCase().includes(searchTerm.toLowerCase()),
      ) // {{ edit_2 }}
    : galleryItems.filter((item) =>
        item.alt.toLowerCase().includes(searchTerm.toLowerCase()),
      ); // {{ edit_3 }}

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category filters */}
      <div className="mb-6 flex flex-wrap justify-start gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm} // {{ edit_5 }}
          onChange={(e) => setSearchTerm(e.target.value)} // {{ edit_6 }}
          className="rounded-full border border-gray-300 px-4 py-2" // {{ edit_7 }}
        />
        <button
          className={`rounded-full px-4 py-2 ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-4 py-2 ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry gallery */}
      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl"
            style={{
              gridRow: `span ${Math.ceil(Math.random() * 2)}`,
            }}
          >
            <Link href={`/img/${item.id}`}>
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end justify-start bg-black bg-opacity-50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded bg-primary px-2 py-1 text-sm font-semibold text-white">
                  {item.category.join(", ")}
                </span>
              </div>{" "}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
