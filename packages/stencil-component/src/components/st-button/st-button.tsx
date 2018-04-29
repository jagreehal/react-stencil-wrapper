import { Component, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'st-button',
  shadow: true
})
export class StButton {
  @Event() buttonClicked: EventEmitter;

  @Prop() name: string;
  @Prop() clickEvent: Function;

  @State() greeting: string = 'Hello';

  textHandler = e => {
    this.greeting = e.target.value;
  };

  clickHandler = () => {
    const message = `${this.greeting} ${this.name}`;
    this.clickEvent(message);
    this.buttonClicked.emit(message);
  };

  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  componentDidLoad() {
    console.log('The component has been rendered');
  }

  componentWillUpdate() {
    console.log('The component will update');
  }

  componentDidUpdate() {
    console.log('The component did update');
  }

  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }

  render() {
    return (
      <div>
        <p>
          <label>Greeting </label>
          <input
            type="text"
            value={this.greeting}
            onChange={this.textHandler}
          />{' '}
          - {this.name}
        </p>

        <button onClick={this.clickHandler}>
          <slot />
        </button>
      </div>
    );
  }
}
