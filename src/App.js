import React, { Component } from 'react';
import './assets/scss/styles.scss';
import MainContent from './Components/MainContent';

class App extends Component {
  render() {
    return (
      <div className="App">
          <aside>
              <h3>dairy app</h3>
              <span>Comment with no sense</span>
          </aside>
          <main>
            <MainContent />
          </main>
      </div>
    );
  }
}

export default App;
