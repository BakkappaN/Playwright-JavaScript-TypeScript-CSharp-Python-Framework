const Logger = require('./utils/logger');

const TEST_SEPARATOR = "##################";
const STEP_SEPARATOR = "------------------";

class CustomReporter {
    constructor(options) {
        console.log(`${options.customOption} is enabled`);
    }

    onTestBegin(test, result) {
        this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
    }

    onTestEnd(test, result) {
        if (result.status === 'failed') {
            const errorMessage = result.error ? result.error.stack : 'No error stack available';
            Logger.error(`Test: ${test.title} - ${result.status}\n${errorMessage}`);
        }
        this.printLogs(`Test: ${test.title} - ${result.status}`, TEST_SEPARATOR);
    }

    onStdOut(chunk, test, result) {
        Logger.info(chunk);
    }

    onStdErr(chunk, test, result) {
        Logger.error(chunk);
    }

    onStepBegin(test, result, step) {
        if (step.category === "test.step") {
            if (typeof step.parent !== "undefined") {
                Logger.info(step.title);
            } else {
                this.printLogs(`Started Step: ${step.title}`, STEP_SEPARATOR);
            }
        }
    }

    onStepEnd(test, result, step) {
        if (step.category === "test.step" && typeof step.parent === "undefined") {
            this.printLogs(`Completed Step: ${step.title}`, STEP_SEPARATOR);
        }
    }

    onError(error) {
        Logger.error(`Message: ${error.message}`);
        Logger.error(`Stack: ${error.stack}`);
        Logger.error(`Value: ${error.value}`);
    }

    printLogs(msg, separator) {
        Logger.info(separator);
        Logger.info(`${msg}`);
        Logger.info(separator);
    }
}

module.exports = CustomReporter;