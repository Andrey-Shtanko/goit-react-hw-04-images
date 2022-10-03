import { ImageGalleryItem } from './../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL }) => {
        return <ImageGalleryItem key={id} webformatURL={webformatURL} />;
      })}
    </Gallery>
  );
};
