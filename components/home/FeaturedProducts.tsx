import { Box, Typography, Button } from '@mui/material';
import { Product } from '@/types/product';
import ProductCarousel from '@/components/ProductCarousel';
import CarouselSkeleton from '@/components/CarouselSkeleton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <Box sx={{ py: 10, backgroundColor: '#fafafa' }}>
      <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              color: '#111',
              mb: 2,
            }}
          >
            Produtos em Destaque
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            Selecionamos as melhores ofertas para você
          </Typography>
        </Box>

        {loading ? (
          <CarouselSkeleton />
        ) : (
          <>
            <Box sx={{ mb: 6 }}>
              <ProductCarousel products={products} />
            </Box>

            <Box sx={{ textAlign: 'center', mt: 12 }}>
              <Button
                component={Link}
                href="/ofertas"
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: '#000',
                  borderColor: '#000',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#000',
                    backgroundColor: '#000',
                    color: '#fff',
                  },
                }}
              >
                Ver Todos os Produtos
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}