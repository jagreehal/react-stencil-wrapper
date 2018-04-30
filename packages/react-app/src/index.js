import React from 'react';
import ReactDOM from 'react-dom';
import '@jagreehal/stencil-component/dist/stencil-app';
import { StencilComponentWrapper } from 'react-stencil-wrapper';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Jag',
      showStencilElement: true
    };
  }

  handleToggle = e => {
    const name = e.target.name;
    this.setState({
      name: !this.state[name]
    });
  };

  handleClick = message => {
    console.log(message);
  };

  handleEvent = e => {
    console.log('handled event', e);
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <p>
          <label>Name </label>
          <input
            type="text"
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
          />
        </p>
        <div>
          <input
            type="checkbox"
            name="showStencilElement"
            onChange={this.handleToggle}
            checked={this.state.showStencilElement}
          />
          <label>Show/Hide</label>
        </div>

        <hr />
        {this.state.showStencilElement ? (
          <div>
            <StencilComponentWrapper
              name={this.state.name}
              clickEvent={this.handleClick}
              eventListeners={{
                buttonClicked: this.handleEvent
              }}
              componentDidMountCallback={el => {
                el.focus();
              }}
            >
              <st-button>Click Me</st-button>
            </StencilComponentWrapper>
            <hr />
          </div>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('app')
);

module.hot.accept();
