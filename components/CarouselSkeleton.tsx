import { Box } from '@mui/material';
import ProductSkeleton from './ProductSkeleton';

export default function CarouselSkeleton() {
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
        px: { xs: 4, sm: 8 },
      }}
    >
      {[...Array(4)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </Box>
  );
}