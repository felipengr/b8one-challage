import { Box, Typography, Slider, TextField } from '@mui/material';
import { FilterOptions } from '@/types/product';
import { useState } from 'react';

interface PriceRangeFilterProps {
  filters: FilterOptions;
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function PriceRangeFilter({ filters, maxPrice, onFilterChange }: PriceRangeFilterProps) {
  const [localPriceRange, setLocalPriceRange] = useState<number[]>([filters.minPrice, filters.maxPrice]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
  };

  const handlePriceCommit = (_event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleMinPriceChange = (value: number) => {
    const newMin = Math.max(0, Math.min(value, localPriceRange[1]));
    setLocalPriceRange([newMin, localPriceRange[1]]);
  };

  const handleMaxPriceChange = (value: number) => {
    const newMax = Math.min(maxPrice, Math.max(value, localPriceRange[0]));
    setLocalPriceRange([localPriceRange[0], newMax]);
  };

  const handleInputBlur = () => {
    onFilterChange({ 
      ...filters, 
      minPrice: localPriceRange[0], 
      maxPrice: localPriceRange[1] 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontWeight: 700,
          color: '#111827',
          mb: 3,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Faixa de Preço
      </Typography>
      
      <Box sx={{ px: 1, mb: 4 }}>
        <Slider
          value={localPriceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceCommit}
          min={0}
          max={maxPrice}
          step={10}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          sx={{
            color: '#000',
            height: 6,
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
              backgroundColor: '#000',
              border: '3px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#000',
              border: 'none',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#e5e7eb',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          size="small"
          type="number"
          label="Mínimo"
          value={localPriceRange[0]}
          onChange={(e) => handleMinPriceChange(Number(e.target.value))}
          onBlur={handleInputBlur}
          InputProps={{ 
            inputProps: { min: 0, max: localPriceRange[1] },
            sx: { fontSize: '0.875rem' }
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <Typography sx={{ color: '#9ca3af', fontWeight: 700 }}>—</Typography>
        <TextField
          size="small"
          type="number"
          label="Máximo"
          value={localPriceRange[1]}
          onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
          onBlur={handleInputBlur}
          InputProps={{ 
            inputProps: { min: localPriceRange[0], max: maxPrice },
            sx: { fontSize: '0.875rem' }
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'center', backgroundColor: '#f9fafb', py: 1.5, borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: '#374151', fontWeight: 600 }}>
          {formatPrice(localPriceRange[0])} - {formatPrice(localPriceRange[1])}
        </Typography>
      </Box>
    </Box>
  );
}