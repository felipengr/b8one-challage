'use client';

import { useState } from 'react';
import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import { useShop } from '@/contexts/ShopContext';
import ShippingCalculator from './ShippingCalculator';
import FreeShippingProgress from './FreeShippingProgress';
import { ShippingInfo, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export default function MiniCart({ open, onClose }: MiniCartProps) {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useShop();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const subtotal = cartTotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : (shippingInfo?.price || 0);
  const total = subtotal + shippingCost;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: 450,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#fafafa',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartIcon sx={{ fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Meu Carrinho
            </Typography>
            {cart.length > 0 && (
              <Box
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {cart.length}
              </Box>
            )}
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
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
        ) : (
          <>
            <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
              <FreeShippingProgress cartTotal={subtotal} />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              {cart.map((item) => (
                <Box
                  key={item.id}
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
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
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
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
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
                        onClick={() => removeFromCart(item.id)}
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
              ))}
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
              <ShippingCalculator onShippingCalculated={setShippingInfo} />

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
                    ? (shippingCost === 0 ? 'GRÁTIS' : formatPrice(shippingCost))
                    : 'Calcular'
                  }
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
                onClick={clearCart}
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
          </>
        )}
      </Box>
    </Drawer>
  );
}