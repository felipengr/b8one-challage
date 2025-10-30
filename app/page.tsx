'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedProducts products={featuredProducts} loading={loading} />
      <ExpertiseSection />
      <CTASection />
      <Footer />
    </>
  );
}