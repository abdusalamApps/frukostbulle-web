import { baseUrl } from './base';

export namespace Get {
  export const getUserByIdUrl = `${baseUrl}/user-by-id?id=`;
  export const getUserByEmailUrl = `${baseUrl}/user-by-email?user-email=`;
  export const getAllUersUrl = `${baseUrl}/user-users`;
  export const getSellerDatesUrl = `${baseUrl}/user-dates`;
  export const getUsersByPermissionLevelUrl = `${baseUrl}/get-users-level?level=`;
  export const resetPasswordUrl = `${baseUrl}/reset-pass`;
}

export namespace Post {
  export const loginUrl = `${baseUrl}/login`;
  export const createUserUrl = `${baseUrl}/create-user`;
  export const createUserNoPassUrl = `${baseUrl}/create-user-auto-pass`;
  export const sendCreateEmailUrl = `${baseUrl}/send-create-email`;
  export const confirmAccountUrl = `${baseUrl}/confirm`;

  export const updateUserUrl = `${baseUrl}/update-user`;
  export const deleteUserByIdUrl = `${baseUrl}/delete-user?userId=`;
  export const addSellerDateUrl = `${baseUrl}/add-date`;
  export const removeSellerDateUrl = `${baseUrl}/remove-date`;
  export const updateSellerDatesUrl = `${baseUrl}/update-dates`;
  export const updatePasswordUrl = `${baseUrl}/update-password`;
  export const checkPasswordUrl = `${baseUrl}/check-password`;
  export const associateSellerUrl = `${baseUrl}/associate-seller`;
  export const sendResetPassEmailUrl =`${baseUrl}/send-reset-pass-email`;
  export const resetPassUrl =`${baseUrl}/reset-pass`;
  export const adminConfirmAccount =`${baseUrl}/admin-activate-user`;



}
