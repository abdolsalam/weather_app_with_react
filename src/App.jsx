import React, { Component } from "react";
import "./sass/style.scss";
import TopSection from "./components/top";
import BottomSection from "./components/bottom";
import axios from "axios";

const WEATHER_KEY = "dfcec918c8e8b052e29a20751ff049a1";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "Zahedan",
      forcastDays: 5,
      isLoading: true,
    };
  }

  updateWeather = () => {
    const { cityName, forcastDays } = this.state;

    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&forecast_days = ${forcastDays}`;

    axios
      .get(URL)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          isLoading: false,
          cityName: data.location.name,
          temperature: data.current.temperature,
          weather_icon: data.current.weather_icons,
          weather_descriptions: data.current.weather_descriptions,
          is_day: data.current.is_day,
          forecastdays: [
            { weather_icon: "", temperature: 15, weather_descriptions: "cloudy" },
            { weather_icon: "", temperature: 16, weather_descriptions: "cloudy" },
            { weather_icon: "", temperature: 17, weather_descriptions: "sunny" },
            { weather_icon: "", temperature: 15, weather_descriptions: "rainy" },
            { weather_icon: "", temperature: 12, weather_descriptions: "rainy" },
          ],
        });
      })
      .catch((err) => {
        if (err) {
          console.error("Cannot fetch data from API, ", err);
        }
      });
  };

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      this.setState({ cityName: data, isLoading: true }, () =>
        this.updateWeather()
      );
    });
  }

  render() {
    const { isLoading, forecastdays } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading ? (
            <h3>Loading ...</h3>
          ) : (
            <div className="top-section">
              <TopSection
                {...this.state}
                eventEmitter={this.props.eventEmitter}
              />
            </div>
          )}
          <div className="bottom-section">
            <BottomSection forecastdays={forecastdays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;