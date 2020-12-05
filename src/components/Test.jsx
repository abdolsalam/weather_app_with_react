import React from "react";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { name: "a", family: "aa", age: 1 },
        { name: "b", family: "bb", age: 2 },
        { name: "c", family: "cc", age: 3 },
      ],
    };
  }

  render() {
    const { persons } = this.state;

    const elem = persons.map((person, index) => {
      return <h2>{person.name}</h2>;
    });

    return <>{elem}</>;
  }
}
