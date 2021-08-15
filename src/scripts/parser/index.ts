import { ProficiencyRank } from "../../../types/character-data";
import { ParsedCharacter, ValidLanguage, ValidSense } from "../types/parser";
import { Ability, AbilityName, CoreSkillTLA, Size } from "../types/system";
import { WanderersGuideObject } from "../types/wanderers-guide-types";
import {
  baseSkills,
  getCoreSkillTLA,
  getFoundryProficiencyFromLevel,
  UnsupportedVersionError,
  validLanguages,
  validSenses,
} from "./helpers";

export const parseWanderersGuideJSON = (json: string): WanderersGuideObject => {
  const wgData: WanderersGuideObject = JSON.parse(json);

  if (wgData.version !== 3) {
    throw new UnsupportedVersionError(
      `Unsupported export version (Version ${wgData.version} given, version 3 required)`
    );
  }

  return wgData;
};

export const toCharacter = (wgData: WanderersGuideObject): ParsedCharacter => {
  const abilityScores = JSON.parse(wgData.stats.totalAbilityScores) as Array<{
    Name: AbilityName;
    Score: number;
  }>;

  const loreSkills = Object.keys(wgData.profs).filter((prof) =>
    prof.match(/^.+\sLore$/)
  ) as `${string} Lore`[];

  return {
    name: wgData.character.name,
    level: wgData.character.level,
    class: wgData.character._class.name,
    classDC: wgData.stats.totalClassDC,
    hitpoints: {
      current: wgData.character.currentHealth ?? wgData.stats.maxHP,
      max: wgData.stats.maxHP,
      temp: wgData.character.tempHealth ?? 0,
    },
    abilities: abilityScores.reduce((abilities, { Name, Score }) => {
      abilities[Name.slice(0, 3).toLowerCase() as Lowercase<Ability>] = Score;

      return abilities;
    }, {} as Record<Lowercase<Ability>, number>),
    ancestry: {
      name: wgData.character._ancestry.name,
      size: wgData.character._ancestry.size.toLowerCase() as Lowercase<Size>,
    },
    heritage: {
      name: wgData.character._heritage.name,
    },
    usesFreeArchetype: !!wgData.character.variantFreeArchetype,
    spells: wgData.spellBookSpells.map((spell) => ({
      level: spell.spellLevel,
      name: spell._spellName,
    })),
    feats: wgData.build.feats.map((feat) => ({
      name: feat.value.name,
      levelAcquired: feat.sourceLevel,
      featLevel: feat.value.level,
    })),
    languages: wgData.build.languages
      .map((language) => language.value.name as ValidLanguage)
      .filter((language) => validLanguages.includes(language)),
    senses: wgData.build.senses
      .map((sense) => sense.value.name as ValidSense)
      .filter((sense) => validSenses.includes(sense)),
    proficiencies: {
      classDC: getFoundryProficiencyFromLevel(wgData.profs.Class_DC ?? "T"),
      perception: getFoundryProficiencyFromLevel(wgData.profs.Perception),
      saves: {
        fortitude: getFoundryProficiencyFromLevel(wgData.profs.Fortitude),
        reflex: getFoundryProficiencyFromLevel(wgData.profs.Reflex),
        will: getFoundryProficiencyFromLevel(wgData.profs.Will),
      },
      armour: {
        unarmored: getFoundryProficiencyFromLevel(
          wgData.profs.Unarmored_Defense
        ),
        light: getFoundryProficiencyFromLevel(wgData.profs.Light_Armor),
        medium: getFoundryProficiencyFromLevel(wgData.profs.Medium_Armor),
        heavy: getFoundryProficiencyFromLevel(wgData.profs.Heavy_Armor),
      },
      weapons: {
        unarmed: getFoundryProficiencyFromLevel(wgData.profs.Unarmed_Attacks),
        simple: getFoundryProficiencyFromLevel(wgData.profs.Simple_Weapons),
        martial: getFoundryProficiencyFromLevel(wgData.profs.Martial_Weapons),
        advanced: getFoundryProficiencyFromLevel(wgData.profs.Advanced_Weapons),
      },
      spells: {
        arcane: {
          dc: getFoundryProficiencyFromLevel(wgData.profs.ArcaneSpellDCs),
          attacks: getFoundryProficiencyFromLevel(
            wgData.profs.ArcaneSpellAttacks
          ),
        },
        divine: {
          dc: getFoundryProficiencyFromLevel(wgData.profs.DivineSpellDCs),
          attacks: getFoundryProficiencyFromLevel(
            wgData.profs.DivineSpellAttacks
          ),
        },
        occult: {
          dc: getFoundryProficiencyFromLevel(wgData.profs.OccultSpellDCs),
          attacks: getFoundryProficiencyFromLevel(
            wgData.profs.OccultSpellAttacks
          ),
        },
        primal: {
          dc: getFoundryProficiencyFromLevel(wgData.profs.PrimalSpellDCs),
          attacks: getFoundryProficiencyFromLevel(
            wgData.profs.PrimalSpellAttacks
          ),
        },
      },
      lore: loreSkills.reduce((skills, name) => {
        // @ts-ignore no idea why `${string} Lore` can't be used to index a type that specifies that as a valid index so let's just ignore it who cares
        skills[name] = getFoundryProficiencyFromLevel(wgData.profs[name]);

        return skills;
      }, {} as Record<string, ProficiencyRank>),
      skills: baseSkills.reduce((skills, name) => {
        skills[getCoreSkillTLA(name).toLowerCase() as Lowercase<CoreSkillTLA>] =
          getFoundryProficiencyFromLevel(wgData.profs[name]);
        return skills;
      }, {} as Record<Lowercase<CoreSkillTLA>, ProficiencyRank>),
    },
  };
};
