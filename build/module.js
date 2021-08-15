var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("types/system", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/parser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("converter/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addLoreSkills = exports.toCharacterUpdateMap = exports.convertCharacterToActor = exports.updateActor = void 0;
    const updateActor = (actor, changes = {}) => {
        return actor
            .update(changes)
            .then((updatedActor) => [updatedActor || actor, !!updatedActor]);
    };
    exports.updateActor = updateActor;
    const convertCharacterToActor = (actor, data) => __awaiter(void 0, void 0, void 0, function* () {
        const updateMap = exports.toCharacterUpdateMap(data);
        const [, hadChanges] = yield exports.updateActor(actor, updateMap);
        const changedOrUpdatedDocuments = yield exports.addLoreSkills(actor, data);
        return hadChanges || changedOrUpdatedDocuments;
    });
    exports.convertCharacterToActor = convertCharacterToActor;
    const toCharacterUpdateMap = (data) => {
        return {
            name: data.name,
            "token.name": data.name,
            "data.details.heritage.value": data.heritage.name,
            "data.details.level.value": data.level,
            "data.traits.languages.value": data.languages.map((l) => l.toLowerCase()),
            "data.traits.size.value": "sm",
            "data.abilities.str.value": data.abilities.str,
            "data.abilities.dex.value": data.abilities.dex,
            "data.abilities.con.value": data.abilities.con,
            "data.abilities.int.value": data.abilities.int,
            "data.abilities.wis.value": data.abilities.wis,
            "data.abilities.cha.value": data.abilities.cha,
            "data.saves.fortitude.rank": data.proficiencies.saves.fortitude,
            "data.saves.reflex.rank": data.proficiencies.saves.reflex,
            "data.saves.will.rank": data.proficiencies.saves.will,
            "data.martial.heavy.rank": data.proficiencies.armour.heavy,
            "data.martial.medium.rank": data.proficiencies.armour.medium,
            "data.martial.light.rank": data.proficiencies.armour.light,
            "data.martial.unarmored.rank": data.proficiencies.armour.unarmored,
            "data.martial.advanced.rank": data.proficiencies.weapons.advanced,
            "data.martial.martial.rank": data.proficiencies.weapons.martial,
            "data.martial.simple.rank": data.proficiencies.weapons.simple,
            "data.martial.unarmed.rank": data.proficiencies.weapons.unarmed,
            "data.skills.acr.rank": data.proficiencies.skills.acr,
            "data.skills.arc.rank": data.proficiencies.skills.arc,
            "data.skills.ath.rank": data.proficiencies.skills.ath,
            "data.skills.cra.rank": data.proficiencies.skills.cra,
            "data.skills.dec.rank": data.proficiencies.skills.dec,
            "data.skills.dip.rank": data.proficiencies.skills.dip,
            "data.skills.itm.rank": data.proficiencies.skills.itm,
            "data.skills.med.rank": data.proficiencies.skills.med,
            "data.skills.nat.rank": data.proficiencies.skills.nat,
            "data.skills.occ.rank": data.proficiencies.skills.occ,
            "data.skills.prf.rank": data.proficiencies.skills.prf,
            "data.skills.rel.rank": data.proficiencies.skills.rel,
            "data.skills.soc.rank": data.proficiencies.skills.soc,
            "data.skills.ste.rank": data.proficiencies.skills.ste,
            "data.skills.sur.rank": data.proficiencies.skills.sur,
            "data.skills.thi.rank": data.proficiencies.skills.thi,
            "data.attributes.perception.rank": data.proficiencies.perception,
            "data.attributes.classDC.rank": data.proficiencies.classDC,
        };
    };
    exports.toCharacterUpdateMap = toCharacterUpdateMap;
    const addLoreSkills = (actor, data) => __awaiter(void 0, void 0, void 0, function* () {
        const foundryLoreSkills = Object.entries(data.proficiencies.lore).map(([name, rank]) => {
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
        });
        const hasPreExistingLoreSkill = (loreSkill) => actor.data.items.some((item) => item.data.name === loreSkill.name && item.type === "lore");
        const skillsToCreate = foundryLoreSkills.filter((loreSkill) => !hasPreExistingLoreSkill(loreSkill));
        const skillsToUpdate = foundryLoreSkills.filter(hasPreExistingLoreSkill);
        const createdLoreSkills = yield actor.createEmbeddedDocuments("Item", skillsToCreate);
        const updatedLoreSkills = yield actor.updateEmbeddedDocuments("Item", skillsToUpdate);
        return [...createdLoreSkills, ...updatedLoreSkills];
    });
    exports.addLoreSkills = addLoreSkills;
});
define("utils/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/wanderers-guide-types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("parser/helpers", ["require", "exports", "../../types/character-data"], function (require, exports, character_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validLanguages = exports.validSenses = exports.baseSkills = exports.UnsupportedVersionError = exports.getFoundryProficiencyFromLevel = exports.getCoreSkillTLA = exports.getAbilityTLA = exports.getAbilityName = exports.getClassId = exports.getClass = exports.classIdMap = void 0;
    exports.classIdMap = {
        265: "Alchemist",
        179: "Barbarian",
        269: "Bard",
        225: "Champion",
        325: "Cleric",
        268: "Fighter",
        355: "Gunslinger",
        358: "Inventor",
        324: "Investigator",
        329: "Magus",
        251: "Monk",
        279: "Oracle",
        258: "Ranger",
        261: "Rogue",
        232: "Sorcerer",
        335: "Summoner",
        295: "Swashbuckler",
        304: "Witch",
        260: "Wizard",
    };
    const getClass = (id) => exports.classIdMap[id];
    exports.getClass = getClass;
    const getClassId = (className) => {
        const classId = Object.keys(exports.classIdMap).find((id) => { var _a; return ((_a = exports.classIdMap[+id]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === className.toLowerCase(); });
        return classId ? +classId : undefined;
    };
    exports.getClassId = getClassId;
    const getAbilityName = (ability) => {
        switch (ability) {
            case "STR":
                return "Strength";
            case "DEX":
                return "Dexterity";
            case "CON":
                return "Constitution";
            case "WIS":
                return "Wisdom";
            case "INT":
                return "Intelligence";
            case "CHA":
                return "Charisma";
        }
    };
    exports.getAbilityName = getAbilityName;
    actor.name;
    // TLA means Three Letter Acronym
    const getAbilityTLA = (abilityName) => abilityName.slice(0, 3).toUpperCase();
    exports.getAbilityTLA = getAbilityTLA;
    const getCoreSkillTLA = (profName) => {
        const upperProfName = profName.toUpperCase();
        switch (upperProfName) {
            case "INTIMIDATION":
                return "ITM";
            case "PERFORMANCE":
                return "PRF";
            default:
                return upperProfName.slice(0, 3);
        }
    };
    exports.getCoreSkillTLA = getCoreSkillTLA;
    const getFoundryProficiencyFromLevel = (code) => {
        switch (code) {
            case "T":
                return character_data_1.ProficiencyRank.TRAINED;
            case "E":
                return character_data_1.ProficiencyRank.EXPERT;
            case "M":
                return character_data_1.ProficiencyRank.MASTER;
            case "L":
                return character_data_1.ProficiencyRank.LEGENDARY;
            default:
                return character_data_1.ProficiencyRank.UNTRAINED;
        }
    };
    exports.getFoundryProficiencyFromLevel = getFoundryProficiencyFromLevel;
    class UnsupportedVersionError extends Error {
    }
    exports.UnsupportedVersionError = UnsupportedVersionError;
    exports.baseSkills = [
        "Acrobatics",
        "Arcana",
        "Athletics",
        "Crafting",
        "Deception",
        "Diplomacy",
        "Intimidation",
        "Medicine",
        "Nature",
        "Occultism",
        "Performance",
        "Religion",
        "Society",
        "Stealth",
        "Survival",
        "Thievery",
    ];
    exports.validSenses = [
        "Darkvision",
        "Echolocation",
        "Greater Darkvision",
        "Lifesense",
        "Low-Light Vision",
        "Motionsense",
        "Scent",
        "Tremorsense",
        "Wavesense",
    ];
    exports.validLanguages = [
        "Abyssal",
        "Adlet",
        "Aklo",
        "Alghollthu",
        "Amurrun",
        "Anadi",
        "Androffan",
        "Anugobu",
        "Aquan",
        "Arboreal",
        "Arcadian",
        "Auran",
        "Azlanti",
        "Boggard",
        "Calda",
        "Caligni",
        "Celestial",
        "Common",
        "Cyclops",
        "D'ziriak",
        "Daemonic",
        "Druidic",
        "Dwarven",
        "Ekujae shape-script",
        "Elven",
        "Erutaki",
        "Garundi",
        "Giant",
        "Girtablilu",
        "Gnoll",
        "Gnomish",
        "Goblin",
        "Goloma",
        "Grioth",
        "Grippli",
        "Halfling",
        "Hallit",
        "Ignan",
        "Infernal",
        "Iruxi",
        "Jistkan",
        "Jotun",
        "Jyoti",
        "Kaava",
        "Kelish",
        "Kibwani",
        "Kitsune",
        "Kovintal",
        "Lirgeni",
        "Mi-Go",
        "Minaten",
        "Munavri",
        "Mwangi",
        "Mzunu",
        "Nagaji",
        "Necril",
        "Ocotan",
        "Orcish",
        "Osiriani",
        "Protean",
        "Rasu",
        "Requian",
        "Samsaran",
        "Sasquatch",
        "Senzer",
        "Shadowtongue",
        "Shae",
        "Shisk",
        "Shoanti",
        "Shoony",
        "Skald",
        "Sphinx",
        "Strix",
        "Sylvan",
        "Taldane",
        "Tengu",
        "Terran",
        "Thassilonian",
        "Tien",
        "Undercommon",
        "Utopian",
        "Vanara",
        "Varisian",
        "Varki",
        "Vishkanyan",
        "Vudrani",
        "Wyrwood",
        "Xanmba",
        "Yithian",
        "Ysoki",
    ];
});
define("parser/index", ["require", "exports", "parser/helpers"], function (require, exports, helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCharacter = exports.parseWanderersGuideJSON = void 0;
    const parseWanderersGuideJSON = (json) => {
        const wgData = JSON.parse(json);
        if (wgData.version !== 3) {
            throw new helpers_1.UnsupportedVersionError(`Unsupported export version (Version ${wgData.version} given, version 3 required)`);
        }
        return wgData;
    };
    exports.parseWanderersGuideJSON = parseWanderersGuideJSON;
    const toCharacter = (wgData) => {
        var _a, _b, _c;
        const abilityScores = JSON.parse(wgData.stats.totalAbilityScores);
        const loreSkills = Object.keys(wgData.profs).filter((prof) => prof.match(/^.+\sLore$/));
        return {
            name: wgData.character.name,
            level: wgData.character.level,
            class: wgData.character._class.name,
            classDC: wgData.stats.totalClassDC,
            hitpoints: {
                current: (_a = wgData.character.currentHealth) !== null && _a !== void 0 ? _a : wgData.stats.maxHP,
                max: wgData.stats.maxHP,
                temp: (_b = wgData.character.tempHealth) !== null && _b !== void 0 ? _b : 0,
            },
            abilities: abilityScores.reduce((abilities, { Name, Score }) => {
                abilities[Name.slice(0, 3).toLowerCase()] = Score;
                return abilities;
            }, {}),
            ancestry: {
                name: wgData.character._ancestry.name,
                size: wgData.character._ancestry.size.toLowerCase(),
            },
            heritage: {
                name: wgData.character._heritage.name,
            },
            usesFreeArchetype: !!wgData.character.variantFreeArchetype,
            spells: wgData.spellBookSpells.map((spell) => ({
                level: spell.spellLevel,
                name: spell._spellName,
            })),
            feats: wgData.build.feats.map((feat) => ({
                name: feat.value.name,
                levelAcquired: feat.sourceLevel,
                featLevel: feat.value.level,
            })),
            languages: wgData.build.languages
                .map((language) => language.value.name)
                .filter((language) => helpers_1.validLanguages.includes(language)),
            senses: wgData.build.senses
                .map((sense) => sense.value.name)
                .filter((sense) => helpers_1.validSenses.includes(sense)),
            proficiencies: {
                classDC: helpers_1.getFoundryProficiencyFromLevel((_c = wgData.profs.Class_DC) !== null && _c !== void 0 ? _c : "T"),
                perception: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Perception),
                saves: {
                    fortitude: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Fortitude),
                    reflex: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Reflex),
                    will: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Will),
                },
                armour: {
                    unarmored: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Unarmored_Defense),
                    light: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Light_Armor),
                    medium: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Medium_Armor),
                    heavy: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Heavy_Armor),
                },
                weapons: {
                    unarmed: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Unarmed_Attacks),
                    simple: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Simple_Weapons),
                    martial: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Martial_Weapons),
                    advanced: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.Advanced_Weapons),
                },
                spells: {
                    arcane: {
                        dc: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.ArcaneSpellDCs),
                        attacks: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.ArcaneSpellAttacks),
                    },
                    divine: {
                        dc: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.DivineSpellDCs),
                        attacks: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.DivineSpellAttacks),
                    },
                    occult: {
                        dc: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.OccultSpellDCs),
                        attacks: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.OccultSpellAttacks),
                    },
                    primal: {
                        dc: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.PrimalSpellDCs),
                        attacks: helpers_1.getFoundryProficiencyFromLevel(wgData.profs.PrimalSpellAttacks),
                    },
                },
                lore: loreSkills.reduce((skills, name) => {
                    // @ts-ignore no idea why `${string} Lore` can't be used to index a type that specifies that as a valid index so let's just ignore it who cares
                    skills[name] = helpers_1.getFoundryProficiencyFromLevel(wgData.profs[name]);
                    return skills;
                }, {}),
                skills: helpers_1.baseSkills.reduce((skills, name) => {
                    skills[helpers_1.getCoreSkillTLA(name).toLowerCase()] =
                        helpers_1.getFoundryProficiencyFromLevel(wgData.profs[name]);
                    return skills;
                }, {}),
            },
        };
    };
    exports.toCharacter = toCharacter;
});
define("index", ["require", "exports", "converter/index", "parser/index", "parser/helpers"], function (require, exports, converter_1, parser_1, helpers_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Hooks.on("renderActorSheet", (sheet, elSheet) => {
        const { user } = game;
        const { actor } = sheet;
        if (actor.data.type !== "character" ||
            !user ||
            !actor.canUserModify(user, "update")) {
            return;
        }
        const title = elSheet.find("header.window-header h4.window-title");
        if (!title) {
            return;
        }
        const openImportDialogButton = $('<button><i class="fas fa-file-import">Import from Wanderer\'s Guide</button>');
        openImportDialogButton.on("click", () => {
            renderDialogue(actor);
        });
    });
    function renderDialogue(actor) {
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
        });
    }
    function handleImport(elDialog, actor) {
        var _a, _b;
        const el = $(elDialog);
        const fileInput = el.find("#char-file-import").get(0);
        const charFile = ((_a = fileInput.files) !== null && _a !== void 0 ? _a : [])[0];
        if (!charFile) {
            (_b = ui.notifications) === null || _b === void 0 ? void 0 : _b.error("Unable to find uploaded .guidechar file!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => parseFile(e, actor);
        fileReader.readAsText(charFile);
    }
    function parseFile(event, actor) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedFile = parser_1.parseWanderersGuideJSON(`${(_a = event.target) === null || _a === void 0 ? void 0 : _a.result}`);
                const characterData = parser_1.toCharacter(parsedFile);
                // 1. Update actor class
                // 2. Update actor stats / text fields / level / skills
                yield converter_1.convertCharacterToActor(actor, characterData);
                // 3. Update actor feats (skipping duplicates added by class)
                // 4. Create spell list?
                // 5. Import spells?
                // 6. Import equipment?
            }
            catch (error) {
                if (error instanceof helpers_2.UnsupportedVersionError) {
                    (_b = ui.notifications) === null || _b === void 0 ? void 0 : _b.error(error.message);
                    return;
                }
                (_c = ui.notifications) === null || _c === void 0 ? void 0 : _c.error("Unable to import uploaded file.");
                console.error(error);
            }
        });
    }
});
