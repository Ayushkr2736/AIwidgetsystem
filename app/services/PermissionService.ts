import {Platform, Linking} from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'undetermined';

export interface AppPermission {
  id: string;
  name: string;
  description: string;
  status: PermissionStatus;
  required: boolean;
}

class PermissionService {
  async openSettings() {
    await Linking.openSettings();
  }

  // This is a mockup that would integrate with react-native-permissions or our NativeModules
  async checkAllPermissions(): Promise<AppPermission[]> {
    return [
      {
        id: 'calendar',
        name: 'Calendar Access',
        description: 'Needed to show upcoming meetings and schedule-based intelligence.',
        status: 'undetermined',
        required: true,
      },
      {
        id: 'contacts',
        name: 'Contacts Access',
        description: 'Needed to suggest people to contact and provide relationship context.',
        status: 'undetermined',
        required: false,
      },
      {
        id: 'usage',
        name: 'Usage Stats',
        description: 'Needed to understand app patterns and suggest screen-time breaks.',
        status: 'undetermined',
        required: true,
      }
    ];
  }
}

export const permissionService = new PermissionService();
