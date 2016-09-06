## angular15-generator
[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![AppVeyor Build Status][appveyor-badge]][appveyor-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

A command line utility to quickly generate angular 1.5 component and route-component written in TypeScript.

## Prerequisites

The generated project has dependencies that require **Node 4.x.x and NPM 3.x.x**.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Generating Components and Routes Components](#generating-components-and-routes-components)
* [Configuration](#configuration)
* [Contributing](#contributing)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install angular15-generator
```

## Default structure

By default the tool assume that you use the following project structure:

    root
    └── src
        └── app
            ├── components
            ├── filters
            ├── routes
            └── services

If this is not your project structure, please have a look at the [Configuration](#configuration) section.

## Usage

```bash
ag --help
```

### Generating Components and Routes Components

You can use the `ag g` command to generate Angular components:

```bash
ag g --help

ag g component my-new-component
ag g route my-new-route-component
```

### Configuration

If our project's stucture does not match yours, you can override it:

```bash
ag config
```

This will add a new file `angular-generator.config.json` in your root directory.

You can edit this file to specify your project's structure.

```json
{
  "componentsRoot": "src/app/components",
  "routesRoot": "src/app/routes"
}
```
(This is the config.json file for our default project structure)

## Contributing

Currently the tool is available in French and English.

Feel free to send a PR with your locale file (see in `/bin/locales`).

## License

This project is licensed under the [MIT License](LICENSE).

[npm-badge]: https://img.shields.io/npm/v/angular15-generator.svg
[npm-badge-url]: https://www.npmjs.com/package/angular15-generator
[travis-badge]: https://img.shields.io/travis/JeffLeFoll/angular15-generator/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/JeffLeFoll/angular15-generator
[appveyor-badge]: https://img.shields.io/appveyor/ci/JeffLeFoll/angular15-generator/master.svg?label=AppVeyor
[appveyor-badge-url]: https://ci.appveyor.com/project/JeffLeFoll/angular15-generator/branch/master
[coveralls-badge]: https://img.shields.io/coveralls/JeffLeFoll/angular15-generator/master.svg
[coveralls-badge-url]: https://coveralls.io/github/JeffLeFoll/angular15-generator
[david-badge]: https://david-dm.org/JeffLeFoll/angular15-generator.svg
[david-badge-url]: https://david-dm.org/JeffLeFoll/angular15-generator
[david-dev-badge]: https://david-dm.org/JeffLeFoll/angular15-generator/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/JeffLeFoll/angular15-generator?type=dev