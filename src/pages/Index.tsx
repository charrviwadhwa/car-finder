
import { useState, useEffect } from "react";
import { getCars } from "@/services/carService";
import { FilterState, Car, ViewMode } from "@/types/car";
import FilterSection from "@/components/FilterSection";
import CarCard from "@/components/CarCard";
import CarDetailModal from "@/components/CarDetailModal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistDrawer from "@/components/WishlistDrawer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });
  
  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    minPrice: 0,
    maxPrice: 100000,
    fuelType: "",
    seats: 0,
    searchTerm: "",
    sortBy: "price-asc",
  });

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCars(filters, pagination.currentPage, 10);
      setCars(result.cars);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalCount: result.totalCount,
      });
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load cars. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars whenever filters or page changes
  useEffect(() => {
    fetchCars();
  }, [filters, pagination.currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <ThemeProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <header className="bg-card border-b sticky top-0 z-10">
            <div className="container py-4 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-bold mr-2">
                  <span className="text-carblue-600">Car</span>
                  <span className="text-carpurple-600">Finder</span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <WishlistDrawer onViewDetails={handleViewDetails} />
                <Separator orientation="vertical" className="h-6" />
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <FilterSection
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  className="sticky top-[73px]"
                />
              </div>
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    {!loading && (
                      <p className="text-muted-foreground">
                        Showing {cars.length} of {pagination.totalCount} cars
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`btn-toggle-view ${
                        viewMode === "grid" ? "bg-muted" : ""
                      }`}
                      onClick={() => setViewMode("grid")}
                      title="Grid view"
                    >
                      <Grid2X2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`btn-toggle-view ${
                        viewMode === "list" ? "bg-muted" : ""
                      }`}
                      onClick={() => setViewMode("list")}
                      title="List view"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Loading cars...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-destructive">{error}</p>
                    <Button onClick={fetchCars} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                ) : cars.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium">No cars found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                    <Button
                      onClick={() =>
                        handleFilterChange({
                          brand: "",
                          minPrice: 0,
                          maxPrice: 100000,
                          fuelType: "",
                          seats: 0,
                          searchTerm: "",
                          sortBy: "price-asc",
                        })
                      }
                      variant="outline"
                      className="mt-4"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="car-grid">
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                          : "flex flex-col gap-4"
                      }
                    >
                      {cars.map((car) => (
                        <CarCard
                          key={car.id}
                          car={car}
                          onViewDetails={handleViewDetails}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-8 gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: pagination.totalPages }).map((_, i) => (
                            <Button
                              key={i}
                              variant={pagination.currentPage === i + 1 ? "default" : "outline"}
                              size="icon"
                              onClick={() => handlePageChange(i + 1)}
                              className="w-9 h-9"
                            >
                              {i + 1}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === pagination.totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>

          <CarDetailModal
            car={selectedCar}
            open={isDetailOpen}
            onClose={closeDetailModal}
          />
        </div>
      </WishlistProvider>
    </ThemeProvider>
  );
}
