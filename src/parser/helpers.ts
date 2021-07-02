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
