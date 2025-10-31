import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Ofertas da Semana', href: '/ofertas' },
    { label: 'Todas as Categorias', href: '/categorias' },
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ];

  const socialLinks = [
    { icon: <LanguageIcon fontSize="small" />, href: 'https://www.nogueiradev.com.br/', label: 'Website' },
    { icon: <GitHubIcon fontSize="small" />, href: 'https://github.com/felipengr', label: 'GitHub' },
    { icon: <LinkedInIcon fontSize="small" />, href: 'https://www.linkedin.com/in/nogueirafelipe94/', label: 'LinkedIn', hoverColor: '#0077b5' },
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#111827',
        color: '#fff',
        borderTop: '1px solid #374151',
        py: 12,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 8,
          mb: 8,
        }}>
          
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalOfferIcon sx={{ fontSize: 32 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 900 }}>
                B8ONE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#9ca3af', lineHeight: 1.7 }}>
              As melhores ofertas em produtos selecionados. 
              Aproveite descontos de até 40% em diversas categorias.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.map((link) => (
                <Typography 
                  key={link.href}
                  variant="body2" 
                  component={Link}
                  href={link.href}
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: '#fff',
                    }
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Atendimento
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                <Box component="strong" sx={{ color: '#d1d5db' }}>Email:</Box> contato@b8one.com.br
              </Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                <Box component="strong" sx={{ color: '#d1d5db' }}>Telefone:</Box> (11) 9999-9999
              </Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                <Box component="strong" sx={{ color: '#d1d5db' }}>Horário:</Box> Seg-Sex, 9h-18h
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: '#374151', my: 4 }} />

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Desenvolvido com
            </Typography>
            <FavoriteIcon sx={{ fontSize: 16, color: '#ef4444' }} />
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              por
            </Typography>
            <Typography 
              variant="body2" 
              component="a"
              href="https://www.nogueiradev.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#60a5fa',
                }
              }}
            >
              Felipe Nogueira
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.href}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={social.label}
                sx={{
                  color: '#9ca3af',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: social.hoverColor || '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: '#374151', my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#4b5563' }}>
            © {currentYear} B8ONE. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}