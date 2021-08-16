import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import {
  debugLog,
  getCompendiumDocument,
  getGame,
  getPF2ECompendiumDocuments,
} from "../utils/module";

export const addClass = async (actor: CharacterPF2e, data: ParsedCharacter) => {
  // 1. Get existing class item
  const game = getGame();
  if (!game) return;
  const classCompendium = await getPF2ECompendiumDocuments("classes");
  const existingClasses = actor.items.filter((item) => item.type === "class");
  // 2. Find class in compendium
  if (!classCompendium.length) {
    debugLog("addClass() Unable to load pf2e.classes compendium");
    return;
  }

  const classToAdd = classCompendium.find(
    (c) => c.name?.toLowerCase() === data.class.toLowerCase()
  ) as Item;
  // 4. Add that class item to the actor, removing the old one if necessary
  if (!classToAdd) {
    debugLog("addClass() Unable to find class in compendium", {
      class: data.class,
    });
    return;
  }

  if (existingClasses.length > 0) {
    debugLog("addClass() Deleting existing classes", { existingClasses });
    await actor.deleteEmbeddedDocuments(
      "Item",
      existingClasses.map((c) => c.id as string)
    );
  }

  debugLog("addClass() Adding class", { classToAdd });
  const [addedClass] = await actor.createEmbeddedDocuments("Item", [
    classToAdd.data as Record<string, any>,
  ]);

  return addedClass;
};

type ClassDataFeat = {
  level: number | string;
  id: string;
  pack: string;
  name: string;
  img: string;
};
/**
 * @see https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/item/abc/abc-manager.ts#L53
 */
export const addClassFeatures = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const actorClass = actor.items.find((item) => item.type === "class");

  if (!actorClass) {
    throw new Error(
      "addClassFeatures() Actor must have class assigned before calling this function."
    );
  }

  const targetLevel = data.level;
  // Only grab feats that are at or below the characters level
  const classFeatsToAdd = Object.values(
    (
      actorClass.data.data as {
        items: Record<string, ClassDataFeat>;
      }
    ).items
  ).filter((item) => +item.level <= targetLevel);

  let featDocuments: ItemData[] = [];

  for (const feat of classFeatsToAdd) {
    const compendiumFeat = await getCompendiumDocument(feat.pack, feat.id);
    if (!compendiumFeat) {
      debugLog("addClassFeatures() Unable to find compendium feat", { feat });
      continue;
    }
    featDocuments = [...featDocuments, compendiumFeat.data];
  }

  debugLog("addClassFeatures() Adding class features", { featDocuments });
  const addedFeats = await actor.createEmbeddedDocuments(
    "Item",
    featDocuments as Record<string, any>[]
  );

  return addedFeats;
};
