export const formatAddress = (address: {
  street: string;
  number: string;
  complement: string | null;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  country: string;
}): string => {
  const parts = [
    address.street,
    address.number,
    address.complement,
    address.neighborhood,
    address.zipCode,
    address.city,
    address.state,
    address.country,
  ].filter(Boolean);

  return parts.join(", ");
};
