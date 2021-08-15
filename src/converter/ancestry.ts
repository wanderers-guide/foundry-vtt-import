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

export const addAncestry = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const game = getGame();
  if (!game) return;
  const ancestryCompendium = await getPF2ECompendiumDocuments("ancestries");
  const existingAncestries = actor.items.filter(
    (item) => item.type === "ancestry"
  );

  if (!ancestryCompendium.length) {
    debugLog("addAncestry() Unable to load pf2e.ancestries compendium");
    return;
  }

  const ancestryToAdd = ancestryCompendium.find(
    (c) => c.name?.toLowerCase() === data.ancestry.name
  ) as Item;

  if (!ancestryToAdd) {
    debugLog("addAncestry() Unable to find ancestry in compendium", {
      ancestry: data.ancestry,
    });
    return;
  }

  if (existingAncestries.length > 0) {
    debugLog("addAncestry() Deleting existing ancestries", {
      existingAncestries,
    });
    await actor.deleteEmbeddedDocuments(
      "Item",
      existingAncestries.map((c) => c.id as string)
    );
  }

  debugLog("addAncestry() Adding ancestry", { ancestryToAdd });
  const [addedAncestry] = await actor.createEmbeddedDocuments("Item", [
    ancestryToAdd.data as Record<string, any>,
  ]);

  return addedAncestry;
};

type AncestryDataFeat = {
  level: number | string;
  id: string;
  pack: string;
  name: string;
  img: string;
};
/**
 * @see https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/item/abc/abc-manager.ts#L53
 */
export const addAncestryFeatures = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const ancestry = actor.items.find((item) => item.type === "ancestry");

  if (!ancestry) {
    throw new Error(
      "addAncestryFeatures() Actor must have an ancestry assigned before calling this function."
    );
  }

  const targetLevel = data.level;
  // Only grab feats that are at or below the characters level
  const ancestryFeatsToAdd = Object.values(
    (
      ancestry.data.data as {
        items: Record<string, AncestryDataFeat>;
      }
    ).items
  ).filter((item) => +item.level <= targetLevel);

  let featDocuments: ItemData[] = [];

  for (const feat of ancestryFeatsToAdd) {
    const compendiumFeat = await getCompendiumDocument(feat.pack, feat.id);
    if (!compendiumFeat) {
      debugLog("addAncestryFeatures() Unable to find compendium feat", {
        feat,
      });
      continue;
    }
    featDocuments = [...featDocuments, compendiumFeat.data];
  }

  debugLog("addAncestryFeatures() Adding ancestry features", { featDocuments });
  const addedFeats = await actor.createEmbeddedDocuments(
    "Item",
    featDocuments as Record<string, any>[]
  );

  return addedFeats;
};
