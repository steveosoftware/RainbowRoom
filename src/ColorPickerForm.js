import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

const useStyles = makeStyles({
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "7rem",
  },
});

function ColorPickerForm(props) {
  const classes = useStyles();

  const {
    currentColor,
    updateCurrentColor,
    addNewColor,
    paletteIsFull,
    name,
    handleChange,
  } = props;

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          placeholder="Color Name"
          name="colorName"
          variant="filled"
          margin="normal"
          value={name.colorName}
          onChange={handleChange}
          validators={["required", "isColorUnique", "isColorNameUnique"]}
          errorMessages={[
            "this field is required",
            "color must be unique",
            "color name must be unique",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.addColor}
          disabled={paletteIsFull}
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor,
          }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
