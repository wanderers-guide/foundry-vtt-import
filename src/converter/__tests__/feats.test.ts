import { getSlug } from "../../utils/module";
import { getFeatVariant } from "../feats";

describe(getFeatVariant, () => {
  it("returns the results of getSlug", () => {
    const featName = "my cool feat";
    expect(getFeatVariant(featName, "Barbarian")).toBe(getSlug(featName));
  });
  it("Appends the class name to the slug if the feat given is in the array of class specific feats", () => {
    const featNames = ["Quiet Allies", "Predictive Purchase"] as const;

    expect(getFeatVariant(featNames[0], "Magus", ["Predictive Purchase"])).toBe(
      getSlug(featNames[0])
    );
    expect(getFeatVariant(featNames[1], "Magus", ["Predictive Purchase"])).toBe(
      `${getSlug(featNames[1])}-magus`
    );
  });
});
