
import React, { Component } from "react";
import TodoItem from "./components/Items/Item";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTodo: [],
      itemTodo: {
        content: "",
      },
    };
  }

  // URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  URL = "https://basicposdemo.herokuapp.com";

  componentDidMount() {
    console.log("dsdsa");
    console.log(process.env.REACT_APP_API_URL);
    axios
      .get(this.URL + "all")
      .then((res) => {
        this.setState({ listTodo: res.data });
      })
      .catch((e) => {
        console.log(e + " ");
      });
  }

  handleAdd = () => {
    const data = { ...this.state.itemTodo };
    axios
      .post(this.URL + "add", data)
      .then((res) => {
        const newListTodo = [res.data, ...this.state.listTodo];
        this.setState({ listTodo: newListTodo, itemTodo: { content: "" } });
      })
      .catch((e) => console.log(e + " "));
  };

  handleCheckComplete = (id) => {
    console.log(id);
    axios
      .put(this.URL + `completed/${id}`)
      .then(() => {
        const listTodo = [...this.state.listTodo];
        const index = listTodo.findIndex((i) => {
          return i._id === id;
        });
        const todo = { ...listTodo[index], completed: true };
        listTodo[index] = todo;

        this.setState({ listTodo }, () => console.log(this.state.listTodo));
      })
      .catch((e) => console.log(e + " "));
  };

  handleDelTodo = (id) => {
    axios
      .delete(this.URL + `del/${id}`)
      .then(() => {
        const listTodo = [...this.state.listTodo];
        const newListToDo = listTodo.filter((i) => i._id !== id);
        this.setState({ listTodo: newListToDo }, () => console.log(this.state));
      })
      .catch((e) => {
        console.log(e + " ");
      });
  };

  handleGetAll = () => {
    axios
      .get(this.URL + "all")
      .then((res) => {
        this.setState({ listTodo: res.data });
      })
      .catch((e) => {
        console.log(e + " ");
      });
  };
  handleGetCom = () => {
    axios
      .get(this.URL + "all?completed=true")
      .then((res) => {
        this.setState({ listTodo: res.data });
      })
      .catch((e) => {
        console.log(e + " ");
      });
  };
  handleGetNotCom = () => {
    axios
      .get(this.URL + "all?completed=false")
      .then((res) => {
        this.setState({ listTodo: res.data });
      })
      .catch((e) => {
        console.log(e + " ");
      });
  };

  render() {
    const items = this.state.listTodo.map((i) => (
      <TodoItem
        key={i._id}
        content={i.content}
        completed={i.completed}
        clickCheck={() => this.handleCheckComplete(i._id)}
        clickDel={() => this.handleDelTodo(i._id)}
      />
    ));
    return (
      <div className="App">
        <h1>TOM APP</h1>
        <div style={{ marginBottom: "30px" }}>
          <input
            className="inputCont"
            type="text"
            value={this.state.itemTodo.content}
            onChange={(e) =>
              this.setState({ itemTodo: { content: e.target.value } })
            }
            placeholder="Add TODO Item.."
          ></input>
          <button onClick={this.handleAdd}>Add</button>
        </div>
        <div
          style={{
            display: this.state.listTodo.length > 0 ? "block" : "none",
          }}
          className="btn"
        >
          <button onClick={() => this.handleGetAll()}>All</button>
          <button onClick={() => this.handleGetCom()}>Completed</button>
          <button onClick={() => this.handleGetNotCom()}>Not Completed</button>
        </div>
        <div className="App_content">
          {items.length > 0 ? items : <p>Dont have any item. Pls add</p>}
        </div>
      </div>
    );
  }
}

export default App;
