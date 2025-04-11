
import { Car } from "@/types/car";
import { useWishlist } from "@/context/WishlistContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useState } from "react";

interface CarDetailModalProps {
  car: Car | null;
  open: boolean;
  onClose: () => void;
}

export default function CarDetailModal({
  car,
  open,
  onClose,
}: CarDetailModalProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});

  if (!car) return null;

  // Ensure car.images exists, if not use the main imageUrl
  const images = car.images && car.images.length > 0 
    ? car.images 
    : [car.imageUrl];
  
  const inWishlist = isInWishlist(car.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const handleImageError = (index: number) => {
    setImageLoadError(prev => ({ ...prev, [index]: true }));
  };

  const fallbackImage = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="h-64 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="h-64 w-full">
                    <img
                      src={imageLoadError[index] ? fallbackImage : image}
                      alt={`${car.brand} ${car.model} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {car.brand} {car.model}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {car.year} · {car.fuelType}
                </DialogDescription>
              </div>
              <span className="text-2xl font-bold">${car.price.toLocaleString()}</span>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-muted-foreground">Brand</div>
                <div>{car.brand}</div>
                <div className="text-muted-foreground">Model</div>
                <div>{car.model}</div>
                <div className="text-muted-foreground">Year</div>
                <div>{car.year}</div>
                <div className="text-muted-foreground">Fuel Type</div>
                <div>{car.fuelType}</div>
                <div className="text-muted-foreground">Transmission</div>
                <div>{car.transmission}</div>
                <div className="text-muted-foreground">Seats</div>
                <div>{car.seats}</div>
                <div className="text-muted-foreground">Color</div>
                <div>{car.color}</div>
                <div className="text-muted-foreground">Mileage</div>
                <div>{car.mileage.toLocaleString()} miles</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-3">Description</h3>
              <p className="text-muted-foreground">{car.description}</p>

              <h3 className="font-medium text-lg mt-4 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end gap-3">
            <Button
              variant={inWishlist ? "destructive" : "default"}
              onClick={handleWishlistToggle}
              className="gap-2"
            >
              <Heart className={cn("h-4 w-4", inWishlist ? "" : "fill-white")} />
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
