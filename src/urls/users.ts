import { baseUrl } from './base';

export namespace Get {
  export const getUserByIdUrl = `${baseUrl}/user-by-id`;
  export const getUserByEmailUrl = `${baseUrl}/user-by-email`;
  export const getAllUsersUrl = `${baseUrl}/user-users`;
  export const getSellerDatesUrl = `${baseUrl}/user-dates`;
  export const getUsersByPermissionLevelUrl = `${baseUrl}/get-users-level`;
  export const loginUrl = `${baseUrl}/login`;
}

export namespace Post {
  export const createUser = `${baseUrl}/create-user`;
  export const updateUser = `${baseUrl}/update-user`;
  export const deleteUserById = `${baseUrl}/delete-user`;
  export const addSellerDate = `${baseUrl}/add-date`;
  export const removeSellerDate = `${baseUrl}/remove-date`;
}
