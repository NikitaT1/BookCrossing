import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const RegisterForm = () => {
  const [username, currentUsernameRegister] = useState("");
  const [password, currentPasswordRegister] = useState("");
  const [name, currentNameRegister] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegisterUserName = ({ currentTarget: input }) => {
    currentUsernameRegister(input.value);
  };

  const handleRegisterPassword = (e) => {
    currentPasswordRegister(e.currentTarget.value);
  };
  const handleRegisterName = (e) => {
    currentNameRegister(e.currentTarget.value);
  };

  const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const validate = () => {
    const validationObj = { username, password, name };
    const result = Joi.validate(validationObj, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
          value={username}
          autoFocus={true}
          onChangeHook={handleRegisterUserName}
          error={errors.username}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={password}
          autoFocus={false}
          onChangeHook={handleRegisterPassword}
          error={errors.password}
        />
        <Input
          name="name"
          label="Name"
          value={name}
          autoFocus={false}
          onChangeHook={handleRegisterName}
          error={errors.name}
        />
        <button disabled={validate()} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
