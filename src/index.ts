import { CharacterPF2e } from "./types/character-data";
import { setAbilitiesAndProficiencies } from "./converter/core";
import { parseWanderersGuideJSON, toCharacter } from "./parser";
import { UnsupportedVersionError } from "./parser/helpers";
import { debugLog, registerSetting } from "./utils/module";
import { addClass, addClassFeatures } from "./converter/class";

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
    debugLog("Begin renderActorSheet handler");
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

    const openImportDialogButton: JQuery<HTMLButtonElement> = $(
      '<button><i class="fas fa-file-import">Import from Wanderer\'s Guide</button>'
    );
    openImportDialogButton.on("click", () => {
      renderDialogue(actor);
    });
    debugLog("renderActorSheet handler: inserting button into title", {
      title,
      openImportDialogButton,
    });
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

  if (!charFile) {
    ui.notifications?.error("Unable to find uploaded .guidechar file!");
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = (e) => parseFile(e, actor);
  fileReader.readAsText(charFile);
}

async function parseFile(
  event: ProgressEvent<FileReader>,
  actor: CharacterPF2e
) {
  debugLog("Begin parseFile");
  try {
    const parsedFile = parseWanderersGuideJSON(`${event.target?.result}`);
    const characterData = toCharacter(parsedFile);

    // 1. Update actor class
    await addClass(actor, characterData);
    // 2. Update actor stats / text fields / level / skills
    await setAbilitiesAndProficiencies(actor, characterData);
    // 3. Update actor feats (skipping duplicates added by class)
    await addClassFeatures(actor, characterData);
    // 4. Create spell list?
    // 5. Import spells?
    // 6. Import equipment?
  } catch (error) {
    if (error instanceof UnsupportedVersionError) {
      ui.notifications?.error(error.message);
      return;
    }

    ui.notifications?.error("Unable to import uploaded file.");
    console.error(error);
  }
}
