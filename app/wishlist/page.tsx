'use client';

import { Container, Box } from '@mui/material';
import { useShop } from '@/contexts/ShopContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WishlistHeader from '@/components/wishlist/WishlistHeader';
import WishlistEmpty from '@/components/wishlist/WishlistEmpty';
import WishlistGrid from '@/components/wishlist/WishlistGrid';

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa', py: 8 }}>
        <Container maxWidth="xl">
          <WishlistHeader count={wishlist.length} />
          {wishlist.length === 0 ? (
            <WishlistEmpty />
          ) : (
            <WishlistGrid products={wishlist} />
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}