export const locationKeys = {
  countries: ["countries"] as const,
  states: (countryId: string) => ["states", countryId] as const,
  cities: (stateId: string) => ["cities", stateId] as const,
};

export const countriesKeys = {
  all: locationKeys.countries,
};
