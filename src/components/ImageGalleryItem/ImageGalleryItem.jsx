import { GalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt="" />
    </GalleryItem>
  );
};
