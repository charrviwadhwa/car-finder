
import { Car, FilterState } from "@/types/car";

const MOCK_CARS: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 32000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Silver",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3ef12e8c79?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3ef12e8c79?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622987147109-9a5ab95f8e23?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The reliable and popular family sedan with excellent fuel efficiency.",
    features: ["Adaptive Cruise Control", "Lane Departure Warning", "Apple CarPlay", "Android Auto", "Blind Spot Monitor"]
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 28000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2874&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2874&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1677715206761-63eee84d7834?q=80&w=2915&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1671274830511-b646496a973c?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The compact sedan with sporty handling and great fuel economy.",
    features: ["Honda Sensing Suite", "Wireless Charging", "Heated Seats", "Remote Start", "Multi-Angle Rearview Camera"]
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2874&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562696889-f16685c8cce7?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The popular electric sedan with impressive range and performance.",
    features: ["Autopilot", "Full Self Driving Capability", "Glass Roof", "15-inch Touchscreen", "Sentry Mode"]
  },
  {
    id: 4,
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 62000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 0,
    seats: 7,
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669208124242-a94e0d879903?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603553329474-99f95f35394f?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The luxury SUV with powerful performance and advanced technology.",
    features: ["BMW iDrive 8", "Panoramic Sunroof", "Harman Kardon Sound", "Head-Up Display", "Gesture Control"]
  },
  {
    id: 5,
    brand: "Ford",
    model: "F-150",
    year: 2023,
    price: 55000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Red",
    imageUrl: "https://images.unsplash.com/photo-1595758228888-103c8db3417a?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595758228888-103c8db3417a?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669125860813-39dded4342c6?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625934666456-8058d8cf34d3?q=80&w=2874&auto=format&fit=crop"
    ],
    description: "The popular pickup truck with excellent towing capacity and utility features.",
    features: ["Pro Power Onboard", "Tailgate Work Surface", "SYNC 4", "360-Degree Camera", "Zone Lighting"]
  },
  {
    id: 6,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 68000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Silver",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2835&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2835&auto=format&fit=crop"
    ],
    description: "The executive luxury sedan with elegant design and cutting-edge technology.",
    features: ["MBUX Infotainment", "Burmester Surround Sound", "Active Parking Assist", "Multibeam LED Headlights", "Air Body Control"]
  },
  {
    id: 7,
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 32000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Green",
    imageUrl: "https://images.unsplash.com/photo-1633506203517-bae2c8a19222?q=80&w=2832&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1633506203517-bae2c8a19222?q=80&w=2832&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633506331566-49a9234e4110?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633575724509-db072ed55ba9?q=80&w=2787&auto=format&fit=crop"
    ],
    description: "The stylish compact SUV with modern design and efficient hybrid powertrain.",
    features: ["SmartSense Safety Suite", "Panoramic Sunroof", "Bose Premium Audio", "Blind View Monitor", "Remote Smart Parking Assist"]
  },
  {
    id: 8,
    brand: "Audi",
    model: "Q7",
    year: 2023,
    price: 72000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 0,
    seats: 7,
    color: "Gray",
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The premium three-row SUV with sophisticated design and advanced technology.",
    features: ["Virtual Cockpit", "Bang & Olufsen 3D Sound", "Audi Pre Sense", "Adaptive Air Suspension", "Matrix LED Headlights"]
  },
  {
    id: 9,
    brand: "Nissan",
    model: "Leaf",
    year: 2023,
    price: 35000,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594038526369-9192fdcb0ae4?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594038526682-7871e5eb7da3?q=80&w=2670&auto=format&fit=crop"
    ],
    description: "The affordable electric hatchback with good range and zero emissions.",
    features: ["ProPILOT Assist", "e-Pedal", "Bose Energy Efficient Series", "Around View Monitor", "NissanConnect EV"]
  },
  {
    id: 10,
    brand: "Jeep",
    model: "Wrangler",
    year: 2023,
    price: 46000,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: 0,
    seats: 4,
    color: "Orange",
    imageUrl: "https://images.unsplash.com/photo-1572931218286-1bfe6f47d8e2?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572931218286-1bfe6f47d8e2?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613856542473-d6e5c664fcbb?q=80&w=2865&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605429523419-d828acb941d9?q=80&w=2835&auto=format&fit=crop"
    ],
    description: "The iconic off-road SUV with exceptional capability and distinctive design.",
    features: ["Removable Doors", "Fold-Down Windshield", "Rock-Trac 4x4 System", "Trail Rated Badge", "Alpine Premium Audio"]
  },
  {
    id: 11,
    brand: "Chevrolet",
    model: "Bolt EV",
    year: 2023,
    price: 31000,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Yellow",
    imageUrl: "https://images.unsplash.com/photo-1603425013520-e38171e8445b?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1603425013520-e38171e8445b?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603425013477-0d903063e9d3?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2787&auto=format&fit=crop"
    ],
    description: "The compact electric vehicle with impressive range and affordable price.",
    features: ["DC Fast Charging", "One Pedal Driving", "10.2-inch Touchscreen", "Rear Camera Mirror", "Apple CarPlay & Android Auto"]
  },
  {
    id: 12,
    brand: "Volvo",
    model: "XC60",
    year: 2023,
    price: 52000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1625688223793-535ffd738289?q=80&w=2829&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1625688223793-535ffd738289?q=80&w=2829&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625686189219-fce319ca300d?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625686189566-de12a0cd5548?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The luxury midsize SUV with Scandinavian design and advanced safety features.",
    features: ["Pilot Assist", "Bowers & Wilkins Audio", "Four-Zone Climate Control", "360° Surround View Camera", "City Safety"]
  },
  {
    id: 13,
    brand: "Kia",
    model: "Telluride",
    year: 2023,
    price: 47000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 8,
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1601750183535-ef14db4d8905?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601750183535-ef14db4d8905?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601750119557-522d0e3d695f?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The award-winning three-row SUV with spacious interior and premium features.",
    features: ["Kia Drive Wise", "Harman Kardon Audio", "Dual Sunroof", "Heads-Up Display", "Heated & Ventilated Seats"]
  },
  {
    id: 14,
    brand: "Subaru",
    model: "Outback",
    year: 2023,
    price: 38000,
    fuelType: "Petrol",
    transmission: "CVT",
    mileage: 0,
    seats: 5,
    color: "Green",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579700264505-c7f00a502f6e?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567127662157-558db5a454cb?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The rugged wagon with all-wheel drive and excellent off-road capability.",
    features: ["EyeSight Driver Assist", "StarLink Infotainment", "X-MODE with Hill Descent Control", "DriverFocus", "11.6-inch Touchscreen"]
  },
  {
    id: 15,
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 33000,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Red",
    imageUrl: "https://images.unsplash.com/photo-1670513758143-70e376ce929f?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1670513758143-70e376ce929f?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670513925735-97e686824db0?q=80&w=2918&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670513758858-c51d4c9311b9?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The stylish compact SUV with responsive handling and upscale interior.",
    features: ["i-Activsense Safety", "Bose 10-Speaker Audio", "Active Driving Display", "Mazda Radar Cruise Control", "Signature LED Lighting"]
  },
  {
    id: 16,
    brand: "Lexus",
    model: "RX",
    year: 2023,
    price: 58000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Silver",
    imageUrl: "https://images.unsplash.com/photo-1611988515559-84ccd2f28dce?q=80&w=2835&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611988515559-84ccd2f28dce?q=80&w=2835&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1673898423622-8925e77afbf3?q=80&w=2829&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1656468014942-fcfc87d00ac0?q=80&w=2829&auto=format&fit=crop"
    ],
    description: "The luxury crossover with refined ride and excellent hybrid efficiency.",
    features: ["Lexus Safety System+", "Mark Levinson Audio", "Touch-Free Power Rear Door", "Panoramic View Monitor", "Climate Concierge"]
  },
  {
    id: 17,
    brand: "Land Rover",
    model: "Defender",
    year: 2023,
    price: 65000,
    fuelType: "Diesel",
    transmission: "Automatic",
    mileage: 0,
    seats: 7,
    color: "Green",
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613422683220-ea64afba1e07?q=80&w=2944&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613422683209-11fc19cc90e3?q=80&w=2944&auto=format&fit=crop"
    ],
    description: "The iconic off-road SUV with legendary capability and modern luxury.",
    features: ["Terrain Response 2", "Wade Sensing", "ClearSight Ground View", "Electronic Air Suspension", "Meridian Surround Sound"]
  },
  {
    id: 18,
    brand: "Porsche",
    model: "Taycan",
    year: 2023,
    price: 95000,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0,
    seats: 4,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2974&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619682817746-659e9069eaa7?q=80&w=2970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619682817822-ea97400f2929?q=80&w=2974&auto=format&fit=crop"
    ],
    description: "The high-performance electric sports car with stunning design and thrilling dynamics.",
    features: ["800-Volt Architecture", "Performance Battery Plus", "Adaptive Air Suspension", "Porsche Dynamic Chassis Control", "Head-Up Display"]
  },
  {
    id: 19,
    brand: "Volkswagen",
    model: "ID.4",
    year: 2023,
    price: 42000,
    fuelType: "Electric",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1628555588858-b057a3745c23?q=80&w=2787&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1628555588858-b057a3745c23?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604465077137-e33e2ed3ab38?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1651297641574-851ff738ee81?q=80&w=2787&auto=format&fit=crop"
    ],
    description: "The electric crossover with spacious interior and good range.",
    features: ["ID. Light", "Travel Assist", "Massage Seats", "12-inch Touchscreen", "Augmented Reality Head-Up Display"]
  },
  {
    id: 20,
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 35000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    mileage: 0,
    seats: 5,
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1666992591418-0b720200e146?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1666992591418-0b720200e146?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598260859730-eae0ee7ea46d?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575509933882-91bbe3b7de62?q=80&w=2940&auto=format&fit=crop"
    ],
    description: "The popular compact SUV with efficient hybrid powertrain and versatile interior.",
    features: ["Toyota Safety Sense 2.0", "Digital Rearview Mirror", "JBL Premium Audio", "Hands-Free Power Liftgate", "Multi-Terrain Select"]
  }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCars(filters: FilterState, page = 1, pageSize = 10): Promise<{
  cars: Car[],
  totalCount: number,
  totalPages: number,
  currentPage: number
}> {
  // Simulate API delay
  await delay(800);

  let filteredCars = [...MOCK_CARS];

  // Apply filters
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase() === filters.brand.toLowerCase());
  }

  if (filters.minPrice > 0) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
  }

  if (filters.maxPrice > 0) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
  }

  if (filters.fuelType) {
    filteredCars = filteredCars.filter(car => 
      car.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
  }

  if (filters.seats > 0) {
    filteredCars = filteredCars.filter(car => car.seats >= filters.seats);
  }

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(searchLower) || 
      car.model.toLowerCase().includes(searchLower) ||
      car.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  if (filters.sortBy === 'price-asc') {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    filteredCars.sort((a, b) => b.price - a.price);
  }

  // Calculate pagination
  const totalCount = filteredCars.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + pageSize);

  return {
    cars: paginatedCars,
    totalCount,
    totalPages,
    currentPage: page
  };
}

export async function getCarById(id: number): Promise<Car | null> {
  // Simulate API delay
  await delay(500);
  
  return MOCK_CARS.find(car => car.id === id) || null;
}

export const getAllBrands = (): string[] => {
  const brands = MOCK_CARS.map(car => car.brand);
  return [...new Set(brands)].sort();
};

export const getAllFuelTypes = (): string[] => {
  const fuelTypes = MOCK_CARS.map(car => car.fuelType);
  return [...new Set(fuelTypes)].sort();
};

export const getMinMaxPrice = (): { min: number; max: number } => {
  const prices = MOCK_CARS.map(car => car.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
