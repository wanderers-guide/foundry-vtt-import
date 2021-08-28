import Document from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs";
import { CharacterPF2e } from "../types";

import { ParsedCharacter } from "../types/parser";
import { debugLog } from "../utils/module";

export const addLoreSkills = async (
  actor: CharacterPF2e,
  data: ParsedCharacter
) => {
  const foundryLoreSkills = Object.entries(data.proficiencies.lore).map(
    ([name, rank]) => {
      return {
        name: name.replace(/\blore\b/gi, ""),
        type: "lore",
        data: {
          proficient: {
            value: rank,
          },
          featType: "",
          mod: {
            value: 0,
          },
          item: {
            value: 0,
          },
        },
      };
    }
  );

  const hasPreExistingLoreSkill = (loreSkill: typeof foundryLoreSkills[0]) =>
    actor.data.items.some(
      (item) => item.data.name === loreSkill.name && item.type === "lore"
    );

  const skillsToCreate = foundryLoreSkills.filter(
    (loreSkill) => !hasPreExistingLoreSkill(loreSkill)
  );

  const skillsToUpdate = foundryLoreSkills.filter(hasPreExistingLoreSkill);
  let createdLoreSkills: Document<any, CharacterPF2e>[] = [];
  let updatedLoreSkills: Document<any, CharacterPF2e>[] = [];

  debugLog("addLoreSkills() Creating/updating lore skills", {
    skillsToCreate,
    skillsToUpdate,
  });
  if (skillsToCreate.length) {
    createdLoreSkills = await actor.createEmbeddedDocuments(
      "Item",
      skillsToCreate
    );
  }
  if (skillsToUpdate.length) {
    updatedLoreSkills = await actor.updateEmbeddedDocuments(
      "Item",
      skillsToUpdate
    );
  }

  return [...createdLoreSkills, ...updatedLoreSkills];
};
