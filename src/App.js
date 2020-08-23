import React from 'react';
import './App.css';

// API FOR QUOTES
const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends React.Component {
  state = {
    quotes: [{
      quote: "This is a sample quote.",
      author: "Somebody"
    }],
    index: 0, // quote index in API
    color: '#16a085'
  }

  componentDidMount = () => {
    //call API and update state
    fetch(API).then(res => res.json())
    .then(res => {
      this.setState({
        quotes: res.quotes
      }, this.getRandomIndex)
    })
  }

  // update
  componentDidUpdate = () => {
    setTimeout(console.log("change"), 500)
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length)
      this.setState({
        index
      })
      this.getRandomColor();
    }
  }

  // color setter
  getRandomColor = () => {
    const { quotes } = this.state;

    var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

    if (quotes.length > 0) {
      const randCol = Math.floor(Math.random() * colors.length)
      this.setState({
        color: colors[randCol]
      })
    }
  }

  render () {

    const { quotes, index } = this.state;

    const quote = quotes[index];

    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;

    document.body.style = `background: ${this.state.color};`;

    return (
      <div className="wrapper d-flex justify-content-center vh-100 align-items-center">
        <div className="col-4 box p-5 rounded shadow-lg" id="quote-box">
          {
            quote &&
            <div className="mb-4">
              <h5 id="text" style={{color: this.state.color}}>
                <i className="fa-2x fa fa-quote-left" style={{color: this.state.color}} aria-hidden="true"></i>
                {quote.quote}
              </h5>
              <cite id="author" className="d-block text-right" style={{color: this.state.color}}>- {quote.author}</cite>
            </div>           
          }

          <div id="buttons" className="d-flex justify-content-between">
            
            <a id="tweet-quote" className="btn btn-primary btn-m shadow" href={tweetURL} target="_blank"> <i className="fa fa-twitter" aria-hidden="true"></i> Tweet this</a>
            <button id="new-quote" className="btn btn-primary btn-m shadow" onClick={this.getRandomIndex}> <i className="fa fa-random" aria-hidden="true"></i> Get Quote</button>

          </div>

        </div>
      </div>
    )
  }
}

export default App;
