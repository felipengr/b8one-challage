import { Card, CardContent, Skeleton, Box } from '@mui/material';

export default function ProductSkeleton() {
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: '1px solid #e5e5e5',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Skeleton 
        variant="rectangular" 
        height={280}
        sx={{ backgroundColor: '#f3f4f6' }}
      />
      
      <CardContent sx={{ p: 3 }}>
        <Skeleton 
          variant="text" 
          width="40%" 
          height={20}
          sx={{ mb: 1, backgroundColor: '#e5e7eb' }}
        />
        
        <Skeleton 
          variant="text" 
          width="100%" 
          height={48}
          sx={{ mb: 2, backgroundColor: '#e5e7eb' }}
        />
        
        <Skeleton 
          variant="text" 
          width="60%" 
          height={24}
          sx={{ mb: 3, backgroundColor: '#e5e7eb' }}
        />
        
        <Box sx={{ mt: 3 }}>
          <Skeleton 
            variant="text" 
            width="50%" 
            height={36}
            sx={{ mb: 2, backgroundColor: '#e5e7eb' }}
          />
          
          <Skeleton 
            variant="rectangular" 
            height={48}
            sx={{ 
              borderRadius: 2,
              backgroundColor: '#e5e7eb',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}