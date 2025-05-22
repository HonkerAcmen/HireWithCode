"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoProviders = void 0;
const info_entity_1 = require("./info.entity");
exports.infoProviders = [
    {
        provide: 'INFO_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(info_entity_1.InfoEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=info.providers.js.map