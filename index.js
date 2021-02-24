//Packages for app
const inquirer = require('inquirer');
const fs = require('fs');
const icon = [];

const questions = [
    //github username
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',

        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter GitHub username.");
            }
            return true;
        }
    },
    //email address
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter your email.");
            }
            return true;
        }
    },
    //project name
    {
        type: 'input',
        message: 'What is the name of your project?',
        name: 'projectname',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter your project name.");
            }
            return true;
        }
    },
    //project description
    {
        type: 'input',
        message: 'Please write a short description of your project.',
        name: 'description',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter project description.");
            }
            return true;
        }
    },
    //license from a list
    {
        type: 'list',
        message: 'Please choose your license',
        name: 'license',
        choices: ["MIT", "APACHE 2.O", "GPL 3.0", "BSD 3", "None"],

    },
    //installation instructions
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'dependencies',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please provide your installation dependencies.");
            }
            return true;
        }
    },
    //testing instructions
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'tests',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please provide your testing commands.");
            }
            return true;
        }
    },
    //usage information
    {
        type: 'input',
        message: 'What does the user need to know about using the repo?',
        name: 'repoinstructions',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter your repo usage information.");
            }
            return true;
        }
    },
    //contributing information
    {
        type: 'input',
        message: 'What does the user need to know about contributing to the repo?',
        name: 'repocontribute',
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter contribution information.");
            }
            return true;
        }
    }
]



const generateREADME = (response) => {
    return `
# ${response.projectname}


## Description
${response.description}

${icon[0]}


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#tests)


## Installation

To install necessary dependencies, run the following command:

\`\`\`${response.dependencies}\`\`\`


## Usage
${response.repoinstructions}


## License
licensed under ${response.license}


## Contributing
${response.repocontribute}


## Tests
${response.tests}


## Questions
For additional help or questions about collaboration, please reach out to ${response.email}

Follow me on Github at [${response.github}](http://github.com/${response.github})
`
};


//function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}



//function to initialize app
function init() {

    inquirer

        //use inquirer to prompt users with questions to build their README.md
        .prompt(questions)

        //use user responses to create a new file
        .then(response => {
            if (response.license === 'MIT') {
                icon.push("[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)")
            }
            if (response.license === 'APACHE 2.O') {
                icon.push("[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)")
            }
            if (response.license === 'GPL 3.0') {
                icon.push("[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)")
            }
            if (response.license === 'BSD 3') {
                icon.push("[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)")
            }
            if (response.license === 'None') {
                icon.push(" ")
            }
            var readme = generateREADME(response);


            writeToFile('README.md', readme)
        })

        //catch any errors
        .catch(err => {
            if (err.isTtyError) {
                console.log("Error! Please try again")

                // Prompt couldn't be rendered in the current environment
            } else {
                ("Error! Please try again")
            }
        });
}

// Function call to initialize app
init();