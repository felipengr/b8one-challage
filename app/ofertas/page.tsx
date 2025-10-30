'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container, Box } from '@mui/material';
import { Product, FilterOptions } from '@/types/product';
import { fetchProducts, fetchCategories } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import FiltersSidebar from '@/components/ofertas/FiltersSidebar';
import OfertasHeader from '@/components/ofertas/OfertasHeader';
import ProductsGrid from '@/components/ofertas/ProductsGrid';

const ITEMS_PER_PAGE = 6;

export default function OfertasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.price)));
  }, [products]);

  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minPrice: 0,
    maxPrice: maxProductPrice,
  });

  useEffect(() => {
    if (products.length > 0) {
      setFilters(prev => ({
        ...prev,
        maxPrice: maxProductPrice,
      }));
    }
  }, [maxProductPrice, products.length]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Erro ao carregar produtos. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = products;

    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }

    result = result.filter(
      product => product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Banner />

        <Container maxWidth="xl" sx={{ py: 12 }}>
          <Box sx={{ display: 'flex', gap: 8 }}>
            <FiltersSidebar
              categories={categories}
              filters={filters}
              products={products}
              loading={loading}
              onFilterChange={setFilters}
            />

            <Box sx={{ flex: 1 }}>
              <OfertasHeader productCount={filteredProducts.length} />
              <ProductsGrid
                products={currentProducts}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}