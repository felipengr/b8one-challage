import { Box, Typography, LinearProgress } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { calculateFreeShippingProgress } from '@/lib/shipping';

interface FreeShippingProgressProps {
  cartTotal: number;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

export default function FreeShippingProgress({ cartTotal }: FreeShippingProgressProps) {
  const { percentage, remaining, isFree } = calculateFreeShippingProgress(cartTotal);

  if (isFree) {
    return (
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 2,
            backgroundColor: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: 2,
          }}
        >
          <LocalShippingIcon sx={{ fontSize: 24, color: '#16a34a' }} />
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#15803d' }}>
            Parabéns! Você ganhou frete GRÁTIS! 🎉
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <LocalShippingIcon sx={{ fontSize: 20, color: '#6b7280' }} />
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
          Faltam <Box component="strong" sx={{ color: '#16a34a' }}>{formatPrice(remaining)}</Box> para frete grátis
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#e5e7eb',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#16a34a',
            borderRadius: 4,
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'right',
          color: '#9ca3af',
          mt: 0.5,
        }}
      >
        {Math.round(percentage)}% do valor necessário
      </Typography>
    </Box>
  );
}