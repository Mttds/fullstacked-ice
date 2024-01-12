# fullstacked-ice

Fullstack webdev (React, Redux, Node, CI/CD) exercises from University of Helsinki

https://fullstackopen.com/en/

Required:

- npm
- node.js
- nvm

## Part0

Basics

## Part1

React

### Init app with Vite

Using nvm for managing node versions.

```
nvm install 18.3.0
nvm use 18.3.0
nvm alias default 18.3.0
```

Scaffolding and running the app.

```
# part is the name of the project/directory
# npm 7+, extra double-dash is needed:
npm create vite@latest part1 -- --template react

cd part1
npm install

npm run dev
```

Today, the most popular way to do transpiling is by using Babel. Transpilation is automatically configured in React applications created with vite.

Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically anywhere - from servers to mobile phones. Let's practice writing some JavaScript using Node. The latest versions of Node already understand the latest versions of JavaScript, so the code does not need to be transpiled.

To run a JavaScript script: `node file.js`

It is also possible to write JavaScript code into the Node.js console, which is opened by typing node in the command line.

JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview
