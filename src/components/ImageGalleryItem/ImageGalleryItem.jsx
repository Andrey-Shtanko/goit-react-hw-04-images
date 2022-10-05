import { GalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
  tags,
}) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    </GalleryItem>
  );
};
