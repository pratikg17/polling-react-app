import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/" exact component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
