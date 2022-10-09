import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Header,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
    searchImputReset();
  };

  const searchImputReset = () => {
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          onChange={handleChange}
          name="query"
          value={query}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };
//   handleChange = event => {
//     this.setState({ query: event.currentTarget.value });
//   };
//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state.query);
//     this.searchImputReset();
//   };

//   searchImputReset = () => {
//     this.setState({
//       query: '',
//     });
//   };
//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <SearchButtonLabel>Search</SearchButtonLabel>
//           </SearchButton>

//           <SearchInput
//             onChange={this.handleChange}
//             name="query"
//             value={this.state.query}
//             type="text"
//             autocomplete="off"
//             placeholder="Search images and photos"
//           />
//         </Form>
//       </Header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
