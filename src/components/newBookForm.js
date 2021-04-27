import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../store/booksReducer";
import { loadGenres } from "../store/genresReducer";
import Joi from "joi-browser";
import Input from "./common/input";
import Select from "./common/select";

const NewBookForm = ({ match, history }) => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres.list);

  useEffect(() => {
    dispatch(loadGenres());
  }, []);

  const [title, titleSet] = useState("");
  const [genreId, genreIdSet] = useState("");
  const [numberInStock, numberInStockSet] = useState("");
  const [dailyRentalRate, dailyRentalRateSet] = useState("");
  const [errors, setErrors] = useState({});

  const handleTitleSet = ({ currentTarget: input }) => {
    titleSet(input.value);
  };

  const handleGenreIdSet = (e) => {
    genreIdSet(e.currentTarget.value);
  };
  const handleNumberInStockSet = (e) => {
    numberInStockSet(e.currentTarget.value);
  };
  const handleDailyRentalRateSet = (e) => {
    dailyRentalRateSet(e.currentTarget.value);
  };

  const schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number().required().label("Number in Stock"),
    dailyRentalRate: Joi.number().required().label("Rate"),
  };

  const validate = () => {
    const validationObj = { title };
    const result = Joi.validate(validationObj, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if (errors) return;
    dispatch(
      addBook(
        e.currentTarget.title.value,
        e.currentTarget.genreId.value,
        e.currentTarget.numberInStock.value,
        e.currentTarget.dailyRentalRate.value
      )
    );
    history.push("/books");
  };

  return (
    <div>
      <h1>New Book</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          defaultValue={title}
          autoFocus={true}
          onChange={handleTitleSet}
          error={errors.username}
        />
        <Select
          name="genreId"
          label="Genre"
          value={genreId}
          options={genres}
          onChange={handleGenreIdSet}
          error={errors.password}
        />
        <Input
          name="numberInStock"
          label="Number in Stock"
          defaultValue={numberInStock}
          onChange={handleNumberInStockSet}
          error={errors.name}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          defaultValue={dailyRentalRate}
          onChange={handleDailyRentalRateSet}
          error={errors.name}
        />
        <button className="btn btn-primary">Add book</button>
      </form>
    </div>
  );
};

export default NewBookForm;
