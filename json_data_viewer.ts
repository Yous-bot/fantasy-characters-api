import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

interface GuildAffiliation {
  id: string;
  name: string;
  guildMaster: string;
  guildEmblemUrl: string;
  foundedYear: number;
  motto: string;
}

interface Character {
  id: string;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  rarity: string;
  abilities: string[];
  element: string;
  guildAffiliation: GuildAffiliation;
}

const loadJsonData = (): Character[] => {
  try {
    const data = fs.readFileSync('fantasy-characters.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
};

const displayAllCharacters = (characters: Character[]) => {
  console.log("\n--- All Characters ---");
  characters.forEach((char) => {
    console.log(`- ${char.name} (${char.id})`);
  });
};

const displayCharacterById = (characters: Character[]) => {
  const id = readlineSync.question("\nPlease enter the ID you want to filter by: ").trim();
  const character = characters.find((char) => char.id === id);

  if (!character) {
    console.log("\nCharacter not found! Please enter a valid ID.");
    return;
  }

  console.log(`\n- ${character.name} (${character.id})`);
  console.log(`  - Description: ${character.description}`);
  console.log(`  - Age: ${character.age}`);
  console.log(`  - Active: ${character.isActive}`);
  console.log(`  - Birthdate: ${character.birthDate}`);
  console.log(`  - Image: ${character.imageUrl}`);
  console.log(`  - Rarity: ${character.rarity}`);
  console.log(`  - Abilities: ${character.abilities.join(", ")}`);
  console.log(`  - Element: ${character.element}`);
  console.log(`  - Guild: ${character.guildAffiliation.name}`);
  console.log(`    - Guild Master: ${character.guildAffiliation.guildMaster}`);
  console.log(`    - Emblem: ${character.guildAffiliation.guildEmblemUrl}`);
  console.log(`    - Founded: ${character.guildAffiliation.foundedYear}`);
  console.log(`    - Motto: ${character.guildAffiliation.motto}`);
};

const mainMenu = () => {
  const characters = loadJsonData();
  let running = true;

  while (running) {
    console.log("\nWelcome to the JSON data viewer!");
    console.log("1. View all data");
    console.log("2. Filter by ID");
    console.log("3. Exit");

    const choice = readlineSync.question("\nPlease enter your choice: ").trim();

    switch (choice) {
      case "1":
        displayAllCharacters(characters);
        break;
      case "2":
        displayCharacterById(characters);
        break;
      case "3":
        console.log("Exiting application...");
        running = false;
        break;
      default:
        console.log("Invalid choice, please enter 1, 2, or 3.");
    }
  }
};

mainMenu();
