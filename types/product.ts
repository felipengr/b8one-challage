export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
}

export type ProductCategory = 'all' | 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface PriceRange {
  min: number;
  max: number;
}