
import { FilterState, SortOption } from "@/types/car";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getAllBrands, getAllFuelTypes, getMinMaxPrice } from "@/services/carService";

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export default function FilterSection({
  filters,
  onFilterChange,
  className,
}: FilterSectionProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100000,
  });
  const [localPriceRange, setLocalPriceRange] = useState<[number]>([filters.maxPrice || 100000]);

  // Load static data on mount
  useEffect(() => {
    setBrands(getAllBrands());
    setFuelTypes(getAllFuelTypes());
    const { min, max } = getMinMaxPrice();
    setPriceRange({ min, max });
    setLocalPriceRange([filters.maxPrice || max]);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const handleBrandChange = (value: string) => {
    onFilterChange({
      ...filters,
      brand: value,
    });
  };

  const handleFuelTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      fuelType: value,
    });
  };

  const handleSeatsChange = (value: string) => {
    onFilterChange({
      ...filters,
      seats: parseInt(value) || 0,
    });
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange([values[0]]);
    onFilterChange({
      ...filters,
      maxPrice: values[0],
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({
      ...filters,
      sortBy: value as SortOption,
    });
  };

  const handleReset = () => {
    onFilterChange({
      brand: "",
      minPrice: 0,
      maxPrice: priceRange.max,
      fuelType: "",
      seats: 0,
      searchTerm: "",
      sortBy: "price-asc",
    });
    setLocalPriceRange([priceRange.max]);
  };

  return (
    <div className={`filter-section bg-card rounded-lg border p-4 ${className}`}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <div className="mt-1">
            <Input
              id="search"
              placeholder="Search by brand, model, or features"
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand" className="text-sm font-medium">
              Brand
            </Label>
            <Select
              value={filters.brand}
              onValueChange={handleBrandChange}
            >
              <SelectTrigger id="brand">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fuelType" className="text-sm font-medium">
              Fuel Type
            </Label>
            <Select
              value={filters.fuelType}
              onValueChange={handleFuelTypeChange}
            >
              <SelectTrigger id="fuelType">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {fuelTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="seats" className="text-sm font-medium">
            Minimum Seats
          </Label>
          <Select
            value={filters.seats.toString()}
            onValueChange={handleSeatsChange}
          >
            <SelectTrigger id="seats">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
              <SelectItem value="7">7+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="price" className="text-sm font-medium">
              Maximum Price
            </Label>
            <span className="text-sm font-semibold">
              ${Math.round(localPriceRange[0]).toLocaleString()}
            </span>
          </div>
          <div className="mt-2">
            <Slider
              id="price"
              min={priceRange.min}
              max={priceRange.max}
              step={1000}
              value={localPriceRange}
              onValueChange={handlePriceChange}
              className="my-4"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="sort" className="text-sm font-medium">
            Sort By
          </Label>
          <Select
            value={filters.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
