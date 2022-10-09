import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalWindow } from './Modal/Modal';
import { response } from './../services/imageApi';

export const App = () => {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [largeImageTags, setLargeImageTags] = useState(null);

  useEffect(() => {
    if (query === null) {
      return;
    }
    async function fetchData() {
      try {
        setIsLoading(true);
        const { hits } = await response(query, page);
        setImages(prevState => [...prevState, ...hits]);
      } catch (error) {
        console.log(error);
        return alert(`Sorry, please try again`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, query]);

  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };
  const onImageClick = (url, tags) => {
    setLargeImageUrl(url);
    setLargeImageTags(tags);
  };
  const onHandleClose = () => {
    setLargeImageUrl(null);
    setLargeImageTags(null);
  };
  const onChangePage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {images.length > 1 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {images.length > 1 && <Button onChangePage={onChangePage} />}
      {largeImageUrl && (
        <ModalWindow
          onHandleClose={onHandleClose}
          url={largeImageUrl}
          tags={largeImageTags}
        />
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     largeImage: {
//       url: null,
//       tags: null,
//     },
//   };

// onFetch = async () => {
//   try {
//     this.setState({ isLoading: true });
//     const { hits } = await response(this.state.query, this.state.page);
//     this.setState(prevState => ({
//       images: [...prevState.images, ...hits],
//     }));
//   } catch (error) {
//     console.log(error);
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
// this.setState({ images: [] });
// this.onFetch();

//       return;
//     }
//     if (
//       prevState.query === this.state.query &&
//       prevState.page !== this.state.page
//     ) {
//       this.onFetch();
//     }
//   }
//   onSubmit = query => {
//     this.setState({ query });
//     this.setState({ page: 1 });
//   };
//   onImageClick = (url, tags) => {
//     this.setState({ largeImage: { url, tags } });
//   };
//   onHandleClose = () => {
//     this.setState({ largeImage: { url: null, tags: null } });
//   };
//   onChangePage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     return (
//       <Container>
//         <Searchbar onSubmit={this.onSubmit} />
//         {this.state.isLoading && <Loader />}
//         {this.state.images.length > 1 && (
//           <ImageGallery
//             images={this.state.images}
//             onImageClick={this.onImageClick}
//           />
//         )}
//         {this.state.images.length > 1 && (
//           <Button onChangePage={this.onChangePage} />
//         )}
//         {this.state.largeImage.url && (
//           <ModalWindow
//             onHandleClose={this.onHandleClose}
//             url={this.state.largeImage.url}
//             tags={this.state.largeImage.tags}
//           />
//         )}
//       </Container>
//     );
//   }
// }
