import { useDates } from "@/src/modules/dates/hooks/useDates";
import DatesScreen from "@/src/modules/dates/screens/DateScreen";
import React from "react";

export default function Dates() {
  const { data: dates, isLoading, isError } = useDates();
  console.log("DATES DATA:", dates);

  return <DatesScreen dates={dates} isLoading={isLoading} />;
}
