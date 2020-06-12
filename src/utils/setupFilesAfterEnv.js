// global.log = console.log;

// const beforeEach = global.beforeEach;
// let outputData = "";
// storeLog = (inputs) => {
//     log(inputs);
//     outputData = `
//         ${outputData}
//         ${inputs}
//     `;
// };

// global.beforeEach = (cb) => {
//     console["log"] = jest.fn(storeLog);
//     beforeEach(cb);
// };

// const afterEach = global.afterEach;

// global.afterEach = (cb) => {
//     log("======================");
//     log(outputData);
//     afterEach(cb);
// };
