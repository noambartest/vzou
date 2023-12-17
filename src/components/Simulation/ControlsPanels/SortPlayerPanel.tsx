import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Slider,
  Stack,
  ThemeProvider,
  Tooltip,
} from "@mui/material";

import SortController from "../../../ClassObjects/SortControllers/SortController";
import { useAppSelector } from "../../../store/hooks";


interface Props {
  controller: SortController;
}

function SortPlayerPanel(props: Props) {
  const { controller } = props;
  const isPlaying = useAppSelector((state) => state.animationController.isPlaying);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#78ab3a",
      },
      secondary: {
        main: "#78ab3a",
      },
    },
  });
  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      className="mt-10"
    >
      <ThemeProvider theme={theme}>
        <Tooltip
          title="Speed"
          arrow
        >
          <Box className="mt-1 mr-5 w-28">
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
            >
              <SpeedIcon
                color="primary"
                fontSize="large"
              />
              <Slider
                step={0.25}
                color="primary"
                defaultValue={1.25}
                min={0.25}
                max={3}
                onChange={(event: Event, newValue: number | number[]) => {
                  props.controller.setSpeed(newValue as number);
                }}
              />
            </Stack>
          </Box>
        </Tooltip>
        <Tooltip
          title="Jump to start"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.playFirstFrame();
            }}
          >
            <SkipPreviousIcon />
          </Button>
        </Tooltip>
        <Tooltip
          title="Previous frame"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.playPreviousFrame();
            }}
          >
            <ChevronLeftIcon />
          </Button>
        </Tooltip>

        {isPlaying ? (
          <Tooltip
            title="Pause"
            arrow
          >
            <Button
              onClick={async () => {
                controller.setStopFlag(true);
              }}
            >
              <PauseIcon />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            title="Play"
            arrow
          >
            <Button
              onClick={async () => {
                await controller.play();
              }}
            >
              <PlayArrowIcon />
            </Button>
          </Tooltip>
        )}
        <Tooltip
          title="Next frame"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.playNextFrame();
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Tooltip>

        <Tooltip
          title="Jump to end"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.playLastFrame();
            }}
          >
            <SkipNextIcon />
          </Button>
        </Tooltip>
      </ThemeProvider>
    </ButtonGroup>
  );
}

export default SortPlayerPanel;
