export interface Manufacturer {
    name: string;
    country?: string;
    year?: number;
  }
  
  export interface Series {
    name: string;
    number: number;
  }
  
  export interface Car {
    name: string;
    brand: string;
    scale?: string;
    manufacturer: Manufacturer;
    year?: number;
    case?: string;
    color?: string;
    photo?: string;
    code?: string;
    tag?: string;
    series: Series;
  }
  