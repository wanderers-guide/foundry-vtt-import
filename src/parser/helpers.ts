import { ProficiencyRank, ValidLanguage, ValidSense } from "../types/parser";
import {
  Ability,
  AbilityName,
  ClassRecord,
  CoreSkill,
  CoreSkillTLA,
  ProficiencyLevel,
} from "../types/system";

export const classIdMap: ClassRecord = {
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

export const getCoreSkillTLA = (
  profName: CoreSkill | Uppercase<CoreSkill> | Lowercase<CoreSkill>
): CoreSkillTLA => {
  const upperProfName = profName.toUpperCase() as Uppercase<CoreSkill>;
  switch (upperProfName) {
    case "INTIMIDATION":
      return "ITM";
    case "PERFORMANCE":
      return "PRF";
    default:
      return upperProfName.slice(0, 3) as CoreSkillTLA;
  }
};

export const getFoundryProficiencyFromLevel = (
  code: ProficiencyLevel | undefined
): ProficiencyRank => {
  switch (code) {
    case "T":
      return ProficiencyRank.TRAINED;
    case "E":
      return ProficiencyRank.EXPERT;
    case "M":
      return ProficiencyRank.MASTER;
    case "L":
      return ProficiencyRank.LEGENDARY;
    default:
      return ProficiencyRank.UNTRAINED;
  }
};

export class UnsupportedVersionError extends Error {}

export const baseSkills: CoreSkill[] = [
  "Acrobatics",
  "Arcana",
  "Athletics",
  "Crafting",
  "Deception",
  "Diplomacy",
  "Intimidation",
  "Medicine",
  "Nature",
  "Occultism",
  "Performance",
  "Religion",
  "Society",
  "Stealth",
  "Survival",
  "Thievery",
];
export const validSenses: ValidSense[] = [
  "Darkvision",
  "Echolocation",
  "Greater Darkvision",
  "Lifesense",
  "Low-Light Vision",
  "Motionsense",
  "Scent",
  "Tremorsense",
  "Wavesense",
];
export const validLanguages: ValidLanguage[] = [
  "Abyssal",
  "Adlet",
  "Aklo",
  "Alghollthu",
  "Amurrun",
  "Anadi",
  "Androffan",
  "Anugobu",
  "Aquan",
  "Arboreal",
  "Arcadian",
  "Auran",
  "Azlanti",
  "Boggard",
  "Calda",
  "Caligni",
  "Celestial",
  "Common",
  "Cyclops",
  "D'ziriak",
  "Daemonic",
  "Druidic",
  "Dwarven",
  "Ekujae shape-script",
  "Elven",
  "Erutaki",
  "Garundi",
  "Giant",
  "Girtablilu",
  "Gnoll",
  "Gnomish",
  "Goblin",
  "Goloma",
  "Grioth",
  "Grippli",
  "Halfling",
  "Hallit",
  "Ignan",
  "Infernal",
  "Iruxi",
  "Jistkan",
  "Jotun",
  "Jyoti",
  "Kaava",
  "Kelish",
  "Kibwani",
  "Kitsune",
  "Kovintal",
  "Lirgeni",
  "Mi-Go",
  "Minaten",
  "Munavri",
  "Mwangi",
  "Mzunu",
  "Nagaji",
  "Necril",
  "Ocotan",
  "Orcish",
  "Osiriani",
  "Protean",
  "Rasu",
  "Requian",
  "Samsaran",
  "Sasquatch",
  "Senzer",
  "Shadowtongue",
  "Shae",
  "Shisk",
  "Shoanti",
  "Shoony",
  "Skald",
  "Sphinx",
  "Strix",
  "Sylvan",
  "Taldane",
  "Tengu",
  "Terran",
  "Thassilonian",
  "Tien",
  "Undercommon",
  "Utopian",
  "Vanara",
  "Varisian",
  "Varki",
  "Vishkanyan",
  "Vudrani",
  "Wyrwood",
  "Xanmba",
  "Yithian",
  "Ysoki",
];
