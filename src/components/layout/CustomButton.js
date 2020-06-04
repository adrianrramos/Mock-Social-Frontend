import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const CustomButton = ({
  children,
  tip,
  tipClassName,
  placement,
  onClick,
  btnClassname,
}) => {
  return (
    <Tooltip title={tip} className={tipClassName} placement={placement}>
      <IconButton onClick={onClick} className={btnClassname}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomButton;
