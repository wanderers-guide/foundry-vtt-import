import "./character-data";

interface ItemPF2e extends Item {
  id: string;
  name: string;
  slug: string;
  uuid: string;
}

interface FeatPF2e extends ItemPF2e {
  featType: {
    label: string;
    value:
      | "classfeature"
      | "class"
      | "skill"
      | "heritage"
      | "ancestry"
      | "archetype"
      | "general";
  };
}
