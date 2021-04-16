#!/bin/sh

set -eux

az ad sp create-for-rbac -n "Functions"
