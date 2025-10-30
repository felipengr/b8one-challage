'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <Box sx={{ position: 'relative', px: { xs: 4, sm: 8 } }}>
      <IconButton
        className="custom-swiper-button-prev"
        aria-label="Produto anterior"
        sx={{
          position: 'absolute',
          left: { xs: -10, sm: -25 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: { xs: 40, sm: 56 },
          height: { xs: 40, sm: 56 },
          backgroundColor: '#fff',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#000',
            borderColor: '#000',
            transform: 'translateY(-50%) scale(1.1)',
            '& svg': {
              color: '#fff',
            },
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: '#000' }} />
      </IconButton>

      <IconButton
        className="custom-swiper-button-next"
        aria-label="Próximo produto"
        sx={{
          position: 'absolute',
          right: { xs: -10, sm: -25 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: { xs: 40, sm: 56 },
          height: { xs: 40, sm: 56 },
          backgroundColor: '#fff',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#000',
            borderColor: '#000',
            transform: 'translateY(-50%) scale(1.1)',
            '& svg': {
              color: '#fff',
            },
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: '#000' }} />
      </IconButton>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        style={{ paddingBottom: '60px' }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}