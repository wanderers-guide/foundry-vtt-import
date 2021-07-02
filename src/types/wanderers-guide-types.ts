import { Exact } from "../utils/types";

type ScuffedBool = 0 | 1;

export type WanderersGuideObject = {
  version: number;
  animalCompanions: [];
  build: WGBuild;
  character: {};
  spellBookSpells: [];
  stats: {};
};

export type WGCharacter = Timestamped<{
  level: number;
  variantFreeArchetype: ScuffedBool;
  variantAncestryParagon: ScuffedBool;
  variantAutoBonusProgression: ScuffedBool;
  variantGradualAbilityBoosts: ScuffedBool;
  variantProfWithoutLevel: ScuffedBool;
  variantStamina: ScuffedBool;
  _ancestry: WGAncestry;
  _background: WGBackground;
  _class: WGClass;
  _heritage: WGHeritage;
}>;

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

export type WGAncestry = {
  description: string;
  hitPoints: number;
  name: string;
  speed: number;
};

export type WGBackground = {
  name: string;
  description: string;
};

export type WGClass = {
  name: string;
  description: string;
  hitPoints: number;
};

export type WGHeritage = {
  name: string;
  description: string;
};

export type WGBuild = {
  boosts: WGBoost[];
  domains: WGDomain[];
  feats: WGFeat[];
  languages: WGLanguage[];
  proficiencies: WGProficiency[];
  senses: WGSense[];
};

export type WGSense = Sourceable<
  {
    value: WGSenseMeta;
  },
  { source: "ancestry" }
>;

export type WGSenseMeta = Timestamped<{
  id: number;
  name: string;
  description: string;
  isVisionType: ScuffedBool;
  visionPrecedence: number;
}>;

export type WGProficiency = Sourceable<
  Timestamped<{
    For: "Skill" | "Attack" | "Defense" | "Save" | "Class_DC" | "SpellDC";
    Prof: ProficiencyLevel;
    To: string;
  }>,
  { source: "proficiencies" }
>;
export type WGSpellDCProficiency = Exact<
  Partial<WGProficiency>,
  { For: "SpellDC"; To: SpellDC }
>;
export type WGClassDCProficiency = Exact<
  Partial<WGProficiency>,
  { For: "Class_DC"; To: "Class_DC" }
>;
export type WGSkillProficiency = Exact<
  Partial<WGProficiency>,
  {
    For: "Skill";
    To: Skill;
  }
>;
export type WGSavingThrowProficiency = Exact<
  Partial<WGProficiency>,
  {
    For: "Save";
    To: SavingThrow;
  }
>;
export type WGArmourProficiency = Exact<
  Partial<WGProficiency>,
  {
    For: "Defense";
    To: DefenseType;
  }
>;
export type WGWeaponProficiency = Exact<
  Partial<WGProficiency>,
  {
    For: "Attack";
    To: AttackType;
  }
>;

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

export type WGLanguage = Sourceable<
  {
    charID: number;
    value: WGLanguageMeta;
  },
  { source: "languages" }
>;
export type WGLanguageMeta = Timestamped<{
  id: number;
  name: string;
  script: string;
  speakers: string;
}>;

export type WGFeat = Sourceable<
  {
    charID: number;
    value: WGFeatMeta;
  },
  { source: "chosenFeats" }
>;
export type WGFeatMeta = Timestamped<{
  canSelectMultiple: number;
  contentSrc: string;
  name: string;
  description: string;
  trigger: string;
}>;

export type WGDomain = {};

export type WGBoost = Sourceable<
  Timestamped<{
    Ability: Ability;
    Bonus: BonusType;
    charID: number;
    value: `${Ability}:::${BonusType}`;
  }>,
  { source: "abilityBonus" }
>;

export type Ability = "STR" | "DEX" | "CON" | "WIS" | "INT" | "CHA";
export type BonusType = "Boost" | "Flaw";

export type SourceType =
  | "ancestry"
  | "background"
  | "class"
  | "user-added"
  | "user-set";
export type Source = {
  source: string;
  sourceCode: string;
  sourceCodeSNum: string;
  sourceLevel: number;
  sourceType: SourceType;
};

export type Sourceable<T, S extends Exact<Partial<Source>, S> = {}> = T &
  S &
  Source;

export type Timestamped<T> = T & {
  createdAt: string;
  updatedAt: string;
};
