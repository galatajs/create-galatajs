import gradient from "gradient-string";

const istanbulGradient = gradient([
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
  "Istanbul - The Progressive And Flexible Full Stack NodeJS Framework";

export const label: string = `\n${istanbulGradient(text)}\n`;
