import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TopMenu from "./components/TopMenu";
import LandingPage from "./components/LandingPage";
import Products from "./components/products/Products";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";


function App() {
  return (
    <Router>
      <div>
        <TopMenu />
        <div style={{ paddingTop: "50px " }}>
        <Switch>
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/products" component={Products} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={LandingPage} />
          <Redirect to="/not-found" />
        </Switch>
        <h1>XYZ Shop</h1>
        </div>
      </div>
    </Router>
  );
}

export default App;
