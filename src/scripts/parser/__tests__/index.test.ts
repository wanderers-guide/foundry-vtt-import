import { parseWanderersGuideJSON, toCharacter } from "..";
import { importGuidechar } from "../../../testUtils";
import { ProficiencyRank } from "../../../types/character-data";
import { ParsedCharacter } from "../../types/parser";
import { UnsupportedVersionError } from "../helpers";

const razlin = {
  good: importGuidechar("Razlin_Stickletest.guidechar"),
  bad: importGuidechar("Razlin_Stickletest.badver.guidechar"),
};

const haruya = {
  good: importGuidechar("Haruya_Harutest.guidechar"),
  bad: importGuidechar("Haruya_Harutest.badver.guidechar"),
};

describe("Parser", () => {
  describe(parseWanderersGuideJSON, () => {
    it("Returns the parsed JSON for valid versions", () => {
      expect(parseWanderersGuideJSON(razlin.good)).toEqual(
        JSON.parse(razlin.good)
      );
      expect(parseWanderersGuideJSON(haruya.good)).toEqual(
        JSON.parse(haruya.good)
      );
    });

    it("Throws an UnsupportedVersionError when version is not supported", () => {
      expect(() => parseWanderersGuideJSON(razlin.bad)).toThrowError(
        UnsupportedVersionError
      );
      expect(() => parseWanderersGuideJSON(haruya.bad)).toThrowError(
        UnsupportedVersionError
      );
    });
  });

  describe(toCharacter, () => {
    it("correctly craft a curated object containing correct info", () => {
      const raz = parseWanderersGuideJSON(razlin.good);
      const haruno = parseWanderersGuideJSON(haruya.good);
      const parsedRazlin: ParsedCharacter = {
        name: "Razlin Stickletest",
        level: 10,
        class: "Monk",
        classDC: 29,
        hitpoints: {
          current: 56,
          temp: 69,
          max: 116,
        },
        abilities: {
          str: 14,
          dex: 20,
          con: 12,
          int: 12,
          wis: 18,
          cha: 16,
        },
        proficiencies: {
          classDC: ProficiencyRank.EXPERT,
          perception: ProficiencyRank.EXPERT,
          saves: {
            fortitude: ProficiencyRank.EXPERT,
            reflex: ProficiencyRank.MASTER,
            will: ProficiencyRank.EXPERT,
          },
          weapons: {
            unarmed: ProficiencyRank.EXPERT,
            simple: ProficiencyRank.EXPERT,
            martial: ProficiencyRank.UNTRAINED,
            advanced: ProficiencyRank.UNTRAINED,
          },
          armour: {
            unarmored: ProficiencyRank.EXPERT,
            light: ProficiencyRank.UNTRAINED,
            medium: ProficiencyRank.UNTRAINED,
            heavy: ProficiencyRank.UNTRAINED,
          },
          skills: {
            acr: ProficiencyRank.MASTER,
            arc: ProficiencyRank.UNTRAINED,
            ath: ProficiencyRank.TRAINED,
            cra: ProficiencyRank.UNTRAINED,
            dec: ProficiencyRank.TRAINED,
            dip: ProficiencyRank.TRAINED,
            itm: ProficiencyRank.UNTRAINED,
            med: ProficiencyRank.UNTRAINED,
            nat: ProficiencyRank.UNTRAINED,
            occ: ProficiencyRank.TRAINED,
            prf: ProficiencyRank.TRAINED,
            rel: ProficiencyRank.UNTRAINED,
            soc: ProficiencyRank.TRAINED,
            ste: ProficiencyRank.TRAINED,
            sur: ProficiencyRank.UNTRAINED,
            thi: ProficiencyRank.TRAINED,
          },
          lore: {
            "Theater Lore": ProficiencyRank.TRAINED,
          },
          spells: {
            arcane: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
            divine: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
            occult: {
              dc: ProficiencyRank.EXPERT,
              attacks: ProficiencyRank.EXPERT,
            },
            primal: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
          },
        },
        ancestry: {
          name: "Halfling",
          size: "small",
        },
        heritage: {
          name: "Observant Halfling",
        },
        languages: expect.arrayContaining(["Common", "Halfling"]),
        senses: [],
        feats: expect.arrayContaining([
          {
            name: "Sure Feet",
            featLevel: 1,
            levelAcquired: 1,
          },
          {
            name: "Halfling Luck",
            featLevel: 1,
            levelAcquired: 5,
          },
          {
            name: "Guiding Luck",
            featLevel: 9,
            levelAcquired: 9,
          },
          {
            name: "Fascinating Performance",
            featLevel: 1,
            levelAcquired: 1,
          },
          {
            name: "Ki Strike",
            featLevel: 1,
            levelAcquired: 1,
          },
          {
            name: "Flurry of Blows",
            featLevel: -1,
            levelAcquired: 1,
          },
          {
            name: "Martial Artist Dedication",
            featLevel: 2,
            levelAcquired: 2,
          },
          {
            name: "Stunning Fist",
            featLevel: 2,
            levelAcquired: 2,
          },
          {
            name: "Acrobatic Performer",
            featLevel: 1,
            levelAcquired: 2,
          },
          {
            name: "Dubious Knowledge",
            featLevel: 1,
            levelAcquired: 3,
          },
          {
            name: "Crane Stance",
            featLevel: 4,
            levelAcquired: 4,
          },
          {
            name: "Ki Rush",
            featLevel: 1,
            levelAcquired: 4,
          },
          {
            name: "Cat Fall",
            featLevel: 1,
            levelAcquired: 4,
          },
          {
            name: "Follow-Up Strike",
            featLevel: 6,
            levelAcquired: 6,
          },
          {
            name: "Ki Blast",
            featLevel: 6,
            levelAcquired: 6,
          },
          {
            name: "Nimble Crawl",
            featLevel: 2,
            levelAcquired: 6,
          },
          {
            name: "Kip Up",
            featLevel: 7,
            levelAcquired: 7,
          },
          {
            name: "Jalmeri Heavenseeker Dedication",
            featLevel: 4,
            levelAcquired: 8,
          },
          {
            name: "Abundant Step",
            featLevel: 6,
            levelAcquired: 8,
          },
          {
            name: "Assurance",
            featLevel: 1,
            levelAcquired: 8,
          },
          {
            name: "Heaven's Thunder",
            featLevel: 6,
            levelAcquired: 10,
          },
          {
            name: "Steal the Sky",
            featLevel: 10,
            levelAcquired: 10,
          },
          {
            name: "Pickpocket",
            featLevel: 1,
            levelAcquired: 10,
          },
        ]),
        spells: [],
        usesFreeArchetype: true,
      };
      const parsedHaruya: ParsedCharacter = {
        name: "Haruya Harutest",
        level: 3,
        class: "Witch",
        classDC: 19,
        hitpoints: {
          current: 32,
          temp: 0,
          max: 32,
        },
        abilities: {
          str: 10,
          dex: 10,
          con: 14,
          int: 18,
          wis: 12,
          cha: 14,
        },
        proficiencies: {
          classDC: ProficiencyRank.TRAINED,
          perception: ProficiencyRank.TRAINED,
          saves: {
            fortitude: ProficiencyRank.TRAINED,
            reflex: ProficiencyRank.TRAINED,
            will: ProficiencyRank.EXPERT,
          },
          weapons: {
            unarmed: ProficiencyRank.TRAINED,
            simple: ProficiencyRank.TRAINED,
            martial: ProficiencyRank.UNTRAINED,
            advanced: ProficiencyRank.UNTRAINED,
          },
          armour: {
            unarmored: ProficiencyRank.TRAINED,
            light: ProficiencyRank.UNTRAINED,
            medium: ProficiencyRank.UNTRAINED,
            heavy: ProficiencyRank.UNTRAINED,
          },
          skills: {
            acr: ProficiencyRank.UNTRAINED,
            arc: ProficiencyRank.UNTRAINED,
            ath: ProficiencyRank.UNTRAINED,
            cra: ProficiencyRank.TRAINED,
            dec: ProficiencyRank.TRAINED,
            dip: ProficiencyRank.TRAINED,
            itm: ProficiencyRank.TRAINED,
            med: ProficiencyRank.MASTER,
            nat: ProficiencyRank.EXPERT,
            occ: ProficiencyRank.UNTRAINED,
            prf: ProficiencyRank.UNTRAINED,
            rel: ProficiencyRank.UNTRAINED,
            soc: ProficiencyRank.TRAINED,
            ste: ProficiencyRank.TRAINED,
            sur: ProficiencyRank.TRAINED,
            thi: ProficiencyRank.UNTRAINED,
          },
          lore: {
            "Herbalism Lore": ProficiencyRank.TRAINED,
          },
          spells: {
            arcane: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
            divine: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
            occult: {
              dc: ProficiencyRank.UNTRAINED,
              attacks: ProficiencyRank.UNTRAINED,
            },
            primal: {
              dc: ProficiencyRank.TRAINED,
              attacks: ProficiencyRank.TRAINED,
            },
          },
        },
        ancestry: {
          name: "Human",
          size: "medium",
        },
        heritage: {
          name: "Versatile Human",
        },
        languages: expect.arrayContaining([
          "Aklo",
          "Aquan",
          "Auran",
          "Common",
          "Ignan",
          "Sylvan",
          "Terran",
          "Vudrani",
        ]),
        senses: [],
        feats: expect.arrayContaining([
          {
            name: "Natural Ambition",
            levelAcquired: 1,
            featLevel: 1,
          },
          {
            name: "Cauldron",
            levelAcquired: 1,
            featLevel: 1,
          },
          {
            name: "Forager",
            levelAcquired: 1,
            featLevel: 1,
          },
          {
            name: "Natural Medicine",
            levelAcquired: 1,
            featLevel: 1,
          },
          {
            name: "Herbalist Dedication",
            levelAcquired: 2,
            featLevel: 2,
          },
          {
            name: "Alchemical Crafting",
            levelAcquired: 2,
            featLevel: 1,
          },
          {
            name: "Improvise Tool",
            levelAcquired: 2,
            featLevel: 1,
          },
          {
            name: "Basic Lesson",
            levelAcquired: 2,
            featLevel: 2,
          },
          {
            name: "Lesson of Life",
            levelAcquired: 2,
            featLevel: -1,
          },
          {
            name: "Multilingual",
            levelAcquired: 3,
            featLevel: 1,
          },
        ]),
        spells: expect.arrayContaining([
          {
            name: "Spirit Link",
            level: 1,
          },
          {
            name: "Acid Splash",
            level: 0,
          },
          {
            name: "Dancing Lights",
            level: 0,
          },
          {
            name: "Detect Magic",
            level: 0,
          },
          {
            name: "Guidance",
            level: 0,
          },
          {
            name: "Know Direction",
            level: 0,
          },
          {
            name: "Prestidigitation",
            level: 0,
          },
          {
            name: "Produce Flame",
            level: 0,
          },
          {
            name: "Sigil",
            level: 0,
          },
          {
            name: "Stabilize",
            level: 0,
          },
          {
            name: "Tanglefoot",
            level: 0,
          },
          {
            name: "Create Water",
            level: 1,
          },
          {
            name: "Fear",
            level: 1,
          },
          {
            name: "Feather Fall",
            level: 1,
          },
          {
            name: "Goblin Pox",
            level: 1,
          },
          {
            name: "Heal",
            level: 1,
          },
          {
            name: "Negate Aroma",
            level: 1,
          },
          {
            name: "Spider Sting",
            level: 1,
          },
          {
            name: "Summon Plant or Fungus",
            level: 1,
          },
          {
            name: "Vomit Swarm",
            level: 2,
          },
          {
            name: "Fungal Infestation",
            level: 2,
          },
        ]),
        usesFreeArchetype: true,
      };

      expect(toCharacter(raz)).toEqual(parsedRazlin);
      expect(toCharacter(haruno)).toEqual(parsedHaruya);
    });
  });
});
