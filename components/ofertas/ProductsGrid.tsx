import { Box, Alert, Pagination } from '@mui/material';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function ProductsGrid({ 
  products, 
  loading, 
  error, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProductsGridProps) {
  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}>
        {[...Array(6)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Alert severity="info" sx={{ textAlign: 'center', borderRadius: 2 }}>
        Nenhum produto encontrado com os filtros selecionados.
      </Alert>
    );
  }

  return (
    <>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        },
        gap: 3,
        mb: 12,
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 12 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
                fontSize: '1rem',
              },
              '& .Mui-selected': {
                backgroundColor: '#000 !important',
                color: '#fff',
              }
            }}
          />
        </Box>
      )}
    </>
  );
}