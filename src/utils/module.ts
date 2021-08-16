export const moduleKey = "wanderers-guide-character-importer";
export const settingKeys = {
  debug: "debug",
} as const;

export function getGame(): Game | null {
  if (game instanceof Game) {
    return game;
  }

  debugLog("getGame() returning null");
  return null;
}

type GameSetting = typeof settingKeys[keyof typeof settingKeys];
export function setSetting(setting: GameSetting, value: any) {
  const game = getGame();
  if (!game) return;

  game.settings.set(moduleKey, setting, value);
}

export function getSetting(setting: GameSetting) {
  const game = getGame();
  if (!game) return;

  return game.settings.get(moduleKey, setting);
}

export function registerSetting(
  setting: "debug",
  value: ClientSettings.PartialSetting<boolean>
): void;
export function registerSetting<T extends unknown>(
  setting: GameSetting,
  value: ClientSettings.PartialSetting<T>
) {
  const game = getGame();

  if (!game) return;

  return game.settings.register(moduleKey, setting, value);
}
export function debugLog(...stuff: unknown[]) {
  const isDebugEnabled = getSetting("debug") ?? false;
  if (isDebugEnabled) {
    console.log(
      "%cWanderer's Guide Character Importer Debug:",
      "color: white; font-weight: bold; background: green; padding: 2px; border-radius: 2px;",
      ...stuff
    );
  }
}

export async function getCompendiumDocuments(pack: string) {
  const game = getGame();
  if (!game) return [];

  debugLog(`getCompendiumDocuments() Opening ${pack}`);

  return game.packs.get(pack)?.getDocuments() ?? [];
}

export async function getCompendiumDocument(pack: string, id: string) {
  const game = getGame();
  if (!game) return;

  debugLog(`getCompendiumDocuments() Opening ${pack}, fetching document ${id}`);

  return game.packs.get(pack)?.getDocument(id);
}

export async function getPF2ECompendiumDocuments(
  pack:
    | "classes"
    | "ancestries"
    | "backgrounds"
    | "feats-srd"
    | "ancestryfeatures"
) {
  return getCompendiumDocuments(`pf2e.${pack}`);
}
