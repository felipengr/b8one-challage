import { Box, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from 'next/link';

export default function WishlistEmpty() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        textAlign: 'center',
      }}
    >
      <FavoriteBorderIcon sx={{ fontSize: 120, color: '#d1d5db', mb: 3 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Sua lista de favoritos está vazia
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280', mb: 4, maxWidth: 500 }}>
        Explore nossos produtos e adicione seus favoritos clicando no ícone de coração!
      </Typography>
      <Button
        component={Link}
        href="/ofertas"
        variant="contained"
        size="large"
        startIcon={<ShoppingBagIcon />}
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.1rem',
          px: 4,
          py: 1.5,
          borderRadius: 3,
          '&:hover': {
            backgroundColor: '#1a1a1a',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Explorar Produtos
      </Button>
    </Box>
  );
}