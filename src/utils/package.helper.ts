export const isValidPackageName = (name: string): boolean => {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    name
  );
};

export const makeValidPackageName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
};

export const getCommand = (manager: string, script: string): string => {
  if (script === "install") return `${manager} install`;
  return manager === "npm" ? `npm run ${script}` : `${manager} ${script}`;
};
