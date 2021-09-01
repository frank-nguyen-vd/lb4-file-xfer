"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSandbox = exports.setupApplication = void 0;
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const path_1 = tslib_1.__importDefault(require("path"));
const __1 = require("../..");
async function setupApplication(fileStorageDirectory) {
    const restConfig = testlab_1.givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
    });
    const app = new __1.FileUploadApplication({
        rest: restConfig,
        fileStorageDirectory,
    });
    await app.boot();
    await app.start();
    const client = testlab_1.createRestAppClient(app);
    return { app, client };
}
exports.setupApplication = setupApplication;
function getSandbox() {
    // dist/.sandbox/<a unique temporary subdir>
    const sandbox = new testlab_1.TestSandbox(path_1.default.resolve(__dirname, '../../.sandbox'));
    return sandbox;
}
exports.getSandbox = getSandbox;
//# sourceMappingURL=test-helper.js.map