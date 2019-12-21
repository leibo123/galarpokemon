import React, { Component } from "react";

class RainbowHeader extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        colorIndex: 1,
        color: (localStorage.getItem('rainbowheader-color') !== null) ? localStorage.getItem('rainbowheader-color') : "orange"
      };
    }

    changeColor = () => {
        const colors = ["#ff4949", "orange", "yellow", "green", "#5677e6", "#b76eda"];
        this.setState({colorIndex: (this.state.colorIndex + 1) % 6})
        this.setState({color: colors[this.state.colorIndex]});
        localStorage.setItem('rainbowheader-color', colors[this.state.colorIndex]);
    }

    render() {
        return (
            <div className="rainbowHeader">
                <h1 className="unselectable" style={{color: this.state.color}}>{this.props.text}</h1>
            </div>
        )
    }
}

export default RainbowHeader;