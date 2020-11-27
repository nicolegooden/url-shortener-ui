import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  //Travis CI rocks

  componentDidMount() {
    getUrls().then((urls) => this.setState({urls: urls.urls}))
  }

  addURL = (longURL, title) => {
    postUrl(longURL, title).then((newUrl) => this.setState({urls: [...this.state.urls, newUrl]}))
  }

  removeUrl = (id) => {
    deleteUrl(id).then(() => {
      getUrls().then((urls) => this.setState({urls: urls.urls}))
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addURL={this.addURL}/>
        </header>
        <UrlContainer 
          urls={this.state.urls}
          removeUrl={this.removeUrl}
        />
      </main>
    );
  }
}

export default App;
