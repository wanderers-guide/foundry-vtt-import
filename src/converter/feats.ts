import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs";
import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import { Class } from "../types/system";
import { debugLog, getPF2ECompendiumDocuments } from "../utils/module";

export const getFoundryFeatName = (n: string, className: Class): string => n;

export const addFeats = async (actor: CharacterPF2e, data: ParsedCharacter) => {
  const actorClassName = actor.class.name;
  const compendiumFeats = await getPF2ECompendiumDocuments("feats-srd");
  const actorFeats: Item[] = actor.data.items.filter((i) => i.type === "feat");
  let featsToAdd: ItemData[] = [];

  for (const feat of data.feats) {
    const compendiumFeat = compendiumFeats.find(
      (item) =>
        item.name?.toLowerCase() ===
        getFoundryFeatName(feat.name, actorClassName as Class).toLowerCase()
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

    featsToAdd = [...featsToAdd, compendiumFeat.data];
  }

  const createdFeats = await actor.createEmbeddedDocuments(
    "Item",
    featsToAdd as Record<string, any>[]
  );

  return createdFeats;
};

export const purgeFeatsAndFeatures = (actor: CharacterPF2e) => {
  debugLog("purgeFeatsAndFeatures() Removing all feats!");
  const undeletableFeatTypes = ["ancestryfeatures"];
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
