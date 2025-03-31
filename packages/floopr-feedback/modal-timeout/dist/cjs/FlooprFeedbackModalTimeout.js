"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var image_1 = __importDefault(require("next/image"));
var link_1 = __importDefault(require("next/link"));
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var sonner_1 = require("sonner");
function FlooprFeedbackModalTimeout(_a) {
    var _this = this;
    var apiKey = _a.apiKey, productId = _a.productId, componentId = _a.componentId, _b = _a.userInfo, userInfo = _b === void 0 ? {} : _b, _c = _a.apiBaseUrl, apiBaseUrl = _c === void 0 ? "" : _c, // Default to relative URLs for Next.js
    _d = _a.ImageComponent, // Default to relative URLs for Next.js
    ImageComponent = _d === void 0 ? image_1.default : _d, // Default to next/image for React component
    _e = _a.LinkComponent, // Default to next/image for React component
    LinkComponent = _e === void 0 ? link_1.default : _e, // Default to next/link for React component
    isOpen = _a.isOpen, onClose = _a.onClose, parent = _a.parent;
    var _f = (0, react_1.useState)(null), selectedRating = _f[0], setSelectedRating = _f[1];
    var _g = (0, react_1.useState)(null), animate = _g[0], setAnimate = _g[1];
    var _h = (0, react_1.useState)(false), loaded = _h[0], setLoaded = _h[1];
    var _j = (0, react_1.useState)(false), isSubmitting = _j[0], setIsSubmitting = _j[1];
    var _k = (0, react_1.useState)(10), timeoutDuration = _k[0], setTimeoutDuration = _k[1];
    var _l = (0, react_1.useState)("Got any feedback?"), title = _l[0], setTitle = _l[1];
    var _m = (0, react_1.useState)([
        { label: "1", emoji: "1️⃣", value: 1 },
        { label: "2", emoji: "2️⃣", value: 2 },
        { label: "3", emoji: "3️⃣", value: 3 },
        { label: "4", emoji: "4️⃣", value: 4 },
        { label: "5", emoji: "5️⃣", value: 5 },
    ]), ratings = _m[0], setRatings = _m[1];
    var _o = (0, react_1.useState)({
        accentColor: "#dbeafe",
        animation: "none",
        backgroundColor: "white",
        borderRadius: "0.375rem",
        fontFamily: "inherit",
        fontSize: "1rem",
        headingStyle: "bold",
        layout: "grid",
        primaryColor: "#3b82f6",
        secondaryColor: "#f3f4f6",
        shadowStyle: "soft",
        spacing: "comfortable",
        textColor: "#1f2937",
    }), styles = _o[0], setStyles = _o[1];
    var _p = (0, react_1.useState)([
        { label: "Your feedback", placeholder: "Share your feedback", id: 1, value: "" },
    ]), inputs = _p[0], setInputs = _p[1];
    var _q = (0, react_1.useState)("Submit"), buttonText = _q[0], setButtonText = _q[1];
    var _r = (0, react_1.useState)(true), isDarkMode = _r[0], setIsDarkMode = _r[1];
    // Construct API URLs based on apiBaseUrl
    var loadUrl = apiBaseUrl
        ? "".concat(apiBaseUrl, "/api/imports/components/load-component")
        : "/api/imports/components/load-component";
    var saveUrl = apiBaseUrl
        ? "".concat(apiBaseUrl, "/api/imports/components/save-data")
        : "/api/imports/components/save-data";
    // Validate required props
    if (!apiKey || !productId || !componentId) {
        sonner_1.toast.error("Failed to load component data: missing required parameters");
        return null;
    }
    // Normalize userInfo
    var userInfoNormalized = {
        userId: userInfo.userId || "",
        username: userInfo.username || "",
        profilePicture: userInfo.profilePicture || "",
    };
    // Load component data
    (0, react_1.useEffect)(function () {
        var loadComponent = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(loadUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ apiKey: apiKey, productId: productId, componentId: componentId }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!response.ok) {
                            throw new Error(data.error || "Failed to load component data");
                        }
                        setTitle(data.title);
                        setRatings(data.ratings);
                        setInputs(data.inputs);
                        setIsDarkMode(data.isDark);
                        if (data.style)
                            setStyles(data.style);
                        setButtonText(data.buttonText);
                        setTimeoutDuration(data.timeoutDuration);
                        setLoaded(true);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error loading component data:", error_1);
                        sonner_1.toast.error(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadComponent();
    }, [apiKey, productId, componentId, loadUrl]);
    var handleRatingClick = function (value) {
        setSelectedRating(value);
        setAnimate(value);
        setTimeout(function () { return setAnimate(null); }, 800);
    };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedRating === null) {
                        sonner_1.toast.error("Please select a rating before submitting");
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(saveUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                productId: productId,
                                componentId: componentId,
                                feedback: inputs,
                                isComponent: true,
                                rating: selectedRating,
                                userInfo: userInfoNormalized,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok)
                        throw new Error(data.error || "Failed to save feedback");
                    sonner_1.toast.success("Thank you for your feedback!");
                    onClose();
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error saving feedback:", error_2);
                    sonner_1.toast.error(error_2.message || "Failed to save feedback. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Early return if not loaded or not open
    if (!loaded || !isOpen)
        return null;
    // Sort ratings
    var sortedRatings = __spreadArray([], ratings, true).sort(function (a, b) { return a.value - b.value; });
    // Modal content
    var modalContent = ((0, jsx_runtime_1.jsxs)("div", __assign({ className: (0, utils_1.cn)(isDarkMode ? "dark" : "light", "p-6 w-full h-full rounded-lg shadow-lg", "[--background:0,0%,100%] [--foreground:0,0%,0%]", "[--muted:0,0%,96%] [--muted-foreground:0,0%,45%]", "[--border:0,0%,90%] [--input:0,0%,90%]", "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]", "dark:[--background:0,0%,15%] dark:[--foreground:0,0%,100%]", "dark:[--muted:0,0%,15%] dark:[--muted-foreground:0,0%,65%]", "dark:[--border:0,0%,20%] dark:[--input:0,0%,20%]", "dark:[--primary:250,89%,68%] dark:[--primary-foreground:0,0%,100%]", "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]") }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between items-center mb-8" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-2xl font-bold text-[hsl(var(--foreground))]" }, { children: title })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: onClose, className: "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors", "aria-label": "Close" }, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 20 }) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between mb-8 relative" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 left-0 w-full h-px bg-[hsl(var(--border))]" }), sortedRatings.map(function (rating, index) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-center z-10" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ className: (0, utils_1.cn)("w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 relative", selectedRating === rating.value
                                    ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]"
                                    : "bg-[hsl(var(--muted))] border-[hsl(var(--border))]"), onClick: function () { return handleRatingClick(rating.value); } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: (0, utils_1.cn)("transition-all duration-500 transform", animate === rating.value ? "scale-125" : "scale-100") }, { children: rating.emoji })), animate === rating.value && ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 rounded-full bg-[hsl(var(--primary)/0.5)] animate-ping" }))] })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-sm text-[hsl(var(--muted-foreground))] mt-2" }, { children: rating.label }))] }), index)); })] })), inputs.map(function (input, index) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "mb-6" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "block text-[hsl(var(--foreground))] text-left mb-2 font-medium" }, { children: input.label })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: input.placeholder, value: input.value, onChange: function (e) {
                            return setInputs(function (prev) {
                                var newInputs = __spreadArray([], prev, true);
                                newInputs[index] = __assign(__assign({}, input), { value: e.target.value });
                                return newInputs;
                            });
                        }, className: (0, utils_1.cn)("w-full border rounded-md p-3", "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]", "border-[hsl(var(--input))]", "focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent") })] }), index)); }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between items-center mt-8" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-sm font-medium text-[hsl(var(--muted-foreground))] px-3 py-1 rounded-md flex items-center justify-center align-center gap-1" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "mr-1" }, { children: "Made by" })), (0, jsx_runtime_1.jsx)(LinkComponent, __assign({ href: "https://floopr.vercel.app?componentRef=modal-timeout&appRef=".concat(typeof window !== "undefined" ? window.location : ""), target: "_blank", rel: "noopener noreferrer", className: "w-fit h-fit" }, { children: (0, jsx_runtime_1.jsx)(ImageComponent, { src: "/".concat(isDarkMode ? "floopr-logo-no-bg-white-svg" : "floopr-logo-no-bg-svg", ".svg"), alt: "floopr logo", width: 42, height: 12 }) }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleSave, className: (0, utils_1.cn)("px-5 py-2 rounded-md font-medium transition-colors duration-200", "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]", "hover:bg-[hsl(var(--primary)/0.9)]", "disabled:opacity-50"), disabled: isSubmitting }, { children: isSubmitting ? "Submitting..." : buttonText }))] }))] })));
    // Render as portal if parent is provided, otherwise full-page modal
    if (parent && parent.current) {
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" }, { children: modalContent })), parent.current);
    }
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "max-w-md w-full" }, { children: modalContent })) })));
}
exports.default = FlooprFeedbackModalTimeout;
