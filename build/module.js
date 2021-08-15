var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
define("jest.config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        // All imported modules in your tests should be mocked automatically
        // automock: false,
        // Stop running tests after `n` failures
        // bail: 0,
        // The directory where Jest should store its cached dependency information
        // cacheDirectory: "/tmp/jest_rs",
        // Automatically clear mock calls and instances between every test
        clearMocks: true,
        // Indicates whether the coverage information should be collected while executing the test
        // collectCoverage: false,
        // An array of glob patterns indicating a set of files for which coverage information should be collected
        // collectCoverageFrom: undefined,
        // The directory where Jest should output its coverage files
        // coverageDirectory: undefined,
        // An array of regexp pattern strings used to skip coverage collection
        // coveragePathIgnorePatterns: [
        //   "/node_modules/"
        // ],
        // Indicates which provider should be used to instrument code for coverage
        coverageProvider: "v8",
        // A list of reporter names that Jest uses when writing coverage reports
        // coverageReporters: [
        //   "json",
        //   "text",
        //   "lcov",
        //   "clover"
        // ],
        // An object that configures minimum threshold enforcement for coverage results
        // coverageThreshold: undefined,
        // A path to a custom dependency extractor
        // dependencyExtractor: undefined,
        // Make calling deprecated APIs throw helpful error messages
        // errorOnDeprecated: false,
        // Force coverage collection from ignored files using an array of glob patterns
        // forceCoverageMatch: [],
        // A path to a module which exports an async function that is triggered once before all test suites
        // globalSetup: undefined,
        // A path to a module which exports an async function that is triggered once after all test suites
        // globalTeardown: undefined,
        // A set of global variables that need to be available in all test environments
        // globals: {},
        // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
        // maxWorkers: "50%",
        // An array of directory names to be searched recursively up from the requiring module's location
        // moduleDirectories: [
        //   "node_modules"
        // ],
        // An array of file extensions your modules use
        moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "d.ts"],
        // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
        // moduleNameMapper: {},
        // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
        // modulePathIgnorePatterns: [],
        // Activates notifications for test results
        // notify: false,
        // An enum that specifies notification mode. Requires { notify: true }
        // notifyMode: "failure-change",
        // A preset that is used as a base for Jest's configuration
        // preset: undefined,
        // Run tests from one or more projects
        // projects: undefined,
        // Use this configuration option to add custom reporters to Jest
        // reporters: undefined,
        // Automatically reset mock state between every test
        // resetMocks: false,
        // Reset the module registry before running each individual test
        // resetModules: false,
        // A path to a custom resolver
        // resolver: undefined,
        // Automatically restore mock state between every test
        // restoreMocks: false,
        // The root directory that Jest should scan for tests and modules within
        // rootDir: undefined,
        // A list of paths to directories that Jest should use to search for files in
        // roots: [
        //   "<rootDir>"
        // ],
        // Allows you to use a custom runner instead of Jest's default test runner
        // runner: "jest-runner",
        // The paths to modules that run some code to configure or set up the testing environment before each test
        setupFiles: ["./testSetup.js"],
        // A list of paths to modules that run some code to configure or set up the testing framework before each test
        // setupFilesAfterEnv: [],
        // The number of seconds after which a test is considered as slow and reported as such in the results.
        // slowTestThreshold: 5,
        // A list of paths to snapshot serializer modules Jest should use for snapshot testing
        // snapshotSerializers: [],
        // The test environment that will be used for testing
        testEnvironment: "jsdom",
        // Options that will be passed to the testEnvironment
        // testEnvironmentOptions: {},
        // Adds a location field to test results
        // testLocationInResults: false,
        // The glob patterns Jest uses to detect test files
        // testMatch: [
        //   "**/__tests__/**/*.[jt]s?(x)",
        //   "**/?(*.)+(spec|test).[tj]s?(x)"
        // ],
        // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
        // testPathIgnorePatterns: [
        //   "/node_modules/"
        // ],
        // The regexp pattern or array of patterns that Jest uses to detect test files
        // testRegex: [],
        // This option allows the use of a custom results processor
        // testResultsProcessor: undefined,
        // This option allows use of a custom test runner
        // testRunner: "jest-circus/runner",
        // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
        // testURL: "http://localhost",
        // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
        // timers: "real",
        // A map from regular expressions to paths to transformers
        // transform: undefined,
        // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
        // transformIgnorePatterns: [
        //   "/node_modules/",
        //   "\\.pnp\\.[^\\/]+$"
        // ],
        // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
        // unmockedModulePathPatterns: undefined,
        // Indicates whether each individual test should be reported during the run
        // verbose: undefined,
        // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
        // watchPathIgnorePatterns: [],
        // Whether to use watchman for file crawling
        // watchman: true,
    };
});
define("testUtils", ["require", "exports", "fs", "path"], function (require, exports, fs_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.importGuidechar = void 0;
    path_1 = __importDefault(path_1);
    const importGuidechar = (fileName) => {
        return fs_1.readFileSync(path_1.default.resolve("./__mocks__/" + fileName)).toString();
    };
    exports.importGuidechar = importGuidechar;
});
define("src/types/system", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/types/parser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/converter/index", ["require", "exports"], function (require, exports) {
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
define("src/utils/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/types/wanderers-guide-types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/parser/helpers", ["require", "exports", "../../types/character-data"], function (require, exports, character_data_1) {
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
define("src/parser/index", ["require", "exports", "src/parser/helpers"], function (require, exports, helpers_1) {
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
define("src/index", ["require", "exports", "src/converter/index", "src/parser/index", "src/parser/helpers"], function (require, exports, converter_1, parser_1, helpers_2) {
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
        const fileText = fileReader.readAsText(charFile);
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
define("src/converter/__tests__/index.test", ["require", "exports", "src/converter/index", "testUtils", "src/parser/index"], function (require, exports, __1, testUtils_1, parser_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe(__1.updateActor, () => {
        const mockActor = {
            update: jest.fn(() => Promise.resolve(mockActor)),
        };
        beforeEach(() => {
            mockActor.update.mockClear();
        });
        it("returns a promise containing the actor passed in and a boolean", () => {
            expect(__1.updateActor(mockActor, {})).resolves.toEqual([
                mockActor,
                expect.any(Boolean),
            ]);
        });
        it("Calls the update method of the actor, passing in the second parameter", () => __awaiter(void 0, void 0, void 0, function* () {
            yield __1.updateActor(mockActor, {
                "data.abilities.cha.value": 69,
            });
            expect(mockActor.update).toHaveBeenCalledWith({
                "data.abilities.cha.value": 69,
            });
        }));
        describe(__1.toCharacterUpdateMap, () => {
            it("converts a parsed character to the appropriate update map", () => {
                const razzledazzle = Object.assign({}, parser_2.toCharacter(parser_2.parseWanderersGuideJSON(testUtils_1.importGuidechar("Razlin_Stickletest.guidechar"))));
                expect(__1.toCharacterUpdateMap(razzledazzle)).toEqual({
                    name: razzledazzle.name,
                    "token.name": razzledazzle.name,
                    "data.details.heritage.value": razzledazzle.heritage.name,
                    "data.details.level.value": razzledazzle.level,
                    "data.traits.languages.value": razzledazzle.languages.map((l) => l.toLowerCase()),
                    "data.traits.size.value": "sm",
                    "data.abilities.str.value": razzledazzle.abilities.str,
                    "data.abilities.dex.value": razzledazzle.abilities.dex,
                    "data.abilities.con.value": razzledazzle.abilities.con,
                    "data.abilities.int.value": razzledazzle.abilities.int,
                    "data.abilities.wis.value": razzledazzle.abilities.wis,
                    "data.abilities.cha.value": razzledazzle.abilities.cha,
                    "data.saves.fortitude.rank": razzledazzle.proficiencies.saves.fortitude,
                    "data.saves.reflex.rank": razzledazzle.proficiencies.saves.reflex,
                    "data.saves.will.rank": razzledazzle.proficiencies.saves.will,
                    "data.martial.heavy.rank": razzledazzle.proficiencies.armour.heavy,
                    "data.martial.medium.rank": razzledazzle.proficiencies.armour.medium,
                    "data.martial.light.rank": razzledazzle.proficiencies.armour.light,
                    "data.martial.unarmored.rank": razzledazzle.proficiencies.armour.unarmored,
                    "data.martial.advanced.rank": razzledazzle.proficiencies.weapons.advanced,
                    "data.martial.martial.rank": razzledazzle.proficiencies.weapons.martial,
                    "data.martial.simple.rank": razzledazzle.proficiencies.weapons.simple,
                    "data.martial.unarmed.rank": razzledazzle.proficiencies.weapons.unarmed,
                    "data.skills.acr.rank": razzledazzle.proficiencies.skills.acr,
                    "data.skills.arc.rank": razzledazzle.proficiencies.skills.arc,
                    "data.skills.ath.rank": razzledazzle.proficiencies.skills.ath,
                    "data.skills.cra.rank": razzledazzle.proficiencies.skills.cra,
                    "data.skills.dec.rank": razzledazzle.proficiencies.skills.dec,
                    "data.skills.dip.rank": razzledazzle.proficiencies.skills.dip,
                    "data.skills.itm.rank": razzledazzle.proficiencies.skills.itm,
                    "data.skills.med.rank": razzledazzle.proficiencies.skills.med,
                    "data.skills.nat.rank": razzledazzle.proficiencies.skills.nat,
                    "data.skills.occ.rank": razzledazzle.proficiencies.skills.occ,
                    "data.skills.prf.rank": razzledazzle.proficiencies.skills.prf,
                    "data.skills.rel.rank": razzledazzle.proficiencies.skills.rel,
                    "data.skills.soc.rank": razzledazzle.proficiencies.skills.soc,
                    "data.skills.ste.rank": razzledazzle.proficiencies.skills.ste,
                    "data.skills.sur.rank": razzledazzle.proficiencies.skills.sur,
                    "data.skills.thi.rank": razzledazzle.proficiencies.skills.thi,
                    "data.attributes.perception.rank": razzledazzle.proficiencies.perception,
                    "data.attributes.classDC.rank": razzledazzle.proficiencies.classDC,
                });
            });
        });
    });
});
define("src/parser/__tests__/index.test", ["require", "exports", "src/parser/index", "testUtils", "../../../types/character-data", "src/parser/helpers"], function (require, exports, __2, testUtils_2, character_data_2, helpers_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const razlin = {
        good: testUtils_2.importGuidechar("Razlin_Stickletest.guidechar"),
        bad: testUtils_2.importGuidechar("Razlin_Stickletest.badver.guidechar"),
    };
    const haruya = {
        good: testUtils_2.importGuidechar("Haruya_Harutest.guidechar"),
        bad: testUtils_2.importGuidechar("Haruya_Harutest.badver.guidechar"),
    };
    describe("Parser", () => {
        describe(__2.parseWanderersGuideJSON, () => {
            it("Returns the parsed JSON for valid versions", () => {
                expect(__2.parseWanderersGuideJSON(razlin.good)).toEqual(JSON.parse(razlin.good));
                expect(__2.parseWanderersGuideJSON(haruya.good)).toEqual(JSON.parse(haruya.good));
            });
            it("Throws an UnsupportedVersionError when version is not supported", () => {
                expect(() => __2.parseWanderersGuideJSON(razlin.bad)).toThrowError(helpers_3.UnsupportedVersionError);
                expect(() => __2.parseWanderersGuideJSON(haruya.bad)).toThrowError(helpers_3.UnsupportedVersionError);
            });
        });
        describe(__2.toCharacter, () => {
            it("correctly craft a curated object containing correct info", () => {
                const raz = __2.parseWanderersGuideJSON(razlin.good);
                const haruno = __2.parseWanderersGuideJSON(haruya.good);
                const parsedRazlin = {
                    name: "Razlin Stickletest",
                    level: 10,
                    class: "Monk",
                    classDC: 29,
                    hitpoints: {
                        current: 56,
                        temp: 69,
                        max: 116,
                    },
                    abilities: {
                        str: 14,
                        dex: 20,
                        con: 12,
                        int: 12,
                        wis: 18,
                        cha: 16,
                    },
                    proficiencies: {
                        classDC: character_data_2.ProficiencyRank.EXPERT,
                        perception: character_data_2.ProficiencyRank.EXPERT,
                        saves: {
                            fortitude: character_data_2.ProficiencyRank.EXPERT,
                            reflex: character_data_2.ProficiencyRank.MASTER,
                            will: character_data_2.ProficiencyRank.EXPERT,
                        },
                        weapons: {
                            unarmed: character_data_2.ProficiencyRank.EXPERT,
                            simple: character_data_2.ProficiencyRank.EXPERT,
                            martial: character_data_2.ProficiencyRank.UNTRAINED,
                            advanced: character_data_2.ProficiencyRank.UNTRAINED,
                        },
                        armour: {
                            unarmored: character_data_2.ProficiencyRank.EXPERT,
                            light: character_data_2.ProficiencyRank.UNTRAINED,
                            medium: character_data_2.ProficiencyRank.UNTRAINED,
                            heavy: character_data_2.ProficiencyRank.UNTRAINED,
                        },
                        skills: {
                            acr: character_data_2.ProficiencyRank.MASTER,
                            arc: character_data_2.ProficiencyRank.UNTRAINED,
                            ath: character_data_2.ProficiencyRank.TRAINED,
                            cra: character_data_2.ProficiencyRank.UNTRAINED,
                            dec: character_data_2.ProficiencyRank.TRAINED,
                            dip: character_data_2.ProficiencyRank.TRAINED,
                            itm: character_data_2.ProficiencyRank.UNTRAINED,
                            med: character_data_2.ProficiencyRank.UNTRAINED,
                            nat: character_data_2.ProficiencyRank.UNTRAINED,
                            occ: character_data_2.ProficiencyRank.TRAINED,
                            prf: character_data_2.ProficiencyRank.TRAINED,
                            rel: character_data_2.ProficiencyRank.UNTRAINED,
                            soc: character_data_2.ProficiencyRank.TRAINED,
                            ste: character_data_2.ProficiencyRank.TRAINED,
                            sur: character_data_2.ProficiencyRank.UNTRAINED,
                            thi: character_data_2.ProficiencyRank.TRAINED,
                        },
                        lore: {
                            "Theater Lore": character_data_2.ProficiencyRank.TRAINED,
                        },
                        spells: {
                            arcane: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                            divine: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                            occult: {
                                dc: character_data_2.ProficiencyRank.EXPERT,
                                attacks: character_data_2.ProficiencyRank.EXPERT,
                            },
                            primal: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                        },
                    },
                    ancestry: {
                        name: "Halfling",
                        size: "small",
                    },
                    heritage: {
                        name: "Observant Halfling",
                    },
                    languages: expect.arrayContaining(["Common", "Halfling"]),
                    senses: [],
                    feats: expect.arrayContaining([
                        {
                            name: "Sure Feet",
                            featLevel: 1,
                            levelAcquired: 1,
                        },
                        {
                            name: "Halfling Luck",
                            featLevel: 1,
                            levelAcquired: 5,
                        },
                        {
                            name: "Guiding Luck",
                            featLevel: 9,
                            levelAcquired: 9,
                        },
                        {
                            name: "Fascinating Performance",
                            featLevel: 1,
                            levelAcquired: 1,
                        },
                        {
                            name: "Ki Strike",
                            featLevel: 1,
                            levelAcquired: 1,
                        },
                        {
                            name: "Flurry of Blows",
                            featLevel: -1,
                            levelAcquired: 1,
                        },
                        {
                            name: "Martial Artist Dedication",
                            featLevel: 2,
                            levelAcquired: 2,
                        },
                        {
                            name: "Stunning Fist",
                            featLevel: 2,
                            levelAcquired: 2,
                        },
                        {
                            name: "Acrobatic Performer",
                            featLevel: 1,
                            levelAcquired: 2,
                        },
                        {
                            name: "Dubious Knowledge",
                            featLevel: 1,
                            levelAcquired: 3,
                        },
                        {
                            name: "Crane Stance",
                            featLevel: 4,
                            levelAcquired: 4,
                        },
                        {
                            name: "Ki Rush",
                            featLevel: 1,
                            levelAcquired: 4,
                        },
                        {
                            name: "Cat Fall",
                            featLevel: 1,
                            levelAcquired: 4,
                        },
                        {
                            name: "Follow-Up Strike",
                            featLevel: 6,
                            levelAcquired: 6,
                        },
                        {
                            name: "Ki Blast",
                            featLevel: 6,
                            levelAcquired: 6,
                        },
                        {
                            name: "Nimble Crawl",
                            featLevel: 2,
                            levelAcquired: 6,
                        },
                        {
                            name: "Kip Up",
                            featLevel: 7,
                            levelAcquired: 7,
                        },
                        {
                            name: "Jalmeri Heavenseeker Dedication",
                            featLevel: 4,
                            levelAcquired: 8,
                        },
                        {
                            name: "Abundant Step",
                            featLevel: 6,
                            levelAcquired: 8,
                        },
                        {
                            name: "Assurance",
                            featLevel: 1,
                            levelAcquired: 8,
                        },
                        {
                            name: "Heaven's Thunder",
                            featLevel: 6,
                            levelAcquired: 10,
                        },
                        {
                            name: "Steal the Sky",
                            featLevel: 10,
                            levelAcquired: 10,
                        },
                        {
                            name: "Pickpocket",
                            featLevel: 1,
                            levelAcquired: 10,
                        },
                    ]),
                    spells: [],
                    usesFreeArchetype: true,
                };
                const parsedHaruya = {
                    name: "Haruya Harutest",
                    level: 3,
                    class: "Witch",
                    classDC: 19,
                    hitpoints: {
                        current: 32,
                        temp: 0,
                        max: 32,
                    },
                    abilities: {
                        str: 10,
                        dex: 10,
                        con: 14,
                        int: 18,
                        wis: 12,
                        cha: 14,
                    },
                    proficiencies: {
                        classDC: character_data_2.ProficiencyRank.TRAINED,
                        perception: character_data_2.ProficiencyRank.TRAINED,
                        saves: {
                            fortitude: character_data_2.ProficiencyRank.TRAINED,
                            reflex: character_data_2.ProficiencyRank.TRAINED,
                            will: character_data_2.ProficiencyRank.EXPERT,
                        },
                        weapons: {
                            unarmed: character_data_2.ProficiencyRank.TRAINED,
                            simple: character_data_2.ProficiencyRank.TRAINED,
                            martial: character_data_2.ProficiencyRank.UNTRAINED,
                            advanced: character_data_2.ProficiencyRank.UNTRAINED,
                        },
                        armour: {
                            unarmored: character_data_2.ProficiencyRank.TRAINED,
                            light: character_data_2.ProficiencyRank.UNTRAINED,
                            medium: character_data_2.ProficiencyRank.UNTRAINED,
                            heavy: character_data_2.ProficiencyRank.UNTRAINED,
                        },
                        skills: {
                            acr: character_data_2.ProficiencyRank.UNTRAINED,
                            arc: character_data_2.ProficiencyRank.UNTRAINED,
                            ath: character_data_2.ProficiencyRank.UNTRAINED,
                            cra: character_data_2.ProficiencyRank.TRAINED,
                            dec: character_data_2.ProficiencyRank.TRAINED,
                            dip: character_data_2.ProficiencyRank.TRAINED,
                            itm: character_data_2.ProficiencyRank.TRAINED,
                            med: character_data_2.ProficiencyRank.MASTER,
                            nat: character_data_2.ProficiencyRank.EXPERT,
                            occ: character_data_2.ProficiencyRank.UNTRAINED,
                            prf: character_data_2.ProficiencyRank.UNTRAINED,
                            rel: character_data_2.ProficiencyRank.UNTRAINED,
                            soc: character_data_2.ProficiencyRank.TRAINED,
                            ste: character_data_2.ProficiencyRank.TRAINED,
                            sur: character_data_2.ProficiencyRank.TRAINED,
                            thi: character_data_2.ProficiencyRank.UNTRAINED,
                        },
                        lore: {
                            "Herbalism Lore": character_data_2.ProficiencyRank.TRAINED,
                        },
                        spells: {
                            arcane: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                            divine: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                            occult: {
                                dc: character_data_2.ProficiencyRank.UNTRAINED,
                                attacks: character_data_2.ProficiencyRank.UNTRAINED,
                            },
                            primal: {
                                dc: character_data_2.ProficiencyRank.TRAINED,
                                attacks: character_data_2.ProficiencyRank.TRAINED,
                            },
                        },
                    },
                    ancestry: {
                        name: "Human",
                        size: "medium",
                    },
                    heritage: {
                        name: "Versatile Human",
                    },
                    languages: expect.arrayContaining([
                        "Aklo",
                        "Aquan",
                        "Auran",
                        "Common",
                        "Ignan",
                        "Sylvan",
                        "Terran",
                        "Vudrani",
                    ]),
                    senses: [],
                    feats: expect.arrayContaining([
                        {
                            name: "Natural Ambition",
                            levelAcquired: 1,
                            featLevel: 1,
                        },
                        {
                            name: "Cauldron",
                            levelAcquired: 1,
                            featLevel: 1,
                        },
                        {
                            name: "Forager",
                            levelAcquired: 1,
                            featLevel: 1,
                        },
                        {
                            name: "Natural Medicine",
                            levelAcquired: 1,
                            featLevel: 1,
                        },
                        {
                            name: "Herbalist Dedication",
                            levelAcquired: 2,
                            featLevel: 2,
                        },
                        {
                            name: "Alchemical Crafting",
                            levelAcquired: 2,
                            featLevel: 1,
                        },
                        {
                            name: "Improvise Tool",
                            levelAcquired: 2,
                            featLevel: 1,
                        },
                        {
                            name: "Basic Lesson",
                            levelAcquired: 2,
                            featLevel: 2,
                        },
                        {
                            name: "Lesson of Life",
                            levelAcquired: 2,
                            featLevel: -1,
                        },
                        {
                            name: "Multilingual",
                            levelAcquired: 3,
                            featLevel: 1,
                        },
                    ]),
                    spells: expect.arrayContaining([
                        {
                            name: "Spirit Link",
                            level: 1,
                        },
                        {
                            name: "Acid Splash",
                            level: 0,
                        },
                        {
                            name: "Dancing Lights",
                            level: 0,
                        },
                        {
                            name: "Detect Magic",
                            level: 0,
                        },
                        {
                            name: "Guidance",
                            level: 0,
                        },
                        {
                            name: "Know Direction",
                            level: 0,
                        },
                        {
                            name: "Prestidigitation",
                            level: 0,
                        },
                        {
                            name: "Produce Flame",
                            level: 0,
                        },
                        {
                            name: "Sigil",
                            level: 0,
                        },
                        {
                            name: "Stabilize",
                            level: 0,
                        },
                        {
                            name: "Tanglefoot",
                            level: 0,
                        },
                        {
                            name: "Create Water",
                            level: 1,
                        },
                        {
                            name: "Fear",
                            level: 1,
                        },
                        {
                            name: "Feather Fall",
                            level: 1,
                        },
                        {
                            name: "Goblin Pox",
                            level: 1,
                        },
                        {
                            name: "Heal",
                            level: 1,
                        },
                        {
                            name: "Negate Aroma",
                            level: 1,
                        },
                        {
                            name: "Spider Sting",
                            level: 1,
                        },
                        {
                            name: "Summon Plant or Fungus",
                            level: 1,
                        },
                        {
                            name: "Vomit Swarm",
                            level: 2,
                        },
                        {
                            name: "Fungal Infestation",
                            level: 2,
                        },
                    ]),
                    usesFreeArchetype: true,
                };
                expect(__2.toCharacter(raz)).toEqual(parsedRazlin);
                expect(__2.toCharacter(haruno)).toEqual(parsedHaruya);
            });
        });
    });
});
define("src/utils/guards", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDefined = void 0;
    const isDefined = (thing) => {
        return typeof thing !== "undefined";
    };
    exports.isDefined = isDefined;
});
