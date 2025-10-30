import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export default function CTASection() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#fafafa' }}>
      <Box sx={{ maxWidth: '1024px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 6,
            p: { xs: 8, md: 12 },
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Pronto para Economizar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            Cadastre-se agora e receba ofertas exclusivas!
          </Typography>
          <Button
            component={Link}
            href="/ofertas"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 5,
              py: 2,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#1a1a1a',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              },
            }}
          >
            Começar Agora
          </Button>
        </Box>
      </Box>
    </Box>
  );
}