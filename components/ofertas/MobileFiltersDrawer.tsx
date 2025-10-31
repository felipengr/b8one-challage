'use client';

import { useState } from 'react';
import { Box, Drawer, Button, IconButton, Typography, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { FilterOptions, Product } from '@/types/product';
import ProductFilters from '@/components/ProductFilters';
import FiltersSkeleton from '@/components/FiltersSkeleton';

interface MobileFiltersDrawerProps {
  categories: string[];
  filters: FilterOptions;
  products: Product[];
  loading: boolean;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function MobileFiltersDrawer({
  categories,
  filters,
  products,
  loading,
  onFilterChange,
}: MobileFiltersDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hasActiveFilters = filters.category !== 'all' || 
    filters.minPrice !== 0 || 
    (products.length > 0 && filters.maxPrice !== Math.ceil(Math.max(...products.map(p => p.price))));

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.minPrice !== 0 || (products.length > 0 && filters.maxPrice !== Math.ceil(Math.max(...products.map(p => p.price)))) ? 1 : 0);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={
          <Badge 
            badgeContent={activeFiltersCount} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ef4444',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.65rem',
              }
            }}
          >
            <FilterListIcon sx={{ fontSize: 24 }} />
          </Badge>
        }
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1rem',
          px: 3,
          py: 1.5,
          borderRadius: 50,
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#1a1a1a',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Filtros
      </Button>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: 400,
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
              <Box 
                sx={{ 
                  backgroundColor: '#000', 
                  borderRadius: 2, 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FilterListIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Filtros
              </Typography>
              {hasActiveFilters && (
                <Box
                  sx={{
                    backgroundColor: '#ef4444',
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
                  {activeFiltersCount}
                </Box>
              )}
            </Box>
            <IconButton 
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <Box sx={{ p: 2 }}>
                <FiltersSkeleton />
              </Box>
            ) : (
              <ProductFilters
                categories={categories}
                filters={filters}
                products={products}
                onFilterChange={onFilterChange}
              />
            )}
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#fafafa',
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleClose}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                fontWeight: 700,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#1a1a1a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Ver {products.length} {products.length === 1 ? 'Produto' : 'Produtos'}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}