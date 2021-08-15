import { CharacterPF2e, CharacterUpdateMap } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import { debugLog, getGame } from "../utils/module";
import { addLoreSkills } from "./skills";

export const updateActor = (
  actor: CharacterPF2e,
  changes: CharacterUpdateMap = {}
): Promise<[CharacterPF2e, boolean]> => {
  return actor
    .update(changes)
    .then((updatedActor) => [updatedActor || actor, !!updatedActor]);
};

export const setAbilitiesAndProficiencies = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const updateMap = toCharacterUpdateMap(data);
  debugLog("setAbilitiesAndProficiencies() updating actor", { updateMap });
  const [, hadChanges] = await updateActor(actor, updateMap);
  const changedOrUpdatedDocuments = await addLoreSkills(actor, data);

  return hadChanges || !!changedOrUpdatedDocuments.length;
};

export const toCharacterUpdateMap = (
  data: ParsedCharacter
): CharacterUpdateMap => {
  return {
    name: data.name,
    "token.name": data.name,
    "data.details.heritage.value": data.heritage.name,
    "data.details.level.value": data.level,
    "data.traits.languages.value": data.languages.map((l) => l.toLowerCase()),
    "data.traits.size.value": "sm",
    "data.abilities.str.value": data.abilities.str,
    "data.abilities.dex.value": data.abilities.dex,
    "data.abilities.con.value": data.abilities.con,
    "data.abilities.int.value": data.abilities.int,
    "data.abilities.wis.value": data.abilities.wis,
    "data.abilities.cha.value": data.abilities.cha,
    "data.saves.fortitude.rank": data.proficiencies.saves.fortitude,
    "data.saves.reflex.rank": data.proficiencies.saves.reflex,
    "data.saves.will.rank": data.proficiencies.saves.will,
    "data.martial.heavy.rank": data.proficiencies.armour.heavy,
    "data.martial.medium.rank": data.proficiencies.armour.medium,
    "data.martial.light.rank": data.proficiencies.armour.light,
    "data.martial.unarmored.rank": data.proficiencies.armour.unarmored,
    "data.martial.advanced.rank": data.proficiencies.weapons.advanced,
    "data.martial.martial.rank": data.proficiencies.weapons.martial,
    "data.martial.simple.rank": data.proficiencies.weapons.simple,
    "data.martial.unarmed.rank": data.proficiencies.weapons.unarmed,
    "data.skills.acr.rank": data.proficiencies.skills.acr,
    "data.skills.arc.rank": data.proficiencies.skills.arc,
    "data.skills.ath.rank": data.proficiencies.skills.ath,
    "data.skills.cra.rank": data.proficiencies.skills.cra,
    "data.skills.dec.rank": data.proficiencies.skills.dec,
    "data.skills.dip.rank": data.proficiencies.skills.dip,
    "data.skills.itm.rank": data.proficiencies.skills.itm,
    "data.skills.med.rank": data.proficiencies.skills.med,
    "data.skills.nat.rank": data.proficiencies.skills.nat,
    "data.skills.occ.rank": data.proficiencies.skills.occ,
    "data.skills.prf.rank": data.proficiencies.skills.prf,
    "data.skills.rel.rank": data.proficiencies.skills.rel,
    "data.skills.soc.rank": data.proficiencies.skills.soc,
    "data.skills.ste.rank": data.proficiencies.skills.ste,
    "data.skills.sur.rank": data.proficiencies.skills.sur,
    "data.skills.thi.rank": data.proficiencies.skills.thi,
    "data.attributes.perception.rank": data.proficiencies.perception,
    "data.attributes.classDC.rank": data.proficiencies.classDC,
  };
};
