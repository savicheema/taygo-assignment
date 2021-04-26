import React from "react";
import styles from "./form-input.module.css";

import { TextField, InputAdornment } from "@material-ui/core";

import { capitalize } from "../utils";

class FormInput extends React.Component {
  render() {
    const { inputValue, isError } = this.state;

    return (
      <div className={styles.formInput}>
        <TextField
          placeholder={this.props.placeholder}
          label={this.props.name}
          className={styles.textField}
          classes={{ root: styles.root }}
          InputLabelProps={{ className: styles.label }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {<this.props.icon ref={this.iconRef} />}
              </InputAdornment>
            ),
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          error={isError}
          helperText={capitalize(this.getHelperText())}
          value={inputValue}
          onChange={this.updateValue}
          inputProps={{ value: inputValue, ref: this.inputRef }}
        />
      </div>
    );
  }
  constructor() {
    super();
    let inputValue = "";
    let isError = false;
    this.state = { inputValue, isError };
    this.inputRef = React.createRef();
    this.iconRef = React.createRef();
  }

  updateValue = (e) => {
    console.log(e.target.value);

    const { isError } = this.state;
    if (e.target.value && isError) {
      this.setState({ isError: false });
      this.iconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
    }

    this.setState({ inputValue: e.target.value });
  };

  onFocus = () => {
    const { isError } = this.state;

    if (isError) return;
    this.iconRef.current.style.color = "rgba(0, 214, 123, 0.9)";
  };

  onBlur = () => {
    const { inputValue } = this.state;
    const { regex } = this.props;

    if (inputValue && regex.test(inputValue)) {
      this.setState({ isError: false }, () => {
        this.iconRef.current.style.color = "#ddd";
      });
      return;
    }

    this.setState({ isError: true });
    this.iconRef.current.style.color = "red";
  };

  getHelperText = () => {
    const { isError, inputValue } = this.state;

    if (!isError) return "";

    let helperText;
    switch (inputValue) {
      case "": {
        helperText = `${this.props.name} is required`;
        break;
      }
      default: {
        const { name, regex } = this.props;

        if (!regex.test(inputValue)) {
          helperText = `${name} is not valid`;
          return helperText;
        }
      }
    }

    return helperText;
  };
}

export default FormInput;
