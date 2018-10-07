#!/bin/bash

echo "Hacking NodeJS dependencies"
./node_modules/.bin/rn-nodeify --hack --install "assert, crypto, stream, events, vm, randombytes"