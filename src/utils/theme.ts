import { extendTheme } from "@chakra-ui/react";

const colors = {
  customPrimary: {
    1: "#F0F0F0",
    2: "#D1D9DF",
    3: "#A0B2C2",
    4: "#2A384C",
    5: "#A7B2D2",
    6: "#7086B4",
    7: "#E5E5E5"
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;