import api from "@/src/api/base";
import type {
  CitiesApiResponse,
  CountriesApiResponse,
  Country,
  GeoPlace,
  StatesApiResponse,
} from "../types/country.types";

function asList<T>(data: T[] | unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

export const CountryService = {
  getCountries: async (): Promise<Country[]> => {
    const response = await api.get<CountriesApiResponse>(
      `/wp-json/careme/v1/countries/`,
    );
    return asList<Country>(response.data);
  },

  getStates: async (countryId: string): Promise<GeoPlace[]> => {
    const response = await api.get<StatesApiResponse>(
      `/wp-json/careme/v1/countries/${countryId}/states/`,
      // { params: { country_id: countryId } },
    );
    return asList<GeoPlace>(response.data);
  },

  getCities: async (
    countryId: string,
    stateId: string,
  ): Promise<GeoPlace[]> => {
    const response = await api.get<CitiesApiResponse>(
      `/wp-json/careme/v1/countries/${countryId}/states/${stateId}/cities/`,
      // { params: { state_id: stateId } },
    );
    return asList<GeoPlace>(response.data);
  },
};
