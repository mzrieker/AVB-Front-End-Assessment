import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  blue: {
    background: "#f6a5c0",
  },
}));

// Component that generates name avatars
export default function UserAvatar({ name }) {
  const classes = useStyles();
  let initials = name.split(" ");

  if (initials.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name.substring(0, 2);
  }

  return (
    <Avatar className={classes.blue} variant="square">
      {initials.toUpperCase()}
    </Avatar>
  );
}
