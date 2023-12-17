import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ReactElement, useState } from "react";


type Props = {
  isButtonDisabled: boolean;
  children: ReactElement;
};

export function ControlsToolTip({ isButtonDisabled, children }: Props) {
  const [ showTooltip, setShowTooltip ] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <Tooltip
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={
        <Typography
          variant="subtitle2"
          component="div"
          align="center"
        >
          Controls are disabled during simulation
          {"\n"}
          pause simulation to access it
        </Typography>
      }
      arrow
      open={isButtonDisabled && showTooltip}
      placement="top"
    >
      {children}
    </Tooltip>
  );
}
