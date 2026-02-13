import { useDates } from "@/src/modules/dates/hooks/useDates";
import DatesScreen from "@/src/modules/dates/screens/DateScreen";
import React from "react";

export default function Dates() {
  const { data: dates, isFetching, isError, error, refetch } = useDates();

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <DatesScreen
      dates={dates}
      isLoading={isFetching}
      isError={isError}
      error={error}
      onRefresh={handleRefresh}
      refreshing={isFetching}
    />
  );
}
