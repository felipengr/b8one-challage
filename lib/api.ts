import { Product } from '@/types/product';

const API_URL = 'https://fakestoreapi.com';

const fetchWithCache = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    return await fetchWithCache<Product[]>(`${API_URL}/products`);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    return await fetchWithCache<string[]>(`${API_URL}/products/categories`);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    return await fetchWithCache<Product>(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error('Failed to fetch product');
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    return await fetchWithCache<Product[]>(`${API_URL}/products/category/${category}`);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};