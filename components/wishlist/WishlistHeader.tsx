import { Box, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface WishlistHeaderProps {
  count: number;
}

export default function WishlistHeader({ count }: WishlistHeaderProps) {
  return (
    <Box sx={{ mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <FavoriteBorderIcon sx={{ fontSize: 40, color: '#ef4444' }} />
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ fontWeight: 700, color: '#111827' }}
        >
          Meus Favoritos
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: '#4b5563' }}>
        {count} {count === 1 ? 'produto salvo' : 'produtos salvos'}
      </Typography>
    </Box>
  );
}