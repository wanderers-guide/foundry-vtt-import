import { CharacterPF2e } from "../types/character-data";
import { ParsedCharacter } from "../types/parser";
import { Class } from "../types/system";

export const getFoundryFeatName = (n: string, className: Class): string => n;

export const mapParsedFeatsToFoundryFeatNames = (data: ParsedCharacter) => {
  return data.feats.map((f) => ({
    ...f,
    name: getFoundryFeatName(f.name, data.class),
  }));
};

export const addFeat = (actor: CharacterPF2e, feat: any) => {};
