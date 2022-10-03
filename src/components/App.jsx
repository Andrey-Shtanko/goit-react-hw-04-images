import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetch(
          `https://pixabay.com/api/?key=29357448-0203ad34ff6f16514b0291a92&q=${this.state.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1`
        ).then(response => response.json());
        this.setState({ images: hits });
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
  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && <div>Loading...</div>}
        {this.state.images.length > 1 && (
          <ImageGallery images={this.state.images} />
        )}
      </Container>
    );
  }
}
