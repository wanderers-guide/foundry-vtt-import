export const isDefined = <T>(thing: T): thing is Exclude<T, undefined> => {
  return typeof thing !== "undefined";
};
