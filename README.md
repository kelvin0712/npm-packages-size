# npm-packages-size

A quick way to measure the install size of npm packages.

#### Result example

```json
        express         1.6 MB
  graphql-react         444.7 KB
 @apollo/client         3.8 MB
```

## Setup

To install from [npm](https://npmjs.com) run:

```sh
npm install npm-packages-size --save-dev
```

Add a [`package.json` script](https://docs.npmjs.com/files/package.json#scripts):

```json
{
  "scripts": {
    "npm-packages-size": "npm-packages-size"
  }
}
```

Then run the script to get the install size of the packages:

```sh
npm run npm-packages-size <packageName> <packageName>
```

## Cli

- The `npx npm-packages-size` script is handy for finding the install size of packages.

```sh
npx npm-packages-size <packageName> <packageName>
```
