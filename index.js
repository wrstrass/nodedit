#!/usr/bin/env node

var fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


if (process.argv.length != 3) {
    console.error("Wrong amount of arguments!");
    return;
}

if(!fs.existsSync(process.argv[2])) {
    fs.writeFileSync(process.argv[2], "");
    console.log("File \"" + process.argv[2] + "\" was created");
}


var file = fs.readFileSync(process.argv[2], "utf-8");
var stringsOfFile = file.split("\r\n");

var iStrLength = stringsOfFile.length.toString().length;
for (var i = 0; i < stringsOfFile.length; i++) {
    var iStr = (i+1).toString();
    while (iStr.length != iStrLength)
        iStr = " " + iStr;

    console.log(iStr + "\t" + stringsOfFile[i]);
}


rl.on("menu", () => {
    rl.question("--> ", function (str) {
        if (str.substring(0, 5) == "write") {
            str = str.split(" ");
            str = +str[1];
            if (isNaN(str))
                rl.emit("error", "Wrong arguments!");
            else
                rl.emit("writeLine", str);
        }
        //console.log("str");
        //str = str.repl
    });
});

rl.on("writeLine", (number) => {
    rl.question(">", function (str) {
        if (str != ".exit") {
            stringsOfFile.splice(number, 0, str);
            rl.emit("writeLine");
        }
        else {
            console.log(stringsOfFile);
            rl.emit("menu");
        }
    });
});

rl.on("error", (msg) => {
    console.error(msg);
    rl.emit("menu");
});

//console.log("hello");
rl.emit("menu");