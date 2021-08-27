import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import { Class } from "../types/system";
import { SourceType } from "../types/wanderers-guide-types";
import { debugLog, getGame, getPF2ECompendiumDocuments } from "../utils/module";

type FeatTuple = [ItemData, ParsedCharacter["feats"][number]];

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

    featsToAdd = [...featsToAdd, [compendiumFeat.data, feat]];
  }

  const featsAssignedToSlots: ItemData[] = featsToAdd.map(
    ([foundryFeat, sourceFeat]) => {
      return mapFeatToSlot(
        [foundryFeat, sourceFeat],
        actor,
        !!(game && game.settings.get("pf2e", "freeArchetypeVariant"))
      );
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
            (i.data.data as { featType: { value: string } }).featType.value
          )
      )
      .map((f) => f.id as string)
  );
};

const mapFeatToSlot = (
  [foundryFeat, sourceFeat]: FeatTuple,
  actor: CharacterPF2e,
  freeArchetypeVariant?: boolean
) => {
  let locationKey: string | null = getFoundryFeatLocation(
    (foundryFeat.data as { data?: { featType?: { value: FeatType } } })?.data
      ?.featType?.value,
    sourceFeat.levelAcquired,
    sourceFeat.featSource,
    freeArchetypeVariant
  );

  if (locationKey === "BACKGROUND") {
    locationKey = actor.background?.id ?? null;
  }

  return {
    ...foundryFeat,
    data: {
      ...foundryFeat.data,
      location: locationKey,
    },
  };
};

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

/**
 * @see {@link https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/actor/character/sheet.ts#L166}
 */
const getFoundryFeatLocation = (
  featType: FeatType | SlottableFeatType | undefined,
  level: number,
  featSource?: SourceType,
  freeArchetypeEnabled: boolean = false
): `${SlottableFeatType}-${number}` | "BACKGROUND" | null => {
  if (!level || !featType) return null;

  const generalFeatLevels = [3, 7, 11, 15, 19];

  /**
   * Special case for background feat: feat slot name is the id of the actors background
   * @see {@link https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/actor/character/sheet.ts#L407}
   */
  if (featSource === "background" && featType === "skill" && level === 1) {
    return "BACKGROUND";
  }

  // Feats that are both general feats and skill feats (like Kip-up) are marked as skill feats.
  // If you had chosen such a feat on a general feat level, put it in the right spot
  if (
    generalFeatLevels.includes(level) &&
    ["general", "skill"].includes(featType)
  ) {
    return `general-${level}`;
  }

  if (
    freeArchetypeEnabled &&
    featType === "archetype" &&
    level >= 2 &&
    level % 2 === 0
  ) {
    return `${featType}-${level}`;
  } else if (isSlottableFeatType(featType) && featType !== "archetype") {
    return `${featType}-${level}`;
  }

  return null;
};

const isSlottableFeatType = (
  featType: string
): featType is SlottableFeatType => {
  return ["ancestry", "archetype", "class", "general", "skill"].includes(
    featType
  );
};
