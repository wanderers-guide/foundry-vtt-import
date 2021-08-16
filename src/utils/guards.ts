export const isDefined = <T>(thing: T): thing is Exclude<T, undefined> => {
  return typeof thing !== "undefined";
};

export const isNullish = <T>(
  thing: T | null | undefined
): thing is null | undefined => {
  return typeof thing === "undefined" || thing === null;
};
