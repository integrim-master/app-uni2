import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { BlogService } from "../services/blog.service";
import { BlogDetailApiResponse } from "../types/blog.types";

export const useBlogById = (id?: string) => {
  return useAuthQuery<BlogDetailApiResponse>({
    queryKey: ["blog", id],
    queryFn: () => BlogService.getBlogById(id!),
    enabled: !!id,
  });
};
