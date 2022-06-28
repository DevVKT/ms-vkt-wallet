const request = require("supertest");
const assert = require("chai").assert;
const sinon = require("sinon");
const fh = require("../support/fixture-helper.js");
const log = require("metalogger")();

const TxEmitterService = require("../../lib/wallet/services/txEmitterService");

describe("tx Emitter service test", () => {
    const testService = new TxEmitterService();

    it("TXEmitter Service Task Run Success", () => {
        const expectedValue = "Success";
        const testEventHandler = function(result, job) {
            assert.equal(result, expectedValue, `Failed schedule tx`);
        };

        testService.addSuccessCallback(testEventHandler);

        testService.push(function(cb) {
            const result = expectedValue;
            cb(null, result);
        });

        testService.push(function(cb) {
            const result = expectedValue;
            cb(null, result);
        });

        testService.push(function(cb) {
            const result = expectedValue;
            cb(null, result);
        });

        testService.push(function(cb) {
            const result = expectedValue;
            cb(null, result);
        });

        testService.removeSuccessCallback(testEventHandler);
    });

    it("TXEmitter Service Promise Task Run Success", () => {
        const expectedValue = "Success";
        const expectedArg_1 = "arg_1";
        const expectedArg_2 = "arg_2";
        const expectedArg_3 = "arg_3";

        const testEventHandler = function(result, job) {
            log.info(result)
            assert.equal(result.res, expectedValue, `Failed schedule tx`);
            assert.equal(result.arg_1, expectedArg_3, `Failed schedule tx`);
            assert.equal(result.arg_2, expectedArg_2, `Failed schedule tx`);
            assert.equal(result.arg_3, expectedArg_3, `Failed schedule tx`);
        };

        testService.addSuccessCallback(testEventHandler);

        testService.push(function() {
            return new Promise(async function(resolve, reject) {
                await delay(2000);
                const result = {
                    res: expectedValue,
                    arg_1: expectedArg_1,
                    arg_2: expectedArg_2,
                    arg_3: expectedArg_3
                };

                resolve(result);
            });
        });

        testService.push(function() {
            return new Promise(async function(resolve, reject) {
                await delay(1000);
                const result = {
                    res: "Test2",
                    arg_1: "Arg1",
                    arg_2: "Arg2",
                    arg_3: "Arg3",
                };

                resolve(result);
            });
        });
    });
});