import React, { Component } from "react";

import "./style.scss";
import Weather from "./weather";

import { Manager, Reference, Popper } from "react-popper";

export default class TopSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectLocatinOpen: false,
    };
  }

  onToggleSelectLocation() {
    this.setState((prevState) => ({
      isSelectLocatinOpen: !prevState.isSelectLocatinOpen,
    }));
  }

  onLocationNameChanged(e){
    this.setState({ locationName: e.target.value });
  }

  onSelectCity(){
    const { locationName } = this.state;
    const { eventEmitter } = this.props;

    eventEmitter.emit("updateWeather", locationName);
    this.onToggleSelectLocation();
  }

  render() {
    const { isSelectLocatinOpen } = this.state;
    const { eventEmitter } = this.props;

    return (
      <div className="top-container">
        <div className="title">Weather app</div>
        <Weather {...this.props} />

        <Manager>
          <Reference>
            {({ ref }) => {
              return (
                <button
                  className="btn btn-select-location"
                  ref={ref}
                  onClick={this.onToggleSelectLocation.bind(this)}
                >
                  Select location
                </button>
              );
            }}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) => {
              return (
                isSelectLocatinOpen && (
                  <div
                    className="popup-container"
                    ref={ref}
                    style={style}
                    data-placement={placement}
                  >
                    <div className="form-container">
                      <label htmlFor="location-name">Location naem</label>
                      <input
                        type="text"
                        id="location-name"
                        placeholder="City name"
                        onChange={this.onLocationNameChanged.bind(this)}
                      />
                      <button
                        className="btn btn-select-location"
                        onClick={this.onSelectCity.bind(this)}
                      >
                        Select
                      </button>
                    </div>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </div>
                )
              );
            }}
          </Popper>
        </Manager>
      </div>
    );
  }
}
