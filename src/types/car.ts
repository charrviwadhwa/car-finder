
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  mileage: number;
  seats: number;
  color: string;
  imageUrl: string;
  images: string[];  // Add this for multiple images
  description: string;
  features: string[];
}

export type SortOption = 'price-asc' | 'price-desc';

export interface FilterState {
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  seats: number;
  searchTerm: string;
  sortBy: SortOption;
}

export type ViewMode = 'grid' | 'list';
