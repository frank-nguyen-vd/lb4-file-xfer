"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const path_1 = tslib_1.__importDefault(require("path"));
const test_helper_1 = require("./test-helper");
describe('file upload acceptance - multipart/form-data', () => {
    let sandbox;
    let client;
    let app;
    before(resetSandbox);
    before(givenAClient);
    after(async () => {
        await app.stop();
    });
    after(resetSandbox);
    it('supports file uploads', async () => {
        const FIXTURES = path_1.default.resolve(__dirname, '../../../fixtures');
        const res = await client
            .post('/files')
            .field('user', 'john')
            .field('email', 'john@example.com')
            .attach('testFile1', path_1.default.resolve(FIXTURES, 'file-upload-test.txt'), {
            filename: 'file-upload-test.txt',
            contentType: 'multipart/form-data',
        })
            .attach('testFile2', path_1.default.resolve(FIXTURES, 'assets/index.html'), {
            filename: 'index.html',
            contentType: 'multipart/form-data',
        })
            .expect(200);
        testlab_1.expect(res.body.files[0]).containEql({
            fieldname: 'testFile1',
            originalname: 'file-upload-test.txt',
            mimetype: 'multipart/form-data',
        });
        testlab_1.expect(res.body.files[1]).containEql({
            fieldname: 'testFile2',
            originalname: 'index.html',
            mimetype: 'multipart/form-data',
        });
    });
    async function givenAClient() {
        ({ app, client } = await test_helper_1.setupApplication(sandbox.path));
    }
    async function resetSandbox() {
        sandbox = test_helper_1.getSandbox();
        await sandbox.reset();
    }
});
//# sourceMappingURL=file-upload.acceptance.js.map