'use client';

import { useState } from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShop } from '@/contexts/ShopContext';
import FreeShippingProgress from './FreeShippingProgress';
import EmptyCart from './cart/EmptyCart';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import { ShippingInfo, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export default function MiniCart({ open, onClose }: MiniCartProps) {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useShop();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  const subtotal = cartTotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : shippingInfo?.price || 0;
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
          <EmptyCart onClose={onClose} />
        ) : (
          <>
            <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
              <FreeShippingProgress cartTotal={subtotal} />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </Box>

            <CartSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              shippingInfo={shippingInfo}
              onShippingCalculated={setShippingInfo}
              onClearCart={clearCart}
            />
          </>
        )}
      </Box>
    </Drawer>
  );
}