export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Blog {
  id: number;
  title: string;
  image: string | null;
  summary: string;
  category: BlogCategory[];
  date: string;
}

export interface BlogSection {
  title: string;
  content: string;
  image: string | null;
}

export interface BlogCta {
  enabled: boolean;
  title: string;
  content: string;
  button_text: string;
  whatsapp: string;
  url: string;
}

export interface BlogDetail {
  id: number;
  title: string;
  content: string;
  categories: BlogCategory[];
  slug: string;
  image: string | null;
  sections: BlogSection[];
  cta: BlogCta;
}

export interface BlogsApiResponse {
  success: boolean;
  data: Blog[];
}

export interface BlogDetailApiResponse {
  success: boolean;
  data: BlogDetail;
}

export type BlogPost = Blog;
