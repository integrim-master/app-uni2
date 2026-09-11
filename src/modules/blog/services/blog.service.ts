import api from "@/src/api/base";
import { BlogDetailApiResponse, BlogsApiResponse } from "../types/blog.types";

export const BlogService = {
  getBlogs: async () => {
    try {
      const response = await api.get<BlogsApiResponse>(
        `wp-json/careme/v1/blogs`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en get de blogs:", error);
      throw error;
    }
  },

  getBlogById: async (id: string) => {
    try {
      const response = await api.get<BlogDetailApiResponse>(
        `wp-json/careme/v1/blogs/${id}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en get de blog por id:", error);
      throw error;
    }
  },
};
