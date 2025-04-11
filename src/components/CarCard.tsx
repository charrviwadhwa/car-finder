
import { Car } from "@/types/car";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "./ui/button";
import { Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  viewMode?: "grid" | "list";
}

export default function CarCard({ car, onViewDetails, viewMode = "grid" }: CarCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(car.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(car);
  };

  // Get the primary image for the card
  const primaryImage = car.images && car.images.length > 0 
    ? car.images[0] 
    : car.imageUrl || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop"; // Fallback image

  if (viewMode === "list") {
    return (
      <div 
        className="car-card bg-card border rounded-lg overflow-hidden shadow-sm flex cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="w-1/3 h-48 relative">
          <img 
            src={primaryImage} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
                <p className="text-muted-foreground text-sm">{car.year} · {car.fuelType}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn("btn-wishlist", inWishlist ? "text-red-500" : "text-muted-foreground")}
                onClick={handleWishlistToggle}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-5 w-5", inWishlist ? "fill-red-500" : "")} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs">
                <span className="text-muted-foreground block">Seats</span>
                <span className="font-medium">{car.seats}</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground block">Transmission</span>
                <span className="font-medium">{car.transmission}</span>
              </div>
            </div>
            
            <p className="text-sm mt-2 line-clamp-2">{car.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold">${car.price.toLocaleString()}</span>
            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
              <Info className="mr-2 h-4 w-4" />
              Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="car-card bg-card border rounded-lg overflow-hidden shadow-sm cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="h-48 relative overflow-hidden">
        <img 
          src={primaryImage} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop";
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 btn-wishlist",
            inWishlist ? "text-red-500" : "text-muted-foreground"
          )}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-5 w-5", inWishlist ? "fill-red-500" : "")} />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{car.brand} {car.model}</h3>
        <p className="text-muted-foreground text-sm">{car.year} · {car.fuelType}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="text-xs">
            <span className="text-muted-foreground block">Seats</span>
            <span className="font-medium">{car.seats}</span>
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground block">Transmission</span>
            <span className="font-medium">{car.transmission}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold">${car.price.toLocaleString()}</span>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
