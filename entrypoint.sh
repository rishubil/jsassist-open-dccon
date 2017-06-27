#!/bin/bash
set -e

cd /source
yarn install
exec yarn start
