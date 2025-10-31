import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import { Product } from '@/types/product';

interface CartItemProps {
  item: Product & { quantity: number };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        mb: 2,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        border: '1px solid #e5e7eb',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          backgroundColor: '#fff',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={80}
          height={80}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          unoptimized
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
          {formatPrice(item.price)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            sx={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
          >
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Typography
            sx={{
              minWidth: 32,
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            sx={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => onRemove(item.id)}
            sx={{
              ml: 'auto',
              color: '#ef4444',
              '&:hover': { backgroundColor: '#fee2e2' },
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}