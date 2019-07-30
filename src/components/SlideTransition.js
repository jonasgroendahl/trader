import React from "react";
import { Slide } from "@material-ui/core";

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction ? props.direction : "up"} ref={ref} {...props} />;
});

export default SlideTransition;
