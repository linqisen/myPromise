// const fs = require("fs");
// import Promise from "./promise";
// //
// fs.readFile("./files/1.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log("err", err);
//         return;
//     }
//     console.log("success", data);
// });
// fs.readFile("./files/2.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log("err", err);
//         return;
//     }
//     console.log("success", data);
// });
const Promise = require("./promise.js");

// let promise1 = new Promise((resolve, reject) => {
//     // resolve("success");

//     setTimeout(() => {
//         resolve("success");
//     }, 1000);
// });

// promise1.then(
//     (res) => {
//         console.log("resolve", res);
//     },
//     (err) => {
//         console.log("reject", err);
//     }
// );


Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
