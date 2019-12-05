import React, { Component } from "react";

class RainbowHeader extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        colorIndex: 1,
        color: "orange"
      };
    }

    changeColor = () => {
        const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
        this.setState({colorIndex: (this.state.colorIndex + 1) % 6})
        this.setState({color: colors[this.state.colorIndex]});
    }

    render() {
        return (
            <div className="rainbowHeader" onClick={this.changeColor}>
                <h1 style={{color: this.state.color}}>{this.props.text}</h1>
            </div>
        )
    }
}

export default RainbowHeader;