import React from 'react'
import Form from "./common/form";
import Joi from "joi-browser";
import {register} from "../services/registerService";
import auth from "../services/authService";

class Register extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = "/";
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
            }
        }
    };

    render() {
        return (
            <div>
                <h1 className="container">Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', "Password", 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
};
export default Register;