'use client';

import { AppBar, Toolbar, Typography, Container, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Link from 'next/link';
import { useShop } from '@/contexts/ShopContext';
import { useState, useSyncExternalStore } from 'react';
import MiniCart from './MiniCart';

const emptySubscribe = () => () => {};

export default function Navbar() {
  const { wishlist, cartItemsCount } = useShop();
  const [cartOpen, setCartOpen] = useState(false);
  
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: '#fff',
          color: '#000',
          borderBottom: '1px solid #e5e5e5'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <LocalOfferIcon sx={{ fontSize: 32, color: '#000' }} />
              <Typography 
                variant="h5" 
                component={Link}
                href="/"
                sx={{ 
                  fontWeight: 900,
                  color: '#000',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                  '&:hover': {
                    opacity: 0.8,
                  },
                  transition: 'opacity 0.2s',
                }}
              >
                B8ONE
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton 
                size="large" 
                color="inherit"
                aria-label="Buscar produtos"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
              
              <IconButton 
                size="large" 
                color="inherit"
                aria-label="Favoritos"
                component={Link}
                href="/wishlist"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Badge 
                  badgeContent={isClient ? wishlist.length : 0}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      fontWeight: 700,
                    }
                  }}
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              
              <IconButton 
                size="large" 
                color="inherit"
                aria-label="Carrinho de compras"
                onClick={() => setCartOpen(true)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Badge 
                  badgeContent={isClient ? cartItemsCount() : 0}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      fontWeight: 700,
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}