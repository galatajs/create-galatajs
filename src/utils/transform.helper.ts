const isObject = (val) => val && typeof val === "object";
export const mergeArrayWithDedupe = (a: Array<any>, b: Array<any>) =>
  Array.from(new Set([...a, ...b]));

export const deepMerge = <T, O>(target: T, obj: O): T => {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key],
      newVal = obj[key];
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }
  return target;
};

export const sortPackageDependencies = (json: any): void => {
  const sorted = {};

  const depTypes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];

  for (const depType of depTypes) {
    if (json[depType]) {
      sorted[depType] = {};

      Object.keys(json[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = json[depType][name];
        });
    }
  }

  return {
    ...json,
    ...sorted,
  };
};
