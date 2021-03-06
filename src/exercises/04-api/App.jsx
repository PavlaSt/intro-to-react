import React from 'react';

import {SearchButtons} from './SearchButtons';
import {SearchInput} from './SearchInput';
import {Results} from './Results';
import {ResultItem} from './ResultsItem';

import '../../index.css';

/**
 * Cvičení:
 *  
 * - změňtě implementaci handleSearchClick metody tak, aby volala fetchResultsFromAPI
 * - do stavu do proměnné "loading" nastavte true při začátku stahování dat (a také null do proměnné erro) poté,
 *   co je stahování dokončeno, nastavte do "loading" hodnotu false
 * - uložte hodnotu z odpovědi do stavu do proměnné "results"
 * - obalte vnitřek metody handleSearchClick do `try { } catch (error) { }` bloku
 * - pokud se při stahování něco nepovede (v catch bloku) nastavte do stavu do proměnné "error" popis chyby (error.message)
 * - předejte "loading" a "error" ze stavu jako propsy do komponenty Results
 * 
 * - vyzkoušejte :)
 * 
 *  Poznámka: komponenta Results je v našem případě kontrolovaná komponenta
 *  */

const fetchResultsFromAPI = async () => {
  const response = await fetch('https://myslenkynezastavis.cz?searchQuery=abc');
  const result = await response.json();

  return result;
}

export class App extends React.Component {
  state = {
    searchQuery: '',
    loading: false,
    error: null,
    results: []
  };

  handleInputChange = (text) => {
    this.setState({searchQuery: text});
  };

  handleSearchClick = async () => {
    // TODO
  };

  render() {
    const {searchQuery, results} = this.state;

    return (
      <div className="App">
        <header>
          <img alt="Logo" />
          <span>Gmail</span>
        </header>
        <div>
          <div>
            <div className="logo"></div>
            <SearchInput onChange={this.handleInputChange} searchQuery={searchQuery} />
            <SearchButtons onSearch={this.handleSearchClick} />
          </div>
        </div>
        <Results searchQuery={searchQuery} loading={/* TODO */} error={/* TODO */}>
          {results.map((result) => {
            return <ResultItem key={result.link}
                link={result.link}
                title={result.title}
                description={result.description}
              />
          })}
        </Results>
      </div>
    );
  }
}
