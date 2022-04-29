import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";
import AddPoll from "./pages/Polls/AddPoll";
import MyPolls from "./pages/Polls/MyPolls";
import EditPoll from "./pages/Polls/EditPoll";
import CastVote from "./pages/Vote/CastVote";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute
          path="/my-polls"
          exact
          component={MyPolls}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/add-poll"
          exact
          component={AddPoll}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/edit-poll/:pollId"
          exact
          component={EditPoll}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/cast-vote/:pollId"
          exact
          component={CastVote}
        ></ProtectedRoute>
        <Route path="/" exact component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
