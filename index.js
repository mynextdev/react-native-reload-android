const nodeBash = require("./nodeBash");

module.exports = (opts, callback) => {
    const rnr = () => {
        console.log("\x1b[36m%s\x1b[0m", "Opening Developer Menu on Your Android Device");
        nodeBash.exec("adb shell input keyevent KEYCODE_MENU", (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return;
            }
        });
    };
    return rnr();
};
