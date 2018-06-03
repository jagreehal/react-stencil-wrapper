import React from 'react';
import ReactDOM from 'react-dom';
import '@jagreehal/stencil-component/dist/stencil-app';
import { StencilComponentWrapper } from 'react-stencil-wrapper';
export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Jag',
      showStencilElement: true,
      events: [],
      methods: []
    };
  }

  handleToggle = e => {
    const name = e.target.name;
    console.log(name);
    this.setState({
      [name]: !this.state[name]
    });
  };

  handleClick = message => {
    this.setState({
      methods: [...this.state.events, message]
    });
  };

  handleEvent = e => {
    this.setState({
      events: [...this.state.events, e.detail]
    });
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
            id="nameInput"
            type="text"
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
          />
        </p>
        <div>
          <input
            id="showStencilElement"
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
            <h4>Events</h4>
            <ul id="events">
              {this.state.events.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
            <h4>Methods</h4>
            <ul id="methods">
              {this.state.methods.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
