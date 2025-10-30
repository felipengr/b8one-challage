import { Box, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';

const experiences = [
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: 'VTEX IO',
    description: 'Desenvolvimento de stores customizadas e componentes reutilizáveis na plataforma VTEX IO.',
    tags: ['React', 'TypeScript', 'GraphQL', 'VTEX'],
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'FastStore',
    description: 'Criação de e-commerces de alta performance utilizando o framework FastStore da VTEX.',
    tags: ['Next.js', 'Jamstack', 'Headless', 'Performance'],
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 40 }} />,
    title: 'E-commerce Moderno',
    description: 'Especialista em criar experiências de compra excepcionais com as melhores práticas do mercado.',
    tags: ['UI/UX', 'Responsive', 'SEO', 'Acessibilidade'],
  },
];

export default function ExpertiseSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#111827', color: '#fff' }}>
      <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 16 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Desenvolvido com Expertise
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#9ca3af',
              maxWidth: '48rem',
              mx: 'auto',
            }}
          >
            Este projeto foi criado utilizando as melhores práticas de desenvolvimento e-commerce
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            mb: 16,
          }}
        >
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              sx={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: '#fff',
                  boxShadow: '0 20px 40px rgba(255,255,255,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ color: '#fff', mb: 2 }}>
                  {exp.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#fff',
                    mb: 2,
                  }}
                >
                  {exp.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#9ca3af',
                    mb: 3,
                    lineHeight: 1.7,
                  }}
                >
                  {exp.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {exp.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{ 
                        backgroundColor: '#374151',
                        color: '#d1d5db',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#9ca3af', mb: 3 }}>
            Desenvolvido por
          </Typography>
          <Button
            component="a"
            href="https://www.nogueiradev.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            sx={{
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
              },
            }}
          >
            Felipe Nogueira
          </Button>
        </Box>
      </Box>
    </Box>
  );
}