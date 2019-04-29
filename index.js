// Look into getting the name of the app running on device to use as a parameter in the clg message

const nodeBash = require("./nodeBash");




const appName = () => {
    // commandRunning(menuMessage)
    nodeBash.exec(`adb shell dumpsys window windows | grep "mCurrentFocus"`, (err, res) => {
        if (err) {
            console.log(`ERROR: ${err}`);
            return;
        }
       return res.substring(res.indexOf('com'), res.indexOf('/'))
    });
};

const commandRunning = (commandMessage) => console.log("\x1b[36m%s\x1b[0m",commandMessage);
// const reloadingMessage =  `Reloading ${appName()} On Your Device`;
const reloadingMessage =  `Reloading Your App On Your Device`;
const menuMessage =  `Opening Developer Menu On Your Device`;
const debugMessage =  `Opening React Native Debugger`;
const supermanMessage =  `Entering username`;
const nextMessage =  `Hitting Next`;


const help = ()=>{ 
    console.log(
    `
  Usage
    $ rnr [options]
  Options
      menu -- Opens the Developer Menu On Your Device
      debug -- Opens react native debugger **if installed**
  Examples
    $ rnr 
        ${reloadingMessage}

    $ rnr menu
        ${menuMessage}
  `
  )};

module.exports = () => {

    const opts = process.argv.slice(2);
    
    const rnr = () => {
        
        commandRunning(reloadingMessage)
        nodeBash.exec("adb shell input keyevent KEYCODE_R  adb shell input keyevent KEYCODE_R", (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return;
            }
        });
    };
    const rnrMenu = () => {
        commandRunning(menuMessage)
        nodeBash.exec("adb shell input keyevent KEYCODE_MENU", (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return;
            }
        });
    };
    const rnrSuperman = () => {
        commandRunning(supermanMessage)
        nodeBash.exec(`adb shell input keyevent KEYCODE_S adb shell input keyevent KEYCODE_U adb shell input keyevent KEYCODE_P adb shell input keyevent KEYCODE_E adb shell input keyevent KEYCODE_R adb shell input keyevent KEYCODE_M adb shell input keyevent KEYCODE_A adb shell input keyevent KEYCODE_N`, (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return;
            }
        });
    };
    const next = () => {
        commandRunning(nextMessage)
        // adb shell input keyevent KEYCODE_NAVIGATE_NEXT
        nodeBash.exec("adb shell input keyevent  KEYCODE_NAVIGATE_IN", (err, res) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                return;
            }
        });
    };
    const rnrDebug = () => {
        commandRunning(debugMessage)
        nodeBash.exec('open "rndebugger://set-debugger-loc?host=localhost&port=8081"', (err, res) => {
            if (err) {
                console.log(`DEBUGGER ERROR: ${err}`);
                return;
            }
        });
    };
    if(opts.length === 0){
        return rnr();
    } else if (opts[0] === 'menu'){
        
        return rnrMenu();
    }else if (opts[0] === '--help'){
        return help()
    }
    else if ( opts[0] === 'app'){
        return rnrApp();
    }else if ( opts[0] === 'debug'){
        return rnrDebug();
    }else if ( opts[0] === 'sm'){
        return rnrSuperman();
    }else if ( opts[0] === 'next'){
        return next();
    }else{
        return rnrMenu();
    }
};
