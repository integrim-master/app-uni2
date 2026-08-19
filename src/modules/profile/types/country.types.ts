export type Country = {
  id: string;
  name: string;
  phonecode: string;
  country_code: string;
};

export type GeoPlace = {
  id: string;
  name: string;
};

export type CountriesApiResponse = Country[];
export type StatesApiResponse = GeoPlace[];
export type CitiesApiResponse = GeoPlace[];

export type PickerItem = { l: string; v: string };

export function toPickerItems(
  items: Array<{ id: string | number; name: string }>,
): PickerItem[] {
  return items.map((item) => ({
    l: item.name,
    v: String(item.id),
  }));
}
