export interface User {
  id: number;
  name: string;
  county: string;
  city: string;
  address: string;
  mobile: number;
  email: string;
  password: string;
  permissionLevel: number;
  reminder: boolean;
  associatedBakery: string;
  active: boolean;
  avaialableDates: string[];
  lasOrderDay: string;
}
