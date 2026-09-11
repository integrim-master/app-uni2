import BlogDetailsScreen from "@/src/modules/blog/screens/BlogDetailsScreen";
import { useBlogById } from "@/src/modules/blog/hooks/useBlogById";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function BlogDetailRoute() {
  const { details } = useLocalSearchParams<{ details: string }>();
  const { data, isLoading, isError, refetch } = useBlogById(details);

  return (
    <BlogDetailsScreen
      blog={data?.data}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
    />
  );
}
