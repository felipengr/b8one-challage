import { Box, Skeleton } from '@mui/material';

export default function FiltersSkeleton() {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #f3f4f6',
        height: 'fit-content',
        position: 'sticky',
        top: 96,
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #f3f4f6' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton 
            variant="rectangular" 
            width={40} 
            height={40}
            sx={{ borderRadius: 2, backgroundColor: '#e5e7eb' }}
          />
          <Skeleton 
            variant="text" 
            width={80} 
            height={32}
            sx={{ backgroundColor: '#e5e7eb' }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Skeleton 
            variant="text" 
            width={120} 
            height={24}
            sx={{ mb: 2, backgroundColor: '#e5e7eb' }}
          />
          
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Skeleton 
                variant="rectangular" 
                width={20} 
                height={20}
                sx={{ borderRadius: 0.5, backgroundColor: '#e5e7eb' }}
              />
              <Skeleton 
                variant="text" 
                width="60%" 
                height={20}
                sx={{ backgroundColor: '#e5e7eb' }}
              />
            </Box>
          ))}
        </Box>

        <Skeleton 
          variant="rectangular" 
          height={1}
          sx={{ backgroundColor: '#e5e7eb' }}
        />

        <Box>
          <Skeleton 
            variant="text" 
            width={140} 
            height={24}
            sx={{ mb: 3, backgroundColor: '#e5e7eb' }}
          />
          
          <Skeleton 
            variant="rectangular" 
            height={6}
            sx={{ 
              mb: 4,
              mx: 1,
              borderRadius: 3,
              backgroundColor: '#e5e7eb',
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Skeleton 
              variant="rectangular" 
              height={40}
              sx={{ 
                flex: 1,
                borderRadius: 2,
                backgroundColor: '#e5e7eb',
              }}
            />
            <Skeleton 
              variant="text" 
              width={20} 
              height={40}
              sx={{ backgroundColor: '#e5e7eb' }}
            />
            <Skeleton 
              variant="rectangular" 
              height={40}
              sx={{ 
                flex: 1,
                borderRadius: 2,
                backgroundColor: '#e5e7eb',
              }}
            />
          </Box>

          <Skeleton 
            variant="rectangular" 
            height={40}
            sx={{ 
              borderRadius: 2,
              backgroundColor: '#f3f4f6',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}