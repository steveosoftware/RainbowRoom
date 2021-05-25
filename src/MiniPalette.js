import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, id, handleClick, handleDelete } =
    props;
  const miniColorBoxes = colors.map((c) => (
    <div
      className={classes.miniColor}
      style={{ background: c.color }}
      key={c.name}
    ></div>
  ));

  const deletePalette = (e) => {
    e.stopPropagation();
    handleDelete(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
