import React, { Component } from "react";

import "./style.scss";
import SunImg from "../../resources/images/sun.png";

export default class Weather extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      cityName,
      temperature,
      weather_icon,
      weather_descriptions,
      is_day,
    } = this.props;

    return (
      <div className="weather-container">
        <div className="header">{cityName}</div>
        <div className="inner-container">
          <div className="image">
            <img src={weather_icon} />
          </div>
          <div className="current-weather">{temperature}*</div>
        </div>
        <div className="footer">{weather_descriptions}</div>
      </div>
    );
  }
}
