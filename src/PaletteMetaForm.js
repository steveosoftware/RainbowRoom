import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function PaletteMetaForm(props) {
  const [open] = React.useState(true);

  const { name, handleChange, handleSubmit, hideForm } = props;

  return (
    <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(name.paletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new color palette. Make sure it's
            unique!
          </DialogContentText>
          <Picker />
          <TextValidator
            name="paletteName"
            value={name.paletteName}
            label="Palette Name"
            onChange={handleChange}
            fullWidth
            margin="normal"
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter palette name", "Name already taken"]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default PaletteMetaForm;
