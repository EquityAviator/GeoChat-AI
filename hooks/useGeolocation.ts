import { useState, useEffect } from 'react';
import type { GeolocationState } from '../types';

export const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let isMounted = true;
    const onSuccess = (position: GeolocationPosition) => {
      if (isMounted) {
        setState({
          loading: false,
          error: null,
          data: position.coords,
        });
      }
    };

    const onError = (error: GeolocationPositionError) => {
      if (isMounted) {
        setState({
          loading: false,
          error,
          data: null,
        });
      }
    };

    if (!navigator.geolocation) {
      if (isMounted) {
        setState({
          loading: false,
          error: {
            code: 0,
            message: 'Geolocation is not supported by your browser.',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          } as GeolocationPositionError,
          data: null,
        });
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
