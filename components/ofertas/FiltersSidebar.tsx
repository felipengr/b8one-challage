import { Box } from '@mui/material';
import { FilterOptions, Product } from '@/types/product';
import ProductFilters from '@/components/ProductFilters';
import FiltersSkeleton from '@/components/FiltersSkeleton';

interface FiltersSidebarProps {
  categories: string[];
  filters: FilterOptions;
  products: Product[];
  loading: boolean;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FiltersSidebar({ 
  categories, 
  filters, 
  products, 
  loading, 
  onFilterChange 
}: FiltersSidebarProps) {
  const content = loading ? (
    <FiltersSkeleton />
  ) : (
    <ProductFilters
      categories={categories}
      filters={filters}
      products={products}
      onFilterChange={onFilterChange}
    />
  );

  return (
    <>
      <Box sx={{ display: { xs: 'none', lg: 'block' }, width: 320, flexShrink: 0 }}>
        {content}
      </Box>

      <Box sx={{ display: { xs: 'block', lg: 'none' }, mb: 6 }}>
        {content}
      </Box>
    </>
  );
}