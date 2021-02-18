// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
inquirer
.prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name',
    }
])
// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
