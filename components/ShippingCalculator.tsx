'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { calculateShipping, formatCep, ShippingInfo } from '@/lib/shipping';

interface ShippingCalculatorProps {
  onShippingCalculated: (info: ShippingInfo | null) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

export default function ShippingCalculator({ onShippingCalculated }: ShippingCalculatorProps) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [error, setError] = useState('');

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCep(e.target.value));
    setError('');
  };

  const handleCalculate = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setError('CEP inválido. Digite um CEP válido.');
      return;
    }

    setLoading(true);
    setError('');

    const info = await calculateShipping(cep);

    setLoading(false);

    if (!info) {
      setError('CEP não encontrado. Verifique e tente novamente.');
      setShippingInfo(null);
      onShippingCalculated(null);
      return;
    }

    setShippingInfo(info);
    onShippingCalculated(info);
  };

  const isValidCep = cep.replace(/\D/g, '').length === 8;

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LocalShippingIcon sx={{ fontSize: 20, color: '#6b7280' }} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
          Calcular Frete
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          placeholder="00000-000"
          value={cep}
          onChange={handleCepChange}
          size="small"
          inputProps={{ maxLength: 9 }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleCalculate}
          disabled={loading || !isValidCep}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 600,
            minWidth: 80,
            '&:hover': {
              backgroundColor: '#1a1a1a',
            },
            '&:disabled': {
              backgroundColor: '#e5e7eb',
              color: '#9ca3af',
            },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Calcular'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, py: 0.5 }}>
          {error}
        </Alert>
      )}

      {shippingInfo && (
        <Box
          sx={{
            p: 2,
            backgroundColor: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 20, color: '#16a34a' }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#15803d' }}>
              Frete calculado com sucesso!
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" sx={{ color: '#374151' }}>
              {shippingInfo.city} - {shippingInfo.state}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>
              {shippingInfo.price === 0 ? 'GRÁTIS' : formatPrice(shippingInfo.price)}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            Entrega em {shippingInfo.days}
          </Typography>
        </Box>
      )}
    </Box>
  );
}