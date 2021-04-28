import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props){

  const { classes, paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map(c => (
    <div
      className={classes.miniColor}
      style={{ background: c.color }}
      key={c.name}></div>
  ))
  return(

    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);