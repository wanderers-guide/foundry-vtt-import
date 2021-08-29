import { propEq } from "ramda";
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

export const addClass = async (actor: CharacterPF2e, data: ParsedCharacter) => {
  // 1. Get existing class item
  const game = getGame();
  if (!game) return;
  const classCompendium = (await getPF2ECompendiumDocuments(
    "classes"
  )) as ItemPF2e[];
  const existingClasses = actor.items.filter(propEq("type", "class"));
  // 2. Find class in compendium
  if (!classCompendium.length) {
    debugLog("addClass() Unable to load pf2e.classes compendium");
    return;
  }

  const classToAdd = classCompendium.find(propEq("slug", getSlug(data.class)));
  // 4. Add that class item to the actor, removing the old one if necessary
  if (!classToAdd) {
    debugLog("addClass() Unable to find class in compendium", {
      class: data.class,
      slug: getSlug(data.class),
    });
    return;
  }

  if (existingClasses.length > 0) {
    debugLog("addClass() Deleting existing classes", { existingClasses });
    await actor.deleteEmbeddedDocuments(
      "Item",
      existingClasses.map((c) => c.id).filter(isString)
    );
  }

  debugLog("addClass() Adding class", { classToAdd });
  const [addedClass] = await actor.createEmbeddedDocuments("Item", [
    classToAdd.data as Record<string, any>,
  ]);

  return addedClass;
};

/**
 * @see https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/blob/master/src/module/item/abc/abc-manager.ts#L53
 */
export const addClassFeatures = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const actorClass = actor.class;

  if (!actorClass) {
    throw new Error(
      "addClassFeatures() Actor must have class assigned before calling this function."
    );
  }

  const targetLevel = data.level;
  // Only grab feats that are at or below the characters level
  const classFeatsToAdd = Object.values(actorClass.data.data.items).filter(
    (item) => +item.level <= targetLevel
  );

  let featDocuments: FeatPF2e["data"][] = [];

  for (const feat of classFeatsToAdd) {
    const compendiumFeat = (await getCompendiumDocument(feat.pack, feat.id)) as
      | FeatPF2e
      | null
      | undefined;
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
