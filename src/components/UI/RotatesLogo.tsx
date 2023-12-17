import { motion, useTime, useTransform } from "framer-motion";

import { faviconLime500 } from "../../utils/logos";


export function RotatesLogo() {
  const time = useTime();
  const rotate = useTransform(time, [ 0, 6000 ], [ 0, 360 ], { clamp: false });
  return (
    <motion.img
      style={{ rotate }}
      className="mx-auto h-16 w-16"
      src={faviconLime500}
      alt="Vzou"
    />
  );
}
