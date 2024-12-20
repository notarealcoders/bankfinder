export const CACHE_KEYS = {
  BANKS: "banks",
  BANK_DETAILS: (bank) => `bank:${bank}`,
  STATES: (bank) => `states:${bank}`,
  CITIES: (bank, state) => `cities:${bank}:${state}`,
  BRANCHES: (bank, state, city) => `branches:${bank}:${state}:${city}`,
  STATS: "stats",
};
