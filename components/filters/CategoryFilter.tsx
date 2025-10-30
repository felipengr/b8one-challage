import { Box, Typography, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { FilterOptions } from '@/types/product';

interface CategoryFilterProps {
  categories: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function CategoryFilter({ categories, filters, onFilterChange }: CategoryFilterProps) {
  const handleCategoryToggle = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  return (
    <Box>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontWeight: 700,
          color: '#111827',
          mb: 2,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Categorias
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={filters.category === category}
                onChange={() => handleCategoryToggle(category)}
                sx={{
                  color: '#d4d4d4',
                  '&.Mui-checked': {
                    color: '#000',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#374151', textTransform: 'capitalize' }}>
                {category}
              </Typography>
            }
            sx={{ 
              m: 0,
              '&:hover': {
                backgroundColor: '#f9fafb',
                borderRadius: 1,
              }
            }}
          />
        ))}
      </Box>

      {filters.category !== 'all' && (
        <Box sx={{ mt: 2 }}>
          <Chip
            label={filters.category}
            onDelete={() => handleCategoryToggle('all')}
            size="small"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'capitalize',
              fontWeight: 600,
              '& .MuiChip-deleteIcon': {
                color: '#fff',
                '&:hover': {
                  color: '#e5e7eb',
                }
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}