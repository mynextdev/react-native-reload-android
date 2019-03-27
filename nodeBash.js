//This script allows you to run bash commands w/o the overhead of adidtional NPM Packages

const execChildProcess = require("child_process").exec;

module.exports = {
    exec: (command, cb) => {
        execChildProcess(command, (err, stdout, stderr) => {
            if (err != null) {
                return cb(new Error(err), null);
            } else if (typeof stderr !== "string") {
                return cb(new Error(stderr), null);
            }
            return cb(null, stdout);
        });
    }
};
