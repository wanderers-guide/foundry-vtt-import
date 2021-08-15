import { toCharacterUpdateMap, updateActor } from "../core";
import { importGuidechar } from "../../../testUtils";
import { CharacterPF2e, CharacterUpdateMap } from "../../types/character-data";
import { parseWanderersGuideJSON, toCharacter } from "../../parser";

describe(updateActor, () => {
  const mockActor: Pick<CharacterPF2e, "update"> = {
    update: jest.fn(() => Promise.resolve(mockActor as CharacterPF2e)),
  };

  beforeEach(() => {
    (mockActor.update as jest.Mock<Promise<CharacterPF2e>, []>).mockClear();
  });

  it("returns a promise containing the actor passed in and a boolean", () => {
    expect(updateActor(mockActor as CharacterPF2e, {})).resolves.toEqual([
      mockActor,
      expect.any(Boolean),
    ]);
  });

  it("Calls the update method of the actor, passing in the second parameter", async () => {
    await updateActor(mockActor as CharacterPF2e, {
      "data.abilities.cha.value": 69,
    });

    expect(mockActor.update).toHaveBeenCalledWith({
      "data.abilities.cha.value": 69,
    });
  });

  describe(toCharacterUpdateMap, () => {
    it("converts a parsed character to the appropriate update map", () => {
      const razzledazzle = {
        ...toCharacter(
          parseWanderersGuideJSON(
            importGuidechar("Razlin_Stickletest.guidechar")
          )
        ),
      };

      expect(toCharacterUpdateMap(razzledazzle)).toEqual({
        name: razzledazzle.name,
        "token.name": razzledazzle.name,
        "data.details.heritage.value": razzledazzle.heritage.name,
        "data.details.level.value": razzledazzle.level,
        "data.traits.languages.value": razzledazzle.languages.map((l) =>
          l.toLowerCase()
        ),
        "data.traits.size.value": "sm",
        "data.abilities.str.value": razzledazzle.abilities.str,
        "data.abilities.dex.value": razzledazzle.abilities.dex,
        "data.abilities.con.value": razzledazzle.abilities.con,
        "data.abilities.int.value": razzledazzle.abilities.int,
        "data.abilities.wis.value": razzledazzle.abilities.wis,
        "data.abilities.cha.value": razzledazzle.abilities.cha,
        "data.saves.fortitude.rank": razzledazzle.proficiencies.saves.fortitude,
        "data.saves.reflex.rank": razzledazzle.proficiencies.saves.reflex,
        "data.saves.will.rank": razzledazzle.proficiencies.saves.will,
        "data.martial.heavy.rank": razzledazzle.proficiencies.armour.heavy,
        "data.martial.medium.rank": razzledazzle.proficiencies.armour.medium,
        "data.martial.light.rank": razzledazzle.proficiencies.armour.light,
        "data.martial.unarmored.rank":
          razzledazzle.proficiencies.armour.unarmored,
        "data.martial.advanced.rank":
          razzledazzle.proficiencies.weapons.advanced,
        "data.martial.martial.rank": razzledazzle.proficiencies.weapons.martial,
        "data.martial.simple.rank": razzledazzle.proficiencies.weapons.simple,
        "data.martial.unarmed.rank": razzledazzle.proficiencies.weapons.unarmed,
        "data.skills.acr.rank": razzledazzle.proficiencies.skills.acr,
        "data.skills.arc.rank": razzledazzle.proficiencies.skills.arc,
        "data.skills.ath.rank": razzledazzle.proficiencies.skills.ath,
        "data.skills.cra.rank": razzledazzle.proficiencies.skills.cra,
        "data.skills.dec.rank": razzledazzle.proficiencies.skills.dec,
        "data.skills.dip.rank": razzledazzle.proficiencies.skills.dip,
        "data.skills.itm.rank": razzledazzle.proficiencies.skills.itm,
        "data.skills.med.rank": razzledazzle.proficiencies.skills.med,
        "data.skills.nat.rank": razzledazzle.proficiencies.skills.nat,
        "data.skills.occ.rank": razzledazzle.proficiencies.skills.occ,
        "data.skills.prf.rank": razzledazzle.proficiencies.skills.prf,
        "data.skills.rel.rank": razzledazzle.proficiencies.skills.rel,
        "data.skills.soc.rank": razzledazzle.proficiencies.skills.soc,
        "data.skills.ste.rank": razzledazzle.proficiencies.skills.ste,
        "data.skills.sur.rank": razzledazzle.proficiencies.skills.sur,
        "data.skills.thi.rank": razzledazzle.proficiencies.skills.thi,
        "data.attributes.perception.rank":
          razzledazzle.proficiencies.perception,
        "data.attributes.classDC.rank": razzledazzle.proficiencies.classDC,
      } as CharacterUpdateMap);
    });
  });
});
