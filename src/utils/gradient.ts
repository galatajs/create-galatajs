import gradient from "gradient-string";

const galataGradient = gradient([
  {
    color: "#48cae4",
    pos: 0,
  },
  {
    color: "#48cae4",
    pos: 0.1,
  },
  {
    color: "#f08080",
    pos: 1,
  },
]);

const text =
  "GalataJS - The Progressive, Flexible And Friendly Full Stack NodeJS Framework";

export const label: string = `\n${galataGradient(text)}\n`;
