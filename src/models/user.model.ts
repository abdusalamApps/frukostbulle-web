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
  associatedBakery: number;
  active: boolean;
  availableDates: Date[];
  lasOrderDay: string;
  profilePictureUrl: string;
}
