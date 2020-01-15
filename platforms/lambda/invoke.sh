#!/bin.sh

set -eu

aws lambda invoke --function-name p2-lambda --payload "" response.json
