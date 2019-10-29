import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Item from "./Item";

export class App extends React.Component {
  state = {
    items: [],
    isLoading: false,
    enableButton: false,
    minComments: 0
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({
      isLoading: true
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        this.setState({
          items: data.children,
          isLoading: false
        });
      });
  };

  update = () => {
    this.setState({
      enableButton: !this.state.enableButton
    });
    if (this.state.enableButton) {
      clearInterval(this.autoRefresh);
    } else {
      this.autoRefresh = setInterval(this.getItems, 3000);
    }
  };

  updateMinComments = event => {
    this.setState({
      minComments: +event.target.value
    });
  };

  render() {
    const { items, isLoading, enableButton, minComments } = this.state;
    const itemSort = items
      .filter(item => item.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments);
    return (
      <div>
        <h1>Top commented</h1>
        <p>Current filter: {minComments}</p>
        <button onClick={this.update}>
          {enableButton ? "Stop auto-refresh" : "Start auto-refresh"}
        </button>
        <input
          type="range"
          value={minComments}
          min={0}
          max={100}
          step={1}
          onChange={this.updateMinComments}
        />
        {isLoading ? (
          <p>...Loading</p>
        ) : itemSort.length > 0 ? (
          itemSort.map(item => <Item key={item.data.id} data={item.data} />)
        ) : (
          <p>No results</p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
