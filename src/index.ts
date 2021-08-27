import { CharacterPF2e } from "./types/character-data";
import { setAbilitiesAndProficiencies } from "./converter/core";
import { parseWanderersGuideJSON, toCharacter } from "./parser";
import { UnsupportedVersionError } from "./parser/helpers";
import { debugLog, registerSetting } from "./utils/module";
import { addClass, addClassFeatures } from "./converter/class";
import {
  addAncestry,
  addAncestryFeatures,
  addHeritageFeat,
} from "./converter/ancestry";
import { addBackground, addBackgroundFeatures } from "./converter/background";
import { addFeats, purgeFeatsAndFeatures } from "./converter/feats";

Hooks.on("ready", () => {
  registerSetting("debug", {
    name: "Debug Mode",
    hint: "Enable debug logging to the browser console.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
});

Hooks.on(
  "renderActorSheet",
  (sheet: ActorSheet, elSheet: JQuery<HTMLDivElement>) => {
    // debugLog("Begin renderActorSheet handler");
    const { user } = game as Game;
    const { actor } = sheet;

    if (
      actor.data.type !== "character" ||
      !user ||
      !actor.canUserModify(user, "update")
    ) {
      debugLog(
        "renderActorSheet handler: aborted because of either no user, incorrect sheet type, or insufficient permissions",
        {
          type: actor.data.type,
          user,
          canModify: user && actor.canUserModify(user, "update"),
        }
      );

      return;
    }

    const title = elSheet.find("header.window-header h4.window-title");

    if (!title) {
      debugLog("renderActorSheet handler: no title element found", { title });
      return;
    }

    const openImportDialogButton: JQuery<HTMLAnchorElement> = $(
      '<a><i class="fas fa-file-import"></i> Import from Wanderer\'s Guide</a>'
    );
    openImportDialogButton.on("click", () => {
      renderDialogue(actor as CharacterPF2e);
    });
    // debugLog("renderActorSheet handler: inserting button into title", {
    //   title,
    //   openImportDialogButton,
    // });
    openImportDialogButton.insertAfter(title);
  }
);

function renderDialogue(actor: CharacterPF2e) {
  debugLog("Begin renderDialogue");
  new Dialog({
    title: "Import Wanderer's Guide Character",
    content: `
        <div>
            <p>It's recommended to import into a fresh character sheet and not an existing one to avoid any potential issues.</p>
            <hr />
            <p>
                To export your character from Wanderer's Guide:
            <p>
            <ol>
                <li>Go to <a href="https://wanderersguide.app/profile/characters">your Wanderer's Guide characters list</a></li>
                <li>Click the "Options" button on the character you would like to export</li>
                <li>Select the "Export" option <em>(do not choose "Export to PDF")</em></li>
                <li>Save the downloaded file to your computer!</li>
                <li>Select the file you just downloaded in the input below and click "Import Character"!</li>
            </ol>
            <div class="form-group">
                <label for="feat-purge">Delete existing feats?</label>
                <input id="feat-purge" type="checkbox" checked>
            </div>
            <div class="form-group">
                <label for="char-file-import">Import .guidechar file</label>
                <input id="char-file-import" type="file" accept=".guidechar">
            </div>
        </div>
    `,
    buttons: {
      close: {
        label: "Nevermind",
      },
      import: {
        icon: '<i class="fas fa-file-import"></i>',
        label: "Import Character",
        callback: (el) => handleImport(el, actor),
      },
    },
    default: "close",
  }).render(true);
}

function handleImport(
  elDialog: HTMLElement | JQuery<HTMLElement>,
  actor: CharacterPF2e
) {
  debugLog("Begin handleImport");
  const el = $(elDialog);

  const fileInput = el.find("#char-file-import").get(0) as HTMLInputElement;
  const charFile = (fileInput.files ?? [])[0];
  const purgeFeatCheckbox = el.find("#feat-purge").get(0) as HTMLInputElement;

  debugLog({ purgeFeatCheckbox });

  if (!charFile) {
    ui.notifications?.error("Unable to find uploaded .guidechar file!");
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = (e) =>
    parseFile(e, actor, {
      purgeFeats: purgeFeatCheckbox.checked,
    });
  fileReader.readAsText(charFile);
}
type ParseFileOptions = {
  purgeFeats?: boolean;
};

async function parseFile(
  event: ProgressEvent<FileReader>,
  actor: CharacterPF2e,
  options: ParseFileOptions
) {
  debugLog("Begin parseFile");
  try {
    const parsedFile = parseWanderersGuideJSON(`${event.target?.result}`);
    const characterData = toCharacter(parsedFile);

    if (options.purgeFeats) {
      await purgeFeatsAndFeatures(actor);
    }

    // 1. Update the ABCs (Ancestry, Background, Class)
    await Promise.all([
      addAncestry(actor, characterData),
      addBackground(actor, characterData),
      addClass(actor, characterData),
    ]);
    // 2. Add ABC Features!
    await Promise.all([
      addAncestryFeatures(actor, characterData).catch(() => {}),
      addBackgroundFeatures(actor, characterData).catch(() => {}),
      addClassFeatures(actor, characterData).catch(() => {}),
      addHeritageFeat(actor, characterData).catch(() => {}),
    ]);
    // 3. Update actor stats / text fields / level / skills
    await setAbilitiesAndProficiencies(actor, characterData);
    // 5. Update actor feats (skipping duplicates added by class)
    await addFeats(actor, characterData);
    // 6. Create spell list?
    // 7. Import spells?
    // 8. Import equipment?
  } catch (error) {
    if (error instanceof UnsupportedVersionError) {
      ui.notifications?.error(error.message);
      return;
    }

    ui.notifications?.error("Unable to import uploaded file.");
    console.error(error);
  }
}
