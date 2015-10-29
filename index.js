/*
 * collect-cli-arguments
 * https://github.com/jsfi/collect-cli-arguments
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = function(configuration) {
    return init()
        .then(askQuestions)
        .then(cleanUp, errorCleanUp);

    function askQuestions(data) {
        let asking = Promise.resolve(data);

        configuration.questions.forEach(question => {
            asking = asking.then(ask(question));
        });

        return asking;
    }

    function init() {
        return new Promise((resolve, reject) => {
            if (Array.isArray(configuration.questions)) {
                resolve([]);
            } else {
                reject('Nothing configured.');
            }
        });
    }

    function ask(question) {
        return data => {
            return new Promise(resolve => {
                rl.question(pad(question.label), answer => {
                    if (question.flag) {
                        data.push(configuration.flagSymbol + question.flag);
                    } else if (question.alias) {
                        data.push(configuration.aliasSymbol + question.alias);
                    }

                    data.push(answer);
                    resolve(data);
                });
            });
        }
    }

    function cleanUp(data) {
        rl.close();
        return data;
    }

    function errorCleanUp(e) {
        rl.close();
        throw e;
    }

    function pad(text) {
        if (text.match(/\s$/)) {
            return text;
        }

        return text + ' ';
    }
};
