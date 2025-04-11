
import { Car } from "@/types/car";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: number) => void;
  isInWishlist: (carId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("car-wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("car-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (car: Car) => {
    if (!isInWishlist(car.id)) {
      setWishlist((prev) => [...prev, car]);
      toast.success(`${car.brand} ${car.model} added to wishlist`);
    }
  };

  const removeFromWishlist = (carId: number) => {
    setWishlist((prev) => {
      const filtered = prev.filter((car) => car.id !== carId);
      const removedCar = prev.find((car) => car.id === carId);
      if (removedCar) {
        toast.success(`${removedCar.brand} ${removedCar.model} removed from wishlist`);
      }
      return filtered;
    });
  };

  const isInWishlist = (carId: number) => {
    return wishlist.some((car) => car.id === carId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
