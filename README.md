# Basic Frontend IDE 2022
My current personal frontend test and development environment. It is based on Vite.

## Tech Stack
- JavaScript / TypeScript
- ES6+
- SASS / SCSS
- Bootstrap 5.2 (Beta)

## Installation Instructions
1. Initialize a new repo from the [template repo](https://github.com/lucaspl3tti/basic-frontend-ide-2022)
2. Clone the new created repo with `git clone git@github.com:lucaspl3tti/<Repo Path>.git` to your desktop
   * use `git clone https://github.com/lucaspl3tti/<Repo Path>.git` if you aren't using git with ssh
3. Run an installation of the package dependencies using `npm i`

## Commands
`npm run dev` run this command to initialize a dev server with hot module replacement

`npm run build` run this command to build the final app

`npm run preview` run this command to initialize a preview server of the build

`npm run lint:scss` run this command to lint over all scss files

`npm run lint:js` run this command to lint over all js files

## TypeScript
To use TypeScript you simply need to change your JavaScript files into TypeScript files and then also adjust source link for the "main.js/ts" file in the html code. Vite then automatically compiles it.

ATTENTION: Vite doesn't do type checking. This is cause it is assuming that this is already done by your IDE Program (like Visual Studio Code e.g.) and your build process. So keep that in mind.
