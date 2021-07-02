import { Ability, AbilityName } from "../types/system";
import { WGClassIdMap } from "../types/wanderers-guide-types";

export const classIdMap: WGClassIdMap = {
  265: "Alchemist",
  179: "Barbarian",
  269: "Bard",
  225: "Champion",
  325: "Cleric",
  268: "Fighter",
  355: "Gunslinger",
  358: "Inventor",
  324: "Investigator",
  329: "Magus",
  251: "Monk",
  279: "Oracle",
  258: "Ranger",
  261: "Rogue",
  232: "Sorcerer",
  335: "Summoner",
  295: "Swashbuckler",
  304: "Witch",
  260: "Wizard",
};

export const getClass = (id: number) => classIdMap[id];
export const getClassId = (className: string): number | undefined => {
  const classId = Object.keys(classIdMap).find(
    (id) => classIdMap[+id]?.toLowerCase() === className.toLowerCase()
  );

  return classId ? +classId : undefined;
};

export const getAbilityName = (ability: Ability): AbilityName => {
  switch (ability) {
    case "STR":
      return "Strength";
    case "DEX":
      return "Dexterity";
    case "CON":
      return "Constitution";
    case "WIS":
      return "Wisdom";
    case "INT":
      return "Intelligence";
    case "CHA":
      return "Charisma";
  }
};
// TLA means Three Letter Acronym
export const getAbilityTLA = (abilityName: AbilityName): Ability =>
  abilityName.slice(0, 3).toUpperCase() as Ability;
