export interface ShippingInfo {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  price: number;
  days: string;
}

const SHIPPING_PRICES: { [key: string]: number } = {
  'SP': 0,
  'RJ': 9.90,
  'MG': 9.90,
  'ES': 9.90,
  'PR': 12.90,
  'SC': 12.90,
  'RS': 12.90,
  'GO': 15.90,
  'MT': 15.90,
  'MS': 15.90,
  'DF': 15.90,
  'AL': 19.90,
  'BA': 19.90,
  'CE': 19.90,
  'MA': 19.90,
  'PB': 19.90,
  'PE': 19.90,
  'PI': 19.90,
  'RN': 19.90,
  'SE': 19.90,
  'AC': 21.90,
  'AM': 21.90,
  'AP': 21.90,
  'PA': 21.90,
  'RO': 21.90,
  'RR': 21.90,
  'TO': 21.90,
};

const SHIPPING_DAYS: { [key: string]: string } = {
  'SP': '1-2 dias úteis',
  'RJ': '2-3 dias úteis',
  'MG': '2-3 dias úteis',
  'ES': '2-3 dias úteis',
  'PR': '3-4 dias úteis',
  'SC': '3-4 dias úteis',
  'RS': '3-5 dias úteis',
  'GO': '4-5 dias úteis',
  'MT': '5-7 dias úteis',
  'MS': '4-5 dias úteis',
  'DF': '3-4 dias úteis',
  'AL': '5-7 dias úteis',
  'BA': '5-7 dias úteis',
  'CE': '6-8 dias úteis',
  'MA': '7-9 dias úteis',
  'PB': '6-8 dias úteis',
  'PE': '5-7 dias úteis',
  'PI': '7-9 dias úteis',
  'RN': '6-8 dias úteis',
  'SE': '5-7 dias úteis',
  'AC': '10-15 dias úteis',
  'AM': '8-12 dias úteis',
  'AP': '10-15 dias úteis',
  'PA': '8-12 dias úteis',
  'RO': '8-12 dias úteis',
  'RR': '12-18 dias úteis',
  'TO': '6-8 dias úteis',
};

export async function calculateShipping(cep: string): Promise<ShippingInfo | null> {
  try {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }

    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    const state = data.uf.toUpperCase().trim();
    
    console.log('Estado retornado:', state);
    console.log('Preço para este estado:', SHIPPING_PRICES[state]);
    
    const price = SHIPPING_PRICES[state] !== undefined ? SHIPPING_PRICES[state] : 21.90;
    const days = SHIPPING_DAYS[state] || '10-15 dias úteis';

    return {
      cep: cleanCep,
      state,
      city: data.localidade,
      neighborhood: data.bairro || '',
      street: data.logradouro || '',
      price,
      days,
    };
  } catch (error) {
    console.error('Error calculating shipping:', error);
    return null;
  }
}

export function formatCep(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 5) {
    return cleaned;
  }
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
}

export const FREE_SHIPPING_THRESHOLD = 799.00;

export function calculateFreeShippingProgress(cartTotal: number): {
  percentage: number;
  remaining: number;
  isFree: boolean;
} {
  const isFree = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = isFree ? 0 : FREE_SHIPPING_THRESHOLD - cartTotal;
  const percentage = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return { percentage, remaining, isFree };
}