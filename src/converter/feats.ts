import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import { Class } from "../types/system";
import { SourceType } from "../types/wanderers-guide-types";
import { debugLog, getGame, getPF2ECompendiumDocuments } from "../utils/module";

type FeatTuple = [ItemData, ParsedCharacter["feats"][number]];
type FeatType =
  | "classfeature"
  | "class"
  | "skill"
  | "heritage"
  | "ancestry"
  | "archetype"
  | "general";
type SlottableFeatType = Extract<
  FeatType,
  "ancestry" | "archetype" | "class" | "general" | "skill"
>;

export const getFoundryFeatName = (
  n: string,
  className?: Class | null
): string => n;

export const addFeats = async (actor: CharacterPF2e, data: ParsedCharacter) => {
  const game = getGame();
  const actorClassName: Class | null | undefined = actor.class?.name as
    | Class
    | null
    | undefined;
  const compendiumFeats = await getPF2ECompendiumDocuments("feats-srd");
  const actorFeats: Item[] = actor.data.items.filter((i) => i.type === "feat");
  let featsToAdd: FeatTuple[] = [];

  for (const feat of data.feats) {
    const compendiumFeat = compendiumFeats.find(
      (item) =>
        item.name?.toLowerCase() ===
        getFoundryFeatName(feat.name, actorClassName).toLowerCase()
    );

    if (!compendiumFeat) {
      debugLog("addFeats() Cannot find feat!", {
        name: feat.name,
        actorClassName,
        convertedName: getFoundryFeatName(feat.name, actorClassName as Class),
      });
      continue;
    } else if (actorFeats.some((f) => f.name === compendiumFeat.name)) {
      debugLog("addFeats() Skipping duplicate feat!", {
        feat: compendiumFeat,
      });
      continue;
    }
    // Stringify and parse to use effectively a copy of the data.
    featsToAdd = [
      ...featsToAdd,
      [JSON.parse(JSON.stringify(compendiumFeat.data)), feat],
    ];
  }

  let usedLocations: string[] = [];
  const featsAssignedToSlots: ItemData[] = featsToAdd.map(
    ([foundryFeat, sourceFeat]) => {
      debugLog("Mapping feat", foundryFeat);
      let location: string | null = getFoundryFeatLocation(
        (
          foundryFeat as unknown as ItemData & {
            featType?: { value: FeatType };
          }
        ).featType?.value,
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
        debugLog("Feat Location:", location, foundryFeat);
      }

      return {
        ...foundryFeat,
        data: {
          ...foundryFeat.data,
          location,
        },
      };
    }
  ) as ItemData[];

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
  debugLog("getFoundryFeatLocation()", {
    featType,
    level,
    featSource,
    freeArchetypeEnabled,
    usedLocations,
  });
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
  // If you had chosen such a feat on a general feat level, put it in the right spot
  else if (
    generalFeatLevels.includes(level) &&
    ["general", "skill"].includes(featType)
  ) {
    location = `general-${level}`;
  } else if (isSlottableFeatType(featType) && featType !== "archetype") {
    location = `${featType}-${level}`;
  } else if (featType === "archetype") {
    const archetypeLocation = `archetype-${level}` as const;
    const classLocation = `class-${level}` as const;
    // If free archetype is on, but we are already using that particular slot
    // then we will want to try to use the class location instead
    if (
      freeArchetypeEnabled &&
      usedLocations.includes(archetypeLocation) &&
      !usedLocations.includes(classLocation)
    ) {
      location = classLocation;
    }

    location = freeArchetypeEnabled ? archetypeLocation : classLocation;
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
