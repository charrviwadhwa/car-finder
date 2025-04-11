
import { useWishlist } from "@/context/WishlistContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, Info, Trash2 } from "lucide-react";
import { Car } from "@/types/car";

interface WishlistDrawerProps {
  onViewDetails: (car: Car) => void;
}

export default function WishlistDrawer({ onViewDetails }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <Heart className="h-[1.2rem] w-[1.2rem] mr-2" />
          Wishlist
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Your Wishlist
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start adding cars you like to your wishlist
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/10"
                >
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-20 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {car.brand} {car.model}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {car.year} · ${car.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(car)}
                      title="View details"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(car.id)}
                      title="Remove from wishlist"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
