export interface GuildAffiliation {
  id: string;
  name: string;
  guildMaster: string;
  guildEmblemUrl: string;
  foundedYear: number;
  motto: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  abilities: string[];
  element: string;
  guildAffiliation: GuildAffiliation;
}
