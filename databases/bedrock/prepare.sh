#!/bin/sh

set -eux

git clone https://github.com/Expensify/Bedrock.git

# Install some dependencies
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install gcc-9 g++-9 libpcre++-dev zlib1g-dev

# Build it
cd Bedrock
make

# Create an empty database (See: https://github.com/Expensify/Bedrock/issues/489)
touch bedrock.db

# Run it (press Ctrl^C to quit, or use -fork to make it run in the backgroud)
./bedrock -fork
