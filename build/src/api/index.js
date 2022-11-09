"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import auth from './routes/userRoute';
//import user from './routes/userRoute';
const roleRoute_1 = __importDefault(require("./routes/roleRoute"));
const routeRoute_1 = __importDefault(require("./routes/routeRoute"));
const truckRoute_1 = __importDefault(require("./routes/truckRoute"));
exports.default = () => {
    const app = (0, express_1.Router)();
    //user(app);
    (0, roleRoute_1.default)(app);
    (0, truckRoute_1.default)(app);
    (0, routeRoute_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map