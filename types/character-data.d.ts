interface CharacterPF2e {
  update(data: CharacterUpdateMap): Promise<CharacterPF2e | undefined>;
}

type CharacterUpdateMap = {
  name?: string;
  "data.details.level.value"?: string;
  "data.details.heritage.value"?: string;
  "data.details.age.value"?: string;
  "data.details.gender.value"?: string;
  "data.details.keyability.value"?: string;
  "data.traits.size.value"?: string;
  "data.traits.languages.value"?: string[];
  "data.traits.sense"?: CharacterSense[];
  "data.abilities.str.value"?: number;
  "data.abilities.dex.value"?: number;
  "data.abilities.con.value"?: number;
  "data.abilities.wis.value"?: number;
  "data.abilities.int.value"?: number;
  "data.abilities.cha.value"?: number;
  "data.attributes.ancestryhp"?: number;
  "data.attributes.classDC"?: number;
  "data.attributes.classhp"?: number;
  "data.attributes.speed.value"?: number;
  "data.attributes.flatbonushp"?: number;
  "data.attributes.hp.value"?: number;
  "data.attributes.perception.rank"?: ProficiencyRank;
  "data.saves.fortitude.rank"?: ProficiencyRank;
  "data.saves.reflex.rank"?: ProficiencyRank;
  "data.saves.will.rank"?: ProficiencyRank;
  "data.martial.unarmed.rank"?: ProficiencyRank;
  "data.martial.simple.rank"?: ProficiencyRank;
  "data.martial.martial.rank"?: ProficiencyRank;
  "data.martial.unarmored.rank"?: ProficiencyRank;
  "data.martial.light.rank"?: ProficiencyRank;
  "data.martial.medium.rank"?: ProficiencyRank;
  "data.martial.heavy.rank"?: ProficiencyRank;
  "data.martial.advanced.rank"?: ProficiencyRank;
  "data.skills.acr.rank"?: ProficiencyRank;
  "data.skills.arc.rank"?: ProficiencyRank;
  "data.skills.ath.rank"?: ProficiencyRank;
  "data.skills.cra.rank"?: ProficiencyRank;
  "data.skills.dec.rank"?: ProficiencyRank;
  "data.skills.dip.rank"?: ProficiencyRank;
  "data.skills.itm.rank"?: ProficiencyRank;
  "data.skills.med.rank"?: ProficiencyRank;
  "data.skills.nat.rank"?: ProficiencyRank;
  "data.skills.occ.rank"?: ProficiencyRank;
  "data.skills.prf.rank"?: ProficiencyRank;
  "data.skills.rel.rank"?: ProficiencyRank;
  "data.skills.soc.rank"?: ProficiencyRank;
  "data.skills.ste.rank"?: ProficiencyRank;
  "data.skills.sur.rank"?: ProficiencyRank;
  "data.skills.thi.rank"?: ProficiencyRank;
};

enum ProficiencyRank {
  UNTRAINED = 0,
  TRAINED = 1,
  EXPERT = 2,
  MASTER = 3,
  LEGENDARY = 4,
}

type CharacterSense = {
  exceptions: string;
  label: string;
  type: string;
  value: string;
};
