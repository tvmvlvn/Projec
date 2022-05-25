import * as Updates from 'expo-updates';

export type Environment = 'local' | 'development' | 'production';

export function getEnvironment(): Environment {
  if (Updates.releaseChannel.startsWith('prod')) {
    return 'production';
  }
  if (Updates.releaseChannel.startsWith('dev')) {
    return 'development';
  }
  return 'local';
}
