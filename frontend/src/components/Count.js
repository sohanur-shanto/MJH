import React, { Component } from "react";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "January, 10, 2030" };
  }
  render() {
    return (
      <div className="App">
        <br />
        <div className="App-date">{this.state.deadline}</div>
        <Clock deadline={this.state.deadline} />
        <br />
        <br />
      </div>
    );
  }
}
export default App;
