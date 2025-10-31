import { Box, Typography, Button, Divider } from '@mui/material';
import ShippingCalculator from '@/components/ShippingCalculator';
import { ShippingInfo } from '@/lib/shipping';

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingInfo: ShippingInfo | null;
  onShippingCalculated: (info: ShippingInfo | null) => void;
  onClearCart: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

export default function CartSummary({
  subtotal,
  shippingCost,
  total,
  shippingInfo,
  onShippingCalculated,
  onClearCart,
}: CartSummaryProps) {
  return (
    <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
      <ShippingCalculator onShippingCalculated={onShippingCalculated} />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Subtotal:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatPrice(subtotal)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Frete:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: shippingCost === 0 ? '#16a34a' : '#111827',
          }}
        >
          {shippingInfo
            ? shippingCost === 0
              ? 'GRÁTIS'
              : formatPrice(shippingCost)
            : 'Calcular'}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Total:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#16a34a' }}>
          {formatPrice(total)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 700,
          py: 1.5,
          borderRadius: 2,
          fontSize: '1rem',
          mb: 1,
          '&:hover': {
            backgroundColor: '#1a1a1a',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Finalizar Compra
      </Button>

      <Button
        variant="text"
        fullWidth
        onClick={onClearCart}
        sx={{
          color: '#6b7280',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#f3f4f6',
            color: '#ef4444',
          },
        }}
      >
        Limpar Carrinho
      </Button>
    </Box>
  );
}