import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";
import { ImageModalContent } from "~/components/image-modal-content";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid ID");
  return (
    <Modal>
      {/* <FullPageImageView id={idAsNumber} /> */}
      <div className="flex h-full w-full items-center justify-center">
        <ImageModalContent id={idAsNumber} />
      </div>
    </Modal>
  );
}
