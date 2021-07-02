export type CantripLevel = 0;
export type SpellLevel = CantripLevel | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Class = CRBClass | GunsAndGearsClass | SecretsOfMagicClass;
export type GunsAndGearsClass = "Gunslinger" | "Inventor";
export type SecretsOfMagicClass = "Magus" | "Summoner";
export type CRBClass =
  | "Alchemist"
  | "Barbarian"
  | "Bard"
  | "Champion"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Gunslinger"
  | "Inventor"
  | "Investigator"
  | "Monk"
  | "Oracle"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Swashbuckler"
  | "Witch"
  | "Wizard";
export type WGClassIdMap = Record<number, Class>;
// We don't need proficiencies for specific weapons and stuff because that shit is automatically handled by pf2e
export type SpellType = "Occult" | "Primal" | "Divine" | "Arcane";
export type SpellDC = `${SpellType}SpellDCs`;
export type ProficiencyLevel = "T" | "E" | "M" | "L";
export type SavingThrow = "Will" | "Reflex" | "Fortitude";
export type AttackType =
  | "Unarmed_Attacks"
  | "Simple_Weapons"
  | "Martial_Weapons"
  | "Advanced_Weapons";
export type DefenseType =
  | "Unarmored_Defense"
  | "Light_Armor"
  | "Medium_Armor"
  | "Heavy_Armor";
export type Skill =
  | "Acrobatics"
  | "Arcana"
  | "Athletics"
  | "Crafting"
  | "Deception"
  | "Diplomacy"
  | "Intimidation"
  | "Medicine"
  | "Nature"
  | "Occultism"
  | "Performance"
  | "Religion"
  | "Society"
  | "Stealth"
  | "Survival"
  | "Thievery"
  | `${string}_LORE`;
export type Ability = "STR" | "DEX" | "CON" | "WIS" | "INT" | "CHA";
export type AbilityName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Wisdom"
  | "Intelligence"
  | "Charisma";
