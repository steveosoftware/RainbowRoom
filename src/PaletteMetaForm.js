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

// name.paletteName;

function PaletteMetaForm(props) {
  const [stage, setStage] = React.useState("form");

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletName: name.paletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    setStage("");
  };

  const { name, handleChange, handleSubmit, hideForm } = props;

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new color palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              autoFocus
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
    </div>
  );
}

export default PaletteMetaForm;
