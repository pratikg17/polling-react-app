import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";
import AddPoll from "./pages/Polls/AddPoll";
import MyPolls from "./pages/Polls/MyPolls";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/add-poll" exact component={AddPoll}></Route>
        <Route path="/my-polls" exact component={MyPolls}></Route>
        <Route path="/" exact component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
