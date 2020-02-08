import React, { Component } from "react";
import { Container, Grid, Modal } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ResultTable from "./ResultTable";
import DetailsSegment from "./DetailsSegment";
import styles from "./Styles";

const { StyledGrid, CenteredRow, JumboRed, FullWidthSearch, Header } = styles;

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      hasError: false,
      searchResults: [],
      searchIsLoading: false,
      selectedId: null,
      isDetails: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.selectObject = this.selectObject.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.formatForSearch = this.formatForSearch.bind(this);
  }

  closeModal() {
    this.setState({ isDetails: false });
  }

  selectObject(id) {
    this.setState({ selectedId: id, isDetails: true });
  }

  formatForSearch = results => {
    return results.map(res => {
      return {
        title: res.title,
        image: res.primaryImageSmall,
        link: res.objectURL,
        id: res.objectID
      };
    });
  }

  newSearch = _.debounce(() => {
    const promise = axios.post("http://localhost:8080/search", {
      q: this.state.query
    });
    promise.then(response => {
      const isCorrectResponse =
        JSON.parse(response.config.data).q === this.state.query;

      this.setState({
        hasError: this.state.query && response.data.length === 0,
        searchIsLoading: false,
        searchResults: isCorrectResponse
          ? response.data
          : this.state.searchResults,
      });
    });
    promise.catch(error => {
      console.log(error);
    });
  }, 1000);

  handleSearchChange(e) {
    this.setState(
      { query: e.target.value, searchIsLoading: true, hasError: false },
      () => this.newSearch()
    );
  }

  render() {
    const selectedData =
      this.state.searchResults.find(
        art => art.objectID === this.state.selectedId
      ) || {};
    return (
      <Container>
        <StyledGrid>
          <CenteredRow>
            <Grid.Column width={10}>
              <JumboRed>
                <Header>The Metropolitan Museum of Collection</Header>
                <p>
                  Experience 5,000 Years of Art at The Met! Tell us what you are
                  looking for and we will find it for you.
                </p>
                <FullWidthSearch
                  loading={this.state.searchIsLoading}
                  icon="search"
                  placeholder="What is inspiring you now?"
                  value={this.state.query}
                  onChange={e => this.handleSearchChange(e)}
                />
                {this.state.hasError && (
                  <p>No results for "{this.state.query}" :( </p>
                )}
              </JumboRed>
            </Grid.Column>
          </CenteredRow>
          {this.state.searchResults.length !== 0 && (
            <React.Fragment>
              <ResultTable
                selectObject={this.selectObject}
                results={this.formatForSearch(this.state.searchResults)}
              />
              <Modal basic size="small" open={this.state.isDetails}>
                <DetailsSegment data={selectedData} close={this.closeModal} />
              </Modal>
            </React.Fragment>
          )}
        </StyledGrid>
      </Container>
    );
  }
}

export default App;
