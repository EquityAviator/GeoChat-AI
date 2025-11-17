export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  sources?: Source[];
  isMap?: boolean;
  mapQuery?: string;
}

export interface Source {
  uri: string;
  title: string;
  type: 'web' | 'maps';
}

export interface GroundingChunk {
  web?: {
    // FIX: Made uri and title optional to match @google/genai library type.
    uri?: string;
    title?: string;
  };
  maps?: {
    // FIX: Made uri and title optional to match @google/genai library type.
    uri?: string;
    title?: string;
  };
}

export interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: GeolocationCoordinates | null;
}
