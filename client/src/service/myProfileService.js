import { api } from "../api/api";
import { getAxiosHeaderConfig } from "../config";

export const updateProfile = async (localUserData) => {
  const headersConfig = await getAxiosHeaderConfig();
  if (!headersConfig) return { success: false, message: "Invalid headers" };

  try {
    const response = await api.post(
      "/login/change-Profile",
      {
        newName: localUserData.userName,
        newContact: localUserData.userContact,
        newLocation: localUserData.userLocation,
      },
      headersConfig
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error updating profile",
    };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const headersConfig = await getAxiosHeaderConfig();
  if (!headersConfig) return { success: false, message: "Invalid headers" };

  try {
    const response = await api.post(
      "/login/change-password",
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      headersConfig
    );

    if (response.status !== 200) {
      return { success: false, message: response.data.message };
    }

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Error changing password",
    };
  }
};
