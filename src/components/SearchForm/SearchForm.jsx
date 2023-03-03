import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    input: '',
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onFormSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.onInputChange}
          value={this.state.input}
        />
      </SearchFormStyled>
    );
  }
}
