import { MOCK_BLOG_POSTS } from "../mocks/mockBlogPosts";
import type { BlogPost } from "../types/blog.types";

/**
 * Fuente de posts del blog.
 * Hoy usa mocks; cuando exista API, mover la query aquí (services + useAuthQuery).
 */
export function useBlogPosts(): { data: BlogPost[]; isLoading: boolean } {
  return {
    data: MOCK_BLOG_POSTS,
    isLoading: false,
  };
}
