import { Exact } from "../utils/types";
import {
  Ability,
  AbilityName,
  AttackType,
  Class,
  DefenseType,
  ProficiencyLevel,
  SavingThrow,
  Size,
  Skill,
  SpellDC,
  SpellLevel,
} from "./system";

type ScuffedBool = 0 | 1;

export type WanderersGuideObject = {
  version: number;
  animalCompanions: [];
  build: WGBuild;
  character: WGCharacter;
  spellBookSpells: WGSpell[];
  stats: WGStats;
};

type JsonString = string;
export type WGStats = Timestamped<{
  maxHP: number;
  totalAC: number;
  totalAbilityScores: JsonString;
  totalClassDC: number;
  totalPerception: number;
  totalSaves: JsonString;
  totalSkills: JsonString;
  totalSpeed: number;
  weapons: JsonString;
}>;

export type WGSpell = Timestamped<{
  id: number;
  spellID: number;
  spellLevel: SpellLevel;
  spellSRC: Uppercase<Class>;
  _spellName: string;
}>;

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

export type WGAncestry = {
  description: string;
  hitPoints: number;
  name: string;
  speed: number;
  size: Uppercase<Size>;
};

export type WGBackground = {
  name: string;
  description: string;
};

export type WGClass = {
  name: Class;
  description: string;
  hitPoints: number;
  keyAbility: AbilityName;
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
