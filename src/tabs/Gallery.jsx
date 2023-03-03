import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    gallery: [],
    page: 1,
    isVisible: false,
    isLoading: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImageList(this.state.query, this.state.page);
    }
  };

  getImageList = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const {
        page: newPage,
        per_page,
        photos,
        total_results,
      } = await ImageService.getImages(query, page);
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prev => ({
        gallery: [...prev.gallery, ...photos],
        isVisible: newPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.log('error :>> ', error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = userInput => {
    this.setState({
      query: userInput,
      gallery: [],
      page: 1,
      isVisible: false,
      isLoading: false,
      isEmpty: false,
      error: null,
    });
  };

  loadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { gallery, isVisible, isLoading, isEmpty, error } = this.state;
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        <Grid>
          {gallery.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isVisible && (
          <Button onClick={this.loadMore}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {error && (
          <Text textAlign="center">
            Something went wrong. Try again later.😭
          </Text>
        )}
      </>
    );
  }
}
