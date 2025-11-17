import React from 'react';

export const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.43.66-1 .66-1.57 0-.57-.23-1.14-.66-1.57l-1.06-1.06c-1.33-1.33-1.33-3.51 0-4.84l4.24-4.24c1.33-1.33 3.51-1.33 4.84 0l4.24 4.24c1.33 1.33 1.33 3.51 0 4.84l-1.06 1.06c-.43.43-.66 1-.66 1.57 0 .57.23 1.14.66 1.57l1.06 1.06c.43.43.66 1 .66 1.57 0 .57-.23 1.14-.66 1.57l-4.24 4.24c-1.33 1.33-3.51 1.33-4.84 0l-4.24-4.24c-.43-.43-.66-1-.66-1.57 0-.57.23-1.14.66-1.57l1.06-1.06z" opacity=".3" />
        <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-8h2v2h-2zm0 4h2v2h-2z" />
    </svg>
);

export const GoogleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 .001-1.346-.138-2.65-.389-3.917z"></path>
    </svg>
);

export const MapPinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
    </svg>
);

export const MicrophoneIcon: React.FC<{ isListening?: boolean }> = ({ isListening }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isListening ? 'text-red-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V18.75m0 0A3.375 3.375 0 0015.375 12h.008c.495 0 .934-.212 1.234-.562M12 18.75V12.75m-3.375 0h-.008a3.375 3.375 0 01-3.375-3.375V9.75c0-.495.212-.934.562-1.234" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a3.375 3.375 0 01-3.375-3.375V9.75c0-1.864 1.51-3.375 3.375-3.375S15.375 7.886 15.375 9.75v-.008a3.375 3.375 0 01-3.375 3.375z" />
    </svg>
);

export const ThumbsUpIcon: React.FC<{ solid?: boolean }> = ({ solid }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill={solid ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M6.633 10.5l-1.84-1.84a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l1.84 1.84a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06z" />
    </svg>
);

export const ThumbsDownIcon: React.FC<{ solid?: boolean }> = ({ solid }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill={solid ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75A2.25 2.25 0 018.25 19.5c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H5.126c-1.026 0-1.945-.694-2.054-1.715A11.942 11.942 0 013 11.25c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H11.52c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 001.423.23h1.294M15.75 10.5l1.84 1.84a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06l-1.84-1.84a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06z" />
    </svg>
);

export const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const HistoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const WifiOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364M5.636 5.636l12.728 12.728" />
    </svg>
);
