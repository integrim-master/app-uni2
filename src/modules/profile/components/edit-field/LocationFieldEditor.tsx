import CustomPicker from "@/src/components/shared/CustomPicker";
import ThemedText from "@/src/components/shared/themed-text";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useCities } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountries";
import { useStates } from "../../hooks/useStates";
import { toPickerItems } from "../../types/country.types";
import { getProfileLocation } from "../../utils/getProfileFieldInitial";
import { getFieldTitle } from "../../utils/validateProfileField";
import { EditFieldLayout } from "./EditFieldLayout";
import type { BaseFieldEditorProps } from "./types";

export function LocationFieldEditor({
  user,
  isPending,
  onSave,
}: BaseFieldEditorProps) {
  const initial = getProfileLocation(user);
  const [country, setCountry] = useState(initial.country);
  const [state, setState] = useState(initial.state);
  const [city, setCity] = useState(initial.city);
  const [error, setError] = useState<string | null>(null);
  console.log("country", initial);

  const {
    countries,
    isLoading: loadingCountries,
    error: countriesError,
  } = useCountries();
  const {
    states,
    isLoading: loadingStates,
    error: statesError,
  } = useStates(country);
  const {
    cities,
    isLoading: loadingCities,
    error: citiesError,
  } = useCities(country, state);

  const countryItems = useMemo(() => toPickerItems(countries), [countries]);
  const stateItems = useMemo(() => toPickerItems(states), [states]);
  const cityItems = useMemo(() => toPickerItems(cities), [cities]);

  const handleSave = () => {
    if (!country || !state || !city) {
      setError("Completa país, estado y ciudad.");
      return;
    }
    onSave({
      pais_residencia: country,
      provincia: state.toString(),
      ciudad: city,
    });
  };

  return (
    <EditFieldLayout
      title={getFieldTitle("localizacion")}
      error={error}
      isPending={isPending}
      saveDisabled={isPending || !country || !state || !city}
      onSave={handleSave}
    >
      <View accessibilityLabel="Selector de ubicación">
        {loadingCountries ? (
          <ActivityIndicator />
        ) : countriesError ? (
          <ThemedText type="caption" tone="danger">
            No se pudieron cargar los países.
          </ThemedText>
        ) : (
          <CustomPicker
            label="País"
            selectedValue={country}
            onValueChange={(value: string) => {
              setCountry(value);
              setState("");
              setCity("");
              setError(null);
            }}
            items={countryItems}
          />
        )}

        {country ? (
          loadingStates ? (
            <ActivityIndicator />
          ) : statesError ? (
            <ThemedText type="caption" tone="danger">
              No se pudieron cargar los estados.
            </ThemedText>
          ) : (
            <CustomPicker
              label="Estado / Departamento"
              selectedValue={state}
              onValueChange={(value: string) => {
                setState(value);
                setCity("");
                setError(null);
              }}
              items={stateItems}
            />
          )
        ) : null}

        {state ? (
          loadingCities ? (
            <ActivityIndicator />
          ) : citiesError ? (
            <ThemedText type="caption" tone="danger">
              No se pudieron cargar las ciudades.
            </ThemedText>
          ) : (
            <CustomPicker
              label="Ciudad / Municipio"
              selectedValue={city}
              onValueChange={(value: string) => {
                setCity(value);
                setError(null);
              }}
              items={cityItems}
            />
          )
        ) : null}
      </View>
    </EditFieldLayout>
  );
}
