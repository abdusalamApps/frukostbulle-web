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
  associatedSeller: number;
  active: boolean;
  availableDates: Date[];
  orderBuffer: number;
  lasOrderDay: string;
  profilePictureUrl: string;
}
export enum PermissionLevel {
  BUYER,
  BAKERY,
  SELLER,
  Admin
}
