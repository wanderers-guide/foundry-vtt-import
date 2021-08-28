import {
  Ability,
  Class,
  CoreSkillTLA,
  SavingThrow,
  Size,
  SpellLevel,
  SpellType,
} from "./system";
import { SourceType } from "./wanderers-guide-types";

export enum ProficiencyRank {
  UNTRAINED = 0,
  TRAINED = 1,
  EXPERT = 2,
  MASTER = 3,
  LEGENDARY = 4,
}

export type ValidLanguage =
  | "Abyssal"
  | "Adlet"
  | "Aklo"
  | "Alghollthu"
  | "Amurrun"
  | "Anadi"
  | "Androffan"
  | "Anugobu"
  | "Aquan"
  | "Arboreal"
  | "Arcadian"
  | "Auran"
  | "Azlanti"
  | "Boggard"
  | "Calda"
  | "Caligni"
  | "Celestial"
  | "Common"
  | "Cyclops"
  | "D'ziriak"
  | "Daemonic"
  | "Destrachan"
  | "Draconic"
  | "Druidic"
  | "Dwarven"
  | "Ekujae shape-script"
  | "Elven"
  | "Erutaki"
  | "Garundi"
  | "Giant"
  | "Girtablilu"
  | "Gnoll"
  | "Gnomish"
  | "Goblin"
  | "Goloma"
  | "Grioth"
  | "Grippli"
  | "Halfling"
  | "Hallit"
  | "Ignan"
  | "Infernal"
  | "Iruxi"
  | "Jistkan"
  | "Jotun"
  | "Jyoti"
  | "Kaava"
  | "Kelish"
  | "Kibwani"
  | "Kitsune"
  | "Kovintal"
  | "Lirgeni"
  | "Mahwek"
  | "Mi-Go"
  | "Minaten"
  | "Munavri"
  | "Mwangi"
  | "Mzunu"
  | "Nagaji"
  | "Necril"
  | "Ocotan"
  | "Orcish"
  | "Osiriani"
  | "Protean"
  | "Rasu"
  | "Requian"
  | "Russian"
  | "Samsaran"
  | "Sasquatch"
  | "Senzar"
  | "Shadowtongue"
  | "Shae"
  | "Shisk"
  | "Shoanti"
  | "Shoony"
  | "Skald"
  | "Sphinx"
  | "Strix"
  | "Sylvan"
  | "Taldane"
  | "Tengu"
  | "Terran"
  | "Thassilonian"
  | "Tien"
  | "Undercommon"
  | "Utopian"
  | "Vanara"
  | "Varisian"
  | "Varki"
  | "Vishkanyan"
  | "Vudrani"
  | "Wyrwood"
  | "Xanmba"
  | "Yithian"
  | "Ysoki";

export type ValidSense =
  | "Darkvision"
  | "Echolocation"
  | "Greater Darkvision"
  | "Lifesense"
  | "Low-Light Vision"
  | "Motionsense"
  | "Scent"
  | "Tremorsense"
  | "Wavesense";

export type ParsedCharacter = {
  name: string;
  level: number;
  class: Class;
  classDC: number;
  keyAbility?: Lowercase<Ability>;
  ancestry: {
    name: string;
    size: Lowercase<Size>;
  };
  background: string;
  heritage: {
    name: string;
  };
  hitpoints: {
    current: number;
    max: number;
    temp: number;
  };
  abilities: Record<Lowercase<Ability>, number>;
  proficiencies: {
    classDC: ProficiencyRank;
    perception: ProficiencyRank;
    saves: Record<Lowercase<SavingThrow>, ProficiencyRank>;
    skills: Record<Lowercase<CoreSkillTLA>, ProficiencyRank>;
    weapons: Record<
      "unarmed" | "simple" | "martial" | "advanced",
      ProficiencyRank
    >;
    armour: Record<"unarmored" | "light" | "medium" | "heavy", ProficiencyRank>;
    spells: Record<
      Lowercase<SpellType>,
      {
        dc: ProficiencyRank;
        attacks: ProficiencyRank;
      }
    >;
    lore: Record<string, ProficiencyRank>;
  };
  feats: Array<{
    name: string;
    featLevel: number;
    levelAcquired: number;
    featSource: SourceType;
  }>;
  spells: Array<{
    name: string;
    level: SpellLevel;
  }>;
  languages: ValidLanguage[];
  senses: ValidSense[];
  usesFreeArchetype: boolean;
};
