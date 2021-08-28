import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { propEq } from "ramda";
import { CharacterPF2e, FeatPF2e } from "../types";
import { ParsedCharacter } from "../types/parser";
import { Class } from "../types/system";
import { SourceType } from "../types/wanderers-guide-types";
import {
  debugLog,
  getGame,
  getPF2ECompendiumDocuments,
  getSlug,
} from "../utils/module";

type FeatTuple = [FeatPF2e, ParsedCharacter["feats"][number]];
type FeatType = FeatPF2e["featType"]["value"];
type SlottableFeatType = Extract<
  FeatType,
  "ancestry" | "archetype" | "class" | "general" | "skill"
>;

export const getFoundryFeatName = (
  name: string,
  className?: Class | null
): string => {
  switch (className) {
    case "Alchemist":
      return getFeatVariant(name, className, ["Efficient Alchemy"]);
    case "Barbarian":
      return getFeatVariant(name, className, ["Reckless Abandon"]);
    case "Bard":
      return getFeatVariant(name, className, ["Know-It-All", "Soulsight"]);
    case "Champion":
      return getFeatVariant(name, className, ["Shield Warden"]);
    case "Druid":
      return getFeatVariant(name, className, ["Animal Companion"]);
    case "Fighter":
      return getFeatVariant(name, className, [
        "Attack of Opportunity",
        "Dueling Dance",
        "Dueling Parry",
        "Guardian's Deflection",
        "Impossible Volley",
        "Improved Twin Riposte",
        "Ricochet Stance",
        "Shield Warden",
        "Stance Savant",
        "Twinned Defense",
      ]);
    case "Investigator":
      return getFeatVariant(name, className, [
        "Implausible Purchase",
        "Master Spotter",
        "Predictive Purchase",
        "Skill Mastery",
      ]);
    case "Monk":
      return getFeatVariant(name, className, [
        "Shattering Strike",
        "Stance Savant",
      ]);
    case "Ranger":
      return getFeatVariant(name, className, [
        "Animal Companion",
        "Impossible Volley",
        "Improved Twin Riposte",
        "Incredible Companion",
        "Master Spotter",
        "Mature Animal Companion",
        "Side by Side",
        "Specialized Companion",
      ]);
    case "Rogue":
      return getFeatVariant(name, className, [
        "Evasiveness",
        "Implausible Purchase",
        "Predictive Purchase",
        "Ricochet Stance",
        "Skill Mastery",
        "Tumble Behind",
      ]);
    case "Sorcerer":
      return getFeatVariant(name, className, [
        "Blessed Blood",
        "Counterspell",
        "Soulsight",
      ]);
    case "Swashbuckler":
      return getFeatVariant(name, className, [
        "Dueling Dance",
        "Dueling Parry",
        "Evasiveness",
        "Guardian's Deflection",
        "Incredible Luck",
        "Tumble Behind",
        "Twinned Defense",
      ]);
    case "Witch":
      return getFeatVariant(name, className, [
        "Counterspell",
        "Improved Familiar",
        "Incredible Familiar",
      ]);
    case "Wizard":
      return getFeatVariant(name, className, ["Counterspell"]);
    default:
      return getSlug(name);
  }
};

/**
 *
 * @param wanderersGuideFeatName The name of the feat from wanderer's guide
 * @param className The name of the class (Monk, Alchemist, Investigator, etc)
 * @param featsWithClassSpecificVariations Feats that have class specific variations in Foundry (Predictive Purchase (Investigator), Predictive Purchase (Rogue))
 * @returns The slug for the class specific variation (if any), or the slug for the feat.
 * @example ```ts
 * const featSlug = getFeatVariant("Predictive Purchase", "Investigator", ["Predictive Purchase", "Implausible Purchase"]); // predictive-purchase-investigator
 * const featSlug = getFeatVariant("Some Other Feat", "Investigator", ["Predictive Purchase", "Implausible Purchase"]); // some-other-feat
 * ```
 */
export const getFeatVariant = (
  wanderersGuideFeatName: string,
  className: Class,
  featsWithClassSpecificVariations: string[] = []
) => {
  const classVariant = `${wanderersGuideFeatName} (${className})`;
  return featsWithClassSpecificVariations
    .map((c) => c.toLowerCase())
    .includes(wanderersGuideFeatName.toLowerCase())
    ? getSlug(classVariant)
    : getSlug(wanderersGuideFeatName);
};

export const addFeats = async (actor: CharacterPF2e, data: ParsedCharacter) => {
  const game = getGame();
  const actorClassName: Class | null | undefined = actor.class?.name as
    | Class
    | null
    | undefined;
  const compendiumFeats = (await getPF2ECompendiumDocuments(
    "feats-srd"
  )) as FeatPF2e[];
  const actorFeats = actor.data.items.filter(
    propEq("type", "feat")
  ) as FeatPF2e[];
  let featsToAdd: FeatTuple[] = [];

  for (const feat of data.feats) {
    const compendiumFeat = compendiumFeats.find(
      propEq("slug", getFoundryFeatName(feat.name, actorClassName))
    );

    if (!compendiumFeat) {
      debugLog("addFeats() Cannot find feat!", {
        name: feat.name,
        actorClassName,
        slug: getFoundryFeatName(feat.name, actorClassName as Class),
      });
      continue;
    } else if (
      featsToAdd.some((f) => f[0].id === compendiumFeat.id) &&
      actorFeats.some((f) => f.name === compendiumFeat.name)
    ) {
      debugLog("addFeats() Skipping duplicate feat!", compendiumFeat);
      continue;
    }
    // Stringify and parse to use effectively a copy of the data.
    featsToAdd = [
      ...featsToAdd,
      [JSON.parse(JSON.stringify(compendiumFeat.data)), feat],
    ];
  }

  let usedLocations: string[] = [];
  const featsAssignedToSlots = [...featsToAdd]
    .sort((a, b) => {
      const [aFeat] = a;
      const [bFeat] = b;
      // Let's always add archetype feats last so they do not hog class feat slots.
      if (aFeat.featType?.value === "archetype") {
        return 1;
      } else if (bFeat.featType?.value === "archetype") {
        return -1;
      }

      // If the feat is a general feat, we want to ensure that those come first
      // (since we don't want to accidentally assign a skill feat to a general feat slot).
      if (aFeat.featType?.value === "general") {
        return -1;
      } else if (bFeat.featType?.value === "general") {
        return 1;
      }

      return 0;
    })
    .map(([foundryFeat, sourceFeat]) => {
      let location: string | null = getFoundryFeatLocation(
        foundryFeat.featType?.value,
        sourceFeat.levelAcquired,
        sourceFeat.featSource,
        !!(game && game.settings.get("pf2e", "freeArchetypeVariant")),
        usedLocations
      );

      if (location === "BACKGROUND") {
        location = actor.background?.id ?? null;
      }

      if (location) {
        usedLocations = [...usedLocations, location];
        debugLog("addFeats() Adding feat to slot:", location, foundryFeat);
      } else {
        debugLog("addFeats() Adding feat:", foundryFeat);
      }

      return {
        ...foundryFeat,
        data: {
          ...foundryFeat.data,
          location,
        },
      };
    });

  const createdFeats = await actor.createEmbeddedDocuments(
    "Item",
    featsAssignedToSlots as Record<string, any>[]
  );

  return createdFeats;
};

export const purgeFeatsAndFeatures = (actor: CharacterPF2e) => {
  debugLog("purgeFeatsAndFeatures() Removing all feats!");
  const undeletableFeatTypes = ["ancestryfeature"];
  return actor.deleteEmbeddedDocuments(
    "Item",
    actor.data.items
      .filter(
        (i) =>
          i.type === "feat" &&
          !undeletableFeatTypes.includes(
            (i.data.data as { featType: { value: FeatType } }).featType.value
          )
      )
      .map((f) => f.id as string)
  );
};

/**
 * @see {@link https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/actor/character/sheet.ts#L166}
 */
const getFoundryFeatLocation = (
  featType: FeatType | SlottableFeatType | undefined,
  level: number,
  featSource?: SourceType,
  freeArchetypeEnabled: boolean = false,
  usedLocations: string[] = []
): `${SlottableFeatType}-${number}` | "BACKGROUND" | null => {
  if (!level || !featType) return null;
  const generalFeatLevels = [3, 7, 11, 15, 19];
  let location: ReturnType<typeof getFoundryFeatLocation> = null;

  /**
   * Special case for background feat: feat slot name is the id of the actors background
   * @see {@link https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/actor/character/sheet.ts#L407}
   */
  if (featSource === "background" && featType === "skill" && level === 1) {
    location = "BACKGROUND";
  }
  // Feats that are both general feats and skill feats (like Kip-up) are marked as skill feats.
  // If you had chosen such a feat on a general feat level, put it in the right spot.
  // Certain classes (like Investigator) get Skill Feats every level. In this case, we will fall back
  // to the default feat behaviour of `type-level`, if we had already assigned a general feat.
  else if (
    generalFeatLevels.includes(level) &&
    ["general", "skill"].includes(featType) &&
    !usedLocations.includes(`general-${level}`)
  ) {
    location = `general-${level}`;
  } else if (isSlottableFeatType(featType) && featType !== "archetype") {
    location = `${featType}-${level}`;
  } else if (featType === "archetype") {
    const archetypeLocation = `archetype-${level}` as const;
    const classLocation = `class-${level}` as const;
    // If free archetype is on, but we are already using that particular slot
    // then we will want to try to use the class location instead
    if (freeArchetypeEnabled && usedLocations.includes(archetypeLocation)) {
      location = classLocation;
    } else if (freeArchetypeEnabled) {
      location = archetypeLocation;
    } else {
      location = classLocation;
    }
  }
  // if we are already using the slot, return null. Otherwise let's goooo
  return usedLocations.includes(location ?? "") ? null : location;
};

const isSlottableFeatType = (
  featType: string
): featType is SlottableFeatType => {
  return ["ancestry", "archetype", "class", "general", "skill"].includes(
    featType
  );
};
