'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating, Chip, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '@/types/product';
import { useShop } from '@/contexts/ShopContext';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

const calculateDiscount = (productId: number) => ((productId * 7) % 30) + 10;

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useShop();
  const isFavorite = isInWishlist(product.id);

  const discount = useMemo(() => calculateDiscount(product.id), [product.id]);
  const originalPrice = useMemo(() => product.price * (1 + discount / 100), [product.price, discount]);
  const savings = useMemo(() => originalPrice - product.price, [originalPrice, product.price]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid #e5e5e5',
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Chip 
        label={`-${discount}%`}
        size="small"
        sx={{ 
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: '#ef4444',
          color: '#fff',
          fontSize: '0.875rem',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
        }}
      />

      <IconButton
        size="small"
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#f9f9f9',
            transform: 'scale(1.1)',
          },
        }}
      >
        {isFavorite ? (
          <FavoriteIcon sx={{ color: '#ef4444', fontSize: 20 }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: '#6b7280', fontSize: 20 }} />
        )}
      </IconButton>

      <Box 
        sx={{ 
          height: 280,
          background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
          p: 4,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ 
            height: '100%',
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
      </Box>

      <CardContent 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        <Box>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#6b7280',
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: '0.65rem',
              display: 'block',
              mb: 0.5,
            }}
          >
            {product.category}
          </Typography>

          <Typography 
            variant="h6" 
            component="h3"
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              color: '#111827',
              minHeight: 48,
              lineHeight: 1.5,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Rating 
              value={product.rating.rate} 
              readOnly 
              precision={0.1} 
              size="small"
              sx={{ 
                color: '#FFA500',
                '& .MuiRating-iconEmpty': {
                  color: '#e5e7eb',
                },
              }}
            />
            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
              ({product.rating.count})
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9ca3af',
                textDecoration: 'line-through',
                fontSize: '0.875rem',
              }}
            >
              {formatPrice(originalPrice)}
            </Typography>
            
            <Chip 
              label={`Economize ${formatPrice(savings)}`}
              size="small"
              sx={{ 
                backgroundColor: '#dcfce7',
                color: '#15803d',
                fontSize: '0.7rem',
                height: 20,
                fontWeight: 600,
              }}
            />
          </Box>

          <Typography 
            variant="h5" 
            component="p"
            sx={{ 
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#111827',
              mb: 3,
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={() => addToCart(product)}
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 2,
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1a1a1a',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Adicionar ao Carrinho
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}