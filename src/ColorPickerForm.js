import React from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

function ColorPickerForm(props) {
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
      />
      <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
        <TextValidator
          name="colorName"
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
          style={{ backgroundColor: currentColor }}
          type="submit"
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
