import { Box } from '@mui/material';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

interface WishlistGridProps {
  products: Product[];
}

export default function WishlistGrid({ products }: WishlistGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}