import { Box, Typography } from '@mui/material';

interface OfertasHeaderProps {
  productCount: number;
}

export default function OfertasHeader({ productCount }: OfertasHeaderProps) {
  return (
    <Box sx={{ mb: { xs: 0, lg: 8 } }}>
      <Typography 
        variant="h3" 
        component="h2"
        sx={{ fontWeight: 700, color: '#111827', mb: 1 }}
      >
        Ofertas da Semana
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280' }}>
        {productCount} {productCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </Typography>
    </Box>
  );
}