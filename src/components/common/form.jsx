import React, {Component} from 'react'
import Joi from "joi-browser";
import Input from "./input";
import InputState from "./inputState";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    handleSubmit = event => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    };

    validate = () => {
        const options = {abortEarly: false,};
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    renderInput(name, label, type = 'text') {
        const {data, errors} = this.state;

        return (<Input name={name}
                       type={type}
                       value={data[name]}
                       label={label}
                       onChange={this.handleChange}
                       error={errors[name]}
        />);
    }

    renderList(name, label, list) {
        const {data, errors} = this.state;
        return (
            <InputState
                name={name}
                value={data[name]}
                label={label}
                list={list}
                onChange={this.handleChange}
                error={errors[name]}
            />)
    };

    renderButton(label) {
        return (<button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>)
    };

}

export default Form;