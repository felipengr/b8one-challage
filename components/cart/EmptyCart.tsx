import { Box, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface EmptyCartProps {
  onClose: () => void;
}

export default function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: 80, color: '#d1d5db', mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Seu carrinho está vazio
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
        Adicione produtos para começar suas compras!
      </Typography>
      <Button
        variant="contained"
        onClick={onClose}
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 700,
          px: 4,
          py: 1.5,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#1a1a1a',
          },
        }}
      >
        Continuar Comprando
      </Button>
    </Box>
  );
}