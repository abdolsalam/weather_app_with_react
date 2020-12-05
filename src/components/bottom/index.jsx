import React, { Component } from "react";

import Forcastday from "./forcastday";
import "./style.scss";

export default class BottomSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { forecastdays } = this.props;

    return (
      <div className="bottom-container">
        <div className="inner-container">
          {forecastdays &&
            forecastdays.map((day, index) => {
              return <Forcastday key={index} {...day} />;
            })}
        </div>
      </div>
    );
  }
}
