'use client';

import { FilterOptions, Product } from '@/types/product';
import { Box, Typography, Divider, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import CategoryFilter from './filters/CategoryFilter';
import PriceRangeFilter from './filters/PriceRangeFilter';
import { useMemo } from 'react';

interface ProductFiltersProps {
  categories: string[];
  filters: FilterOptions;
  products: Product[];
  onFilterChange: (filters: FilterOptions) => void;
}

export default function ProductFilters({ categories, filters, products, onFilterChange }: ProductFiltersProps) {
  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.price)));
  }, [products]);

  const clearAllFilters = () => {
    onFilterChange({ category: 'all', minPrice: 0, maxPrice });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.minPrice !== 0 || filters.maxPrice !== maxPrice;

  return (
    <Box 
      sx={{ 
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #f3f4f6',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        position: 'sticky',
        top: 96,
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #f3f4f6' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ backgroundColor: '#000', borderRadius: 2, p: 1 }}>
              <FilterListIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
              Filtros
            </Typography>
          </Box>
          
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearAllFilters}
              startIcon={<CloseIcon />}
              sx={{
                textTransform: 'none',
                color: '#6b7280',
                fontSize: '0.75rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#f9fafb',
                }
              }}
            >
              Limpar
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <CategoryFilter 
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
        />

        <Divider />

        <PriceRangeFilter 
          filters={filters}
          maxPrice={maxPrice}
          onFilterChange={onFilterChange}
        />
      </Box>
    </Box>
  );
}