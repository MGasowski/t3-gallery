// "use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getImage } from "~/server/queries";

export async function ImageModalContent(props: { id: number }) {
  // Placeholder data
  const imageDetails = {
    title: "Sunset at the Beach",
    author: "Jane Doe",
    description: "A beautiful sunset captured at a tropical beach.",
    likes: 1234,
    date: "2023-07-10",
  };

  const comments = [
    {
      id: 1,
      author: "John Smith",
      text: "Absolutely stunning! The colors are amazing.",
      avatar: "/avatar1.png",
    },
    {
      id: 2,
      author: "Emily Brown",
      text: "I wish I was there right now. Gorgeous shot!",
      avatar: "/avatar2.png",
    },
    {
      id: 3,
      author: "Michael Johnson",
      text: "The composition is perfect. Well done!",
      avatar: "/avatar3.png",
    },
  ];
  const image = await getImage(props.id);

  return (
    <div className="flex h-full max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-lg bg-slate-200 text-black">
      {" "}
      {/* Changed bg-background to bg-black */}
      <div className="relative h-full w-2/3 bg-slate-300">
        {" "}
        {/* Added bg-black to the image container */}
        <Image
          src={image.url}
          alt={imageDetails.title}
          layout="fill"
          objectFit="contain"
          className="rounded-l-lg"
        />
      </div>
      <div className="flex w-1/3 flex-col bg-white p-4">
        {" "}
        {/* Added bg-white to the column */}
        <h2 className="mb-2 text-2xl font-bold">{imageDetails.title}</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          By {imageDetails.author} on {imageDetails.date}
        </p>
        <p className="mb-4 text-sm">{imageDetails.description}</p>
        <p className="mb-4 text-sm font-semibold">{imageDetails.likes} likes</p>
        <h3 className="mb-2 text-lg font-semibold">Comments</h3>
        <ScrollArea className="flex-grow">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{comment.author}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
