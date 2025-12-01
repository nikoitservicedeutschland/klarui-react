#!/bin/bash

npm version patch --no-git-tag-version

pnpm build

npm publish
