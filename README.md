### React Stencil Wrapper

[![Greenkeeper badge](https://badges.greenkeeper.io/jagreehal/react-stencil-wrapper.svg)](https://greenkeeper.io/)

This module enables you to easily wrap [Stencil](https://stenciljs.com/) components in React apps, taking full advantage of life cycle hooks so events are added and removed whenever a React component is mounted and unmounted.

Example usage where 'st-button' is a Stencil component:

```jsx
import { StencilComponentWrapper } from './react-stencil-wrapper';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Jag'
    };
  }

  handleClick = message => {
    console.log(message);
  };

  handleEvent = e => {
    console.log('handled event', e);
  };

  render() {
    return (
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
        </StencilComponentWrapper>;
    )
  }
}
```
