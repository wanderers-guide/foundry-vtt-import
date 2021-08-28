import { isDefined, isNullish } from "../guards";

describe("guards", () => {
  describe(isDefined, () => {
    it("returns true for non-undefined entities, false otherwise", () => {
      const definedThings = [
        NaN,
        -Infinity,
        Infinity,
        -1,
        0,
        1,
        false,
        true,
        "",
        "undefined",
        null,
        () => undefined,
        [],
        {},
      ];
      const undefinedThings = [undefined];

      definedThings.forEach((thing) => {
        expect(isDefined(thing)).toBe(true);
      });

      undefinedThings.forEach((thing) => {
        expect(isDefined(thing)).toBe(false);
      });
    });
  });
  describe(isNullish, () => {
    it("returns true for undefined and null, false otherwise.", () => {
      const nonNullishThings = [
        NaN,
        -Infinity,
        Infinity,
        -1,
        0,
        1,
        false,
        true,
        "",
        "undefined",
        () => undefined,
        [],
        {},
      ];
      const nullishThings = [undefined, null];

      nonNullishThings.forEach((thing) => {
        expect(isNullish(thing)).toBe(false);
      });

      nullishThings.forEach((thing) => {
        expect(isNullish(thing)).toBe(true);
      });
    });
  });
});
