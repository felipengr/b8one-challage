import { Box, Container, Typography, Button } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface BannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Banner({ 
  title = 'Ofertas da Semana',
  subtitle = 'em produtos selecionados. Aproveite agora!',
  ctaText = 'Ver Ofertas',
  ctaLink = '#ofertas'
}: BannerProps) {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        color: '#fff',
        py: { xs: 12, md: 24 },
        mb: 6,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          gap: 6 
        }}>
          <Box 
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              p: 2,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 },
              },
            }}
          >
            <LocalOfferIcon sx={{ fontSize: 50 }} />
          </Box>

          <Typography 
            variant="h1" 
            component="h1"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="h5"
            sx={{ 
              fontSize: { xs: '1rem', md: '1.5rem' },
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: '48rem',
            }}
          >
            Até <Box component="span" sx={{ fontWeight: 700, color: '#fbbf24' }}>40% OFF</Box> {subtitle}
          </Typography>

          <Button
            component={Link}
            href={ctaLink}
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 2,
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(255,255,255,0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {ctaText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}