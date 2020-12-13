export interface User {
  id: number;
  name: string;
  county: string;
  city: string;
  address: string;
  mobilenbr: string;
  email: string;
  password: string;
  permissionLevel: number;
  reminder: boolean;
  associatedBakery: string;
  active: boolean;
  availableDates: string[];
  lasOrderDay: string;
}
