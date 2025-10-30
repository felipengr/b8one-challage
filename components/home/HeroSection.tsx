import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        py: { xs: 12, md: 20 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: '56rem', mx: 'auto' }}>
          <Chip 
            label="🚀 Novo na B8ONE" 
            sx={{
              mb: 6,
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              fontWeight: 600,
              py: 2.5,
            }}
          />
          
          <Typography 
            component="h1"
            sx={{ 
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.1,
              fontWeight: 900,
              mb: 6,
              background: 'linear-gradient(to right, #ffffff, #d4d4d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ofertas Imperdíveis
            <br />
            Todos os Dias
          </Typography>

          <Typography 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.5rem' },
              color: '#d4d4d8',
              fontWeight: 300,
              mb: 8,
            }}
          >
            Descubra os melhores produtos com até{' '}
            <Box component="span" sx={{ fontWeight: 700, color: '#fbbf24' }}>
              40% de desconto
            </Box>
            .
            <br />
            Qualidade garantida e entrega rápida.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              href="/ofertas"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(255,255,255,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Ver Todas as Ofertas
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 3,
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Saiba Mais
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}