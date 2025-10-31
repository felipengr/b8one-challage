import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FilterOptions, Product } from '@/types/product';
import ProductFilters from '@/components/ProductFilters';
import FiltersSkeleton from '@/components/FiltersSkeleton';
import MobileFiltersDrawer from './MobileFiltersDrawer';

interface FiltersSidebarProps {
  categories: string[];
  filters: FilterOptions;
  products: Product[];
  loading: boolean;
  onFilterChange: (filters: FilterOptions) => void;
  maxPrice: number;
}

export default function FiltersSidebar({ 
  categories, 
  filters, 
  products, 
  loading, 
  onFilterChange,
}: FiltersSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (isMobile) {
    return (
      <MobileFiltersDrawer
        categories={categories}
        filters={filters}
        products={products}
        loading={loading}
        onFilterChange={onFilterChange}
      />
    );
  }

  return (
    <Box sx={{ width: 320, flexShrink: 0 }}>
      {loading ? (
        <FiltersSkeleton />
      ) : (
        <ProductFilters
          categories={categories}
          filters={filters}
          products={products}
          onFilterChange={onFilterChange}
        />
      )}
    </Box>
  );
}