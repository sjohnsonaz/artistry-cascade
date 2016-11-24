# TS Boilerplate

[![Build Status](https://travis-ci.org/sjohnsonaz/ts-boilerplate.svg?branch=master)](https://travis-ci.org/sjohnsonaz/ts-boilerplate)

TypeScript boilerplate.

# Project Installation

This boilerplate can be used to start any TypeScript project. It also may be used for educational purposes. For a fresh installation, follow these steps.

## Install Environment

1. Install Node.js from <https://nodejs.org>.
2. Install Atom from <https://atom.io>
3. Install git from <https://git-scm.com>
4. Install SourceTree from <https://www.sourcetreeapp.com>
5. Clone <https://github.com/sjohnsonaz/ts-boilerplate.git>
6. Run Command Prompt (`cmd`)

  1. `npm install typescript -g`
  2. `npm install typings -g`
  3. `npm install webpack -g`
  4. `npm install jest-cli -g`
  5. `npm install nodemon -g`

## Configure Atom

1. Run Atom
2. Install Packages

  1. Go to `Packages -> Settings View -> Install Packages/Themes`
  2. Find and install:

    - `atom-beautify`
    - `atom-typescript`
    - `file-icons`
    - `highlight-selected`
    - `markdown-scroll-sync`
    - `minimap`
    - `tool-bar`
    - `tool-bar-main`

  3. Go to `Editor` in the settings tab

    1. Set **Tab Length** to `4`

  4. Go to `Packages` in the Settings tab

    1. Find `atom-beautify` and activate **JavaScript space after anon function**
    2. Find `tree-view` and activate **Hide VCS Ignored Files**

3. Open Project

  1. Go to `File->Add Project Folder...`
  2. Open `ts-boilerplate`

## Build and Run Project

1. Run Command Prompt (`cmd`)

  1. `npm install`
  2. `npm run dev`

2. Run Atom

  1. Navigate to `ts-boilerplate/src/html/index.html`
  2. Right click `index.html`
  3. Click `Show in Explorer`
  4. When Explorer launches, open the file in a Browser.
