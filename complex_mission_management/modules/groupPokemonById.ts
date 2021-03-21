import { Trainer_Pokemon } from '../modules/interfaces';

interface InventoryCount {
  count: number;
  inventory: number[];
}

const groupPokemonById = (
  inventory: Trainer_Pokemon[]
): Record<string, InventoryCount> => {
  const inventoryCount = {};

  // loop through the inventory, check if record exist, +1 to count if it does
  inventory.map((record) => {
    const inventory_id = record.id;
    const pokemon_id = record.pokemon_id;
    const pokemonTotal: { inventory?: number[] } = {};

    pokemonTotal.inventory = inventoryCount[pokemon_id]
      ? [...inventoryCount[pokemon_id].inventory, inventory_id]
      : [inventory_id];

    inventoryCount[pokemon_id] = {
      count: pokemonTotal.inventory.length,
      inventory: pokemonTotal.inventory,
    };
  });

  return inventoryCount;
};

export default groupPokemonById;
