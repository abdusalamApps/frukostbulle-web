import { baseUrl } from './base';

export namespace Get {
  export const getUserByIdUrl = `${baseUrl}/user-by-id?id=`;
  export const getUserByEmailUrl = `${baseUrl}/user-by-email?user-email=`;
  export const getAllUsersUrl = `${baseUrl}/user-users`;
  export const getSellerDatesUrl = `${baseUrl}/user-dates`;
  export const getUsersByPermissionLevelUrl = `${baseUrl}/get-users-level`;
}

export namespace Post {
  export const loginUrl = `${baseUrl}/login`;
  export const createUserUrl = `${baseUrl}/create-user`;
  export const sendCreateEmailUrl = `${baseUrl}/send-create-email?userEmail=`;
  export const updateUserUrl = `${baseUrl}/update-user`;
  export const deleteUserByIdUrl = `${baseUrl}/delete-user`;
  export const addSellerDateUrl = `${baseUrl}/add-date`;
  export const removeSellerDateUrl = `${baseUrl}/remove-date`;
  export const updateSellerDatesUrl = `${baseUrl}/update-dates`;
  export const updatePasswordUrl = `${baseUrl}/update-password`;
  export const checkPasswordUrl = `${baseUrl}/check-password`;
}
