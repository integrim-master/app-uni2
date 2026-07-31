import type { BlogPost } from "../types/blog.types";

/** Datos locales hasta que exista endpoint de blog. */
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Rinoplastia Ultrasónica: El futuro de la cirugía facial",
    summary:
      "Resultados más naturales con una recuperación un 50% más rápida gracias a la tecnología piezoeléctrica.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    category: "Cirugía Facial",
    date: "Hoy",
    featured: true,
  },
  {
    id: 2,
    title: "Postoperatorio: Guía de éxito",
    summary: "Cuidados esenciales tras una lipoescultura de alta definición.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    category: "Cuidados",
    date: "24 Feb",
  },
  {
    id: 3,
    title: "Bioestimuladores de Colágeno",
    summary: "La nueva era de rejuvenecimiento sin entrar a quirófano.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    category: "Dermatología",
    date: "22 Feb",
  },
];
