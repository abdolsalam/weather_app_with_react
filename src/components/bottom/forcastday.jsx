import React, { Component } from "react";

import "./style.scss";

export default class Forcastday extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { weather_icon, temperature, weather_descriptions } = this.props;

    return (
      <>
        <div className="forcastday-container">
          <div className="image">
            <img src={weather_icon} />
          </div>
          <div className="text">{temperature}*</div>
          <div className="text">{weather_descriptions}</div>
        </div>
      </>
    );
  }
}
