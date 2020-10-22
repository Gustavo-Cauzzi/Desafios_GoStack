const formatValue = (value: number): string => Intl.NumberFormat('pt', { style: 'currency', currency: 'BRL' }).format(value); // TODO

export default formatValue;
