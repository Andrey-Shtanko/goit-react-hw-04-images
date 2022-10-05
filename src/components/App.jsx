import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Modal } from '@mui/material';
// import { ModalWindow } from './Modal/Modal';
import { ModalBox, Overlay, ModalImg } from './Modal/Modal.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    largeImage: {
      url: null,
      tags: null,
    },
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== 1) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetch(
          `https://pixabay.com/api/?key=29357448-0203ad34ff6f16514b0291a92&q=${this.state.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
        ).then(response => response.json());
        this.setState(({ images }) => ({ images: [...images, ...hits] }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.query !== this.state.query) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetch(
          `https://pixabay.com/api/?key=29357448-0203ad34ff6f16514b0291a92&q=${this.state.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1`
        ).then(response => response.json());
        this.setState({ images: hits });
        this.setState({ page: 1 });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onSubmit = query => {
    this.setState({ query });
  };
  onImageClick = (url, tags) => {
    this.setState({ largeImage: { url, tags } });
  };
  onHandleClose = () => {
    this.setState({ largeImage: { url: null, tags: null } });
  };
  onChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 1 && (
          <ImageGallery
            images={this.state.images}
            onImageClick={this.onImageClick}
          />
        )}
        {this.state.images.length > 1 && (
          <Button onChangePage={this.onChangePage} />
        )}
        {this.state.largeImage.url && (
          <Modal open={true} onClose={this.onHandleClose}>
            <Overlay onClick={this.onHandleClose}>
              <ModalBox>
                <ModalImg
                  src={this.state.largeImage.url}
                  alt={this.state.largeImage.tags}
                />
              </ModalBox>
            </Overlay>
          </Modal>
        )}
      </Container>
    );
  }
}
