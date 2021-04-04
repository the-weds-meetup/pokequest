interface InventoryCount {
  count: number;
  inventory: number[];
}

const filterPokemonById = (
  inventory: Record<string, InventoryCount>,
  filter_list: number[]
): Record<string, InventoryCount> => {
  const inventoryCount = {};

  filter_list.map((poke_id) => {
    const record = inventory[`${poke_id}`];

    if (record) {
      inventoryCount[`${poke_id}`] = record;
    } else {
      inventoryCount[`${poke_id}`] = {
        count: 0,
        inventory: [],
      };
    }
  });

  return inventoryCount;
};

export default filterPokemonById;
