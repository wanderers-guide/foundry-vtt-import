import { assocPath, propEq } from "ramda";
import { CharacterPF2e, FeatPF2e, ItemPF2e } from "../types";
import { ParsedCharacter } from "../types/parser";
import { isString } from "../utils/guards";
import {
  debugLog,
  getCompendiumDocument,
  getGame,
  getPF2ECompendiumDocuments,
  getSlug,
} from "../utils/module";

// Identical process to what happens in `./class.ts`

export const addBackground = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const game = getGame();
  if (!game) return;
  const backgroundCompendium = (await getPF2ECompendiumDocuments(
    "backgrounds"
  )) as ItemPF2e[];
  const existingBackgrounds = actor.items.filter(propEq("type", "background"));

  if (!backgroundCompendium.length) {
    debugLog("addBackground() Unable to load pf2e.backgrounds compendium");
    return;
  }

  const backgroundToAdd = backgroundCompendium.find(
    propEq("slug", getSlug(data.background))
  );

  if (!backgroundToAdd) {
    debugLog("addBackground() Unable to find background in compendium", {
      background: data.background,
      slug: getSlug(data.background),
    });
    return;
  }

  if (existingBackgrounds.length > 0) {
    debugLog("addBackground() Deleting existing backgrounds", {
      existingBackgrounds,
    });
    await actor.deleteEmbeddedDocuments(
      "Item",
      existingBackgrounds.map((c) => c.id).filter(isString)
    );
  }

  debugLog("addBackground() Adding background", { backgroundToAdd });
  const [addedbackground] = await actor.createEmbeddedDocuments("Item", [
    backgroundToAdd.data as Record<string, any>,
  ]);

  return addedbackground;
};

type BackgroundDataFeat = {
  level: number | string;
  id: string;
  pack: string;
  name: string;
  img: string;
};
/**
 * @see https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/item/abc/abc-manager.ts#L53
 */
export const addBackgroundFeatures = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const background = actor.items.find(propEq("type", "background")) as
    | ItemPF2e
    | undefined;

  if (!background) {
    throw new Error(
      "addBackgroundFeatures() Actor must have an background assigned before calling this function."
    );
  }

  const targetLevel = data.level;
  // Only grab feats that are at or below the characters level
  const backgroundFeatsToAdd = Object.values(
    (
      background.data.data as {
        items: Record<string, BackgroundDataFeat>;
      }
    ).items
  ).filter((item) => +item.level <= targetLevel);

  let featDocuments: FeatPF2e["data"][] = [];

  for (const feat of backgroundFeatsToAdd) {
    const compendiumFeat = (await getCompendiumDocument(feat.pack, feat.id)) as
      | FeatPF2e
      | null
      | undefined;
    if (!compendiumFeat) {
      debugLog("addBackgroundFeatures() Unable to find compendium feat", feat);
      continue;
    }
    let location = null;
    if (feat.pack === "pf2e.feats-srd") {
      location = background.id;
    }

    featDocuments = [
      ...featDocuments,
      assocPath(["data", "data", "location"], location, compendiumFeat).data,
    ];
  }

  debugLog("addBackgroundFeatures() Adding background features", {
    featDocuments,
  });
  const addedFeats = await actor.createEmbeddedDocuments(
    "Item",
    featDocuments as Record<string, any>[]
  );

  return addedFeats;
};
