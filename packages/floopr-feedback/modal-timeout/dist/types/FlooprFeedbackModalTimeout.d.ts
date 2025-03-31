import React from "react";
export type UserInfo = {
    userId?: string;
    username?: string;
    profilePicture?: string;
};
interface FlooprFeedbackModalTimeoutProps {
    apiKey: string;
    productId: string;
    componentId: string;
    userInfo?: UserInfo;
    apiBaseUrl?: string;
    ImageComponent?: React.ComponentType<any>;
    LinkComponent?: React.ComponentType<any>;
    isOpen: boolean;
    onClose: () => void;
    parent?: React.RefObject<HTMLElement>;
}
export default function FlooprFeedbackModalTimeout({ apiKey, productId, componentId, userInfo, apiBaseUrl, // Default to relative URLs for Next.js
ImageComponent, // Default to next/image for React component
LinkComponent, // Default to next/link for React component
isOpen, onClose, parent, }: FlooprFeedbackModalTimeoutProps): import("react/jsx-runtime").JSX.Element | null;
export {};
