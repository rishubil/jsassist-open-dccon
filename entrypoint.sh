#!/bin/bash
set -e

cd /source

if [ ! -z $1 ]
then
  exec yarn $@
else
  yarn install
  exec yarn start
fi
