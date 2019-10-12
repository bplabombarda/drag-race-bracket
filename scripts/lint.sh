#!/bin/bash

echo 'Linting styles...'
./node_modules/.bin/stylelint 'src' --config .stylelintrc;

echo 'Linting JavaScript...'
./node_modules/.bin/eslint ./src;
