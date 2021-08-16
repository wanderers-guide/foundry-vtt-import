import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import {
  debugLog,
  getCompendiumDocument,
  getGame,
  getPF2ECompendiumDocuments,
} from "../utils/module";

// Identical process to what happens in `./class.ts`

export const addBackground = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const game = getGame();
  if (!game) return;
  const backgroundCompendium = await getPF2ECompendiumDocuments("backgrounds");
  const existingBackgrounds = actor.items.filter(
    (item) => item.type === "background"
  );

  if (!backgroundCompendium.length) {
    debugLog("addBackground() Unable to load pf2e.backgrounds compendium");
    return;
  }

  const backgroundToAdd = backgroundCompendium.find(
    (c) => c.name?.toLowerCase() === data.background.toLowerCase()
  ) as Item;

  if (!backgroundToAdd) {
    debugLog("addBackground() Unable to find background in compendium", {
      background: data.background,
    });
    return;
  }

  if (existingBackgrounds.length > 0) {
    debugLog("addBackground() Deleting existing ancestries", {
      existingBackgrounds,
    });
    await actor.deleteEmbeddedDocuments(
      "Item",
      existingBackgrounds.map((c) => c.id as string)
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
  const background = actor.items.find((item) => item.type === "background");

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

  let featDocuments: ItemData[] = [];

  for (const feat of backgroundFeatsToAdd) {
    const compendiumFeat = await getCompendiumDocument(feat.pack, feat.id);
    if (!compendiumFeat) {
      debugLog("addBackgroundFeatures() Unable to find compendium feat", {
        feat,
      });
      continue;
    }
    featDocuments = [...featDocuments, compendiumFeat.data];
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
