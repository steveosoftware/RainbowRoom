import React, { useState, useEffect } from "react";
import clsx from "clsx";
import useStyles from "./styles/NewPaletteFormStyles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { arrayMove } from "react-sortable-hoc";
import { ValidatorForm } from "react-material-ui-form-validator";

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [name, setName] = useState({
    colorName: "",
    paletteName: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        (color) => color.name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every((color) => color.color !== currentColor);
    });

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [colors, currentColor, props.palettes]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = { color: currentColor, name: name.colorName };
    setColors((oldColors) => [...oldColors, newColor]);
  };

  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const handleSubmit = (newPalette) => {
    newPalette.paletteName = name.paletteName;
    newPalette.id = name.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    // };
    // let newName = name.paletteName;
    // newPalette = {
    //   paletteName: newName,
    //   id: newName.toLowerCase().replace(/ /g, "-"),
    //   colors: colors,
    // };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColors = () => {
    setColors([]);
  };

  const randomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let random = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[random];
    setColors([...colors, randomColor]);
  };

  const { maxColors, palettes } = props;
  const paletteIsFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        name={name}
        handleDrawerOpen={handleDrawerOpen}
        handleChange={handleChange}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={paletteIsFull}
            >
              {paletteIsFull ? "Palette Full" : "Random Color"}
            </Button>
          </div>
          <ColorPickerForm
            updateCurrentColor={updateCurrentColor}
            currentColor={currentColor}
            handleChange={handleChange}
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull}
            name={name}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};
