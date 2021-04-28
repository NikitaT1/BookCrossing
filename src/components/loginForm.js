import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const LoginForm = () => {
  const [username, currentUserNameChange] = useState("");
  const [password, currentPasswordChange] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeName = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    //console.log(errorMessage);
    //if (errorMessage) setErrors(input.name);

    //currentUserNameChange(e.currentTarget.value);
    currentUserNameChange(input.value);
    //validateProperty
    //console.log(input);
  };

  const handleChangePassword = (e) => {
    currentPasswordChange(e.currentTarget.value);
  };

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const validationObj = { username, password };
    const result = Joi.validate(validationObj, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // if (currentUserName.trim() === "") errors.username = "Username is required";
    // if (currentUserPassword.trim() === "")
    //   errors.password = "Password is required";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  const validateProperty = ({ name, value }) => {
    const validationObj = { [name]: value };
    const schemaField = { [name]: schema[name] };
    const { error } = Joi.validate(validationObj, schemaField);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if (errors) return;
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={username}
          autoFocus={true}
          onChangeHook={handleChangeName}
          error={errors.username}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={password}
          autoFocus={false}
          onChangeHook={handleChangePassword}
          error={errors.password}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
