import { Ability, CoreSkill, CoreSkillTLA, Skill } from "../types/system";
import { WanderersGuideObject } from "../types/wanderers-guide-types";
import { isDefined } from "../utils/guards";

const parseWanderersGuideJSON = (json: string): WanderersGuideObject =>
  JSON.parse(json);

type AbilityBoostKey = `data.abilities.${Lowercase<Ability>}.value`;
const updateBoosts = async (wgo: WanderersGuideObject) => {
  const updates: CharacterUpdateMap =
    wgo.build.boosts.reduce<CharacterUpdateMap>((updateMap, boost) => {
      const isFlaw = boost.Bonus === "Flaw";
      const incrBy = !isFlaw ? 2 : -2;
      const key: AbilityBoostKey = `data.abilities.${
        boost.Ability.toLowerCase() as Lowercase<Ability>
      }.value`;

      updateMap[key] = (updateMap[key] ?? 10) + incrBy;

      return updateMap;
    }, {});

  const updatedActor = await actor.update(updates);
  return updatedActor;
};

type SkillProfKey = `data.skills.${Lowercase<CoreSkillTLA>}.rank`;
const updateProficiencies = async (wgo: WanderersGuideObject) => {};
