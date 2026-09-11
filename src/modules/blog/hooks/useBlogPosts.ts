import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { BlogService } from "../services/blog.service";
import { BlogsApiResponse } from "../types/blog.types";

export const useBlogPosts = () => {
  return useAuthQuery<BlogsApiResponse>({
    queryKey: ["blogs"],
    queryFn: () => BlogService.getBlogs(),
  });
};
