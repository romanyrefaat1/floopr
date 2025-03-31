"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var sonner_1 = require("sonner");
// Correct FC type usage
var FeedbackWrapper = function (_a) {
    var apiKey = _a.apiKey, productId = _a.productId, componentId = _a.componentId, _b = _a.apiBaseUrl, apiBaseUrl = _b === void 0 ? "" : _b, _c = _a.userInfo, userInfo = _c === void 0 ? {} : _c;
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, react_1.useState)(0), timeoutDuration = _e[0], setTimeoutDuration = _e[1];
    (0, react_1.useEffect)(function () {
        var loadTimeout = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(apiBaseUrl, "/api/imports/components/load-component"), {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ apiKey: apiKey, productId: productId, componentId: componentId }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (response.ok) {
                            setTimeoutDuration(data.timeoutDuration || 0);
                        }
                        else {
                            console.error("Failed to load timeout duration:", data.error);
                            sonner_1.toast.error("Failed to load timeout duration");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error loading timeout duration:", error_1);
                        sonner_1.toast.error("Error loading timeout duration");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadTimeout();
    }, [apiKey, productId, componentId, apiBaseUrl]);
    (0, react_1.useEffect)(function () {
        if (timeoutDuration > 0) {
            var timer_1 = setTimeout(function () { return setIsOpen(true); }, timeoutDuration * 1000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [timeoutDuration]);
    return apiKey = { apiKey: apiKey };
    productId = { productId: productId };
    componentId = { componentId: componentId };
    userInfo = { userInfo: userInfo };
    apiBaseUrl = { apiBaseUrl: apiBaseUrl };
    ImageComponent = "img";
    LinkComponent = "a";
    isOpen = { isOpen: isOpen };
    onClose = {}();
};
setIsOpen(false);
/>;
;
;
// Script injection logic
var injectFeedbackModal = function () {
    var script = document.currentScript;
    if (!script) {
        console.error("No script element found");
        return;
    }
    var apiBaseUrl = script.dataset.apiBaseUrl || "";
    var apiKey = script.dataset.apiKey || "";
    var productId = script.dataset.productId || "";
    var componentId = script.dataset.componentId || "";
    // Parse user info safely
    var userInfo = {};
    try {
        userInfo = script.dataset.userInfo
            ? JSON.parse(script.dataset.userInfo)
            : {};
    }
    catch (error) {
        console.error("Error parsing user info:", error);
    }
    var container = document.createElement("div");
    document.body.appendChild(container);
    var root = (0, client_1.createRoot)(container);
    root.render(apiKey, { apiKey: apiKey }, productId = { productId: productId }, componentId = { componentId: componentId }, apiBaseUrl = { apiBaseUrl: apiBaseUrl }, userInfo = { userInfo: userInfo }
        /  >
    );
};
// Run the injection
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFeedbackModal);
}
else {
    injectFeedbackModal();
}
exports.default = FeedbackWrapper;
