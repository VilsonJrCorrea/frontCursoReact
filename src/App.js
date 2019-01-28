import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Movies from "./components/movies";
import "./App.css";
import NavBar from "./components/common/navBar"
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import Login from "./components/login"
import Register from "./components/formRegister";
import newMovie from "./components/newMovie";
import 'react-toastify/dist/ReactToastify.css'
import Logout from "./components/logout";
import auth from "./services/authService"
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user={user}/>

                <main className="container">
                    <Switch>
                        <ProtectedRoute path="/movies/:id" component={newMovie}></ProtectedRoute>
                        <Route path="/movies" render={props => <Movies{...props} user={user}/>}></Route>
                        <Route path="/customers" component={Customers}></Route>
                        <Route path="/rentals" component={Rentals}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <Route path="/not-found" component={NotFound}></Route>
                        <Redirect from="/" exact to="/movies"></Redirect>
                    </Switch>
                </main>
            </React.Fragment>

        );
    }
}

export default App;
