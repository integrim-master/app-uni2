export interface MovieItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: any;
}

export interface CardMoviesProps {
  item: any;
  onPress?: () => void;
  onOpenOptions?: (item: any) => void;
}
