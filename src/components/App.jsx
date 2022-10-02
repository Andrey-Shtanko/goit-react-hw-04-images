import { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    images: [],
  };
  render() {
    return <Container>hello world</Container>;
  }
}
