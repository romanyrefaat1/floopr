import React from "react";
import { UserInfo as FlooprUserInfo } from "./FlooprFeedbackModalTimeout";
interface FeedbackWrapperProps {
    apiKey: string;
    productId: string;
    componentId: string;
    apiBaseUrl?: string;
    userInfo?: FlooprUserInfo;
}
declare const FeedbackWrapper: React.FC<FeedbackWrapperProps>;
export default FeedbackWrapper;
