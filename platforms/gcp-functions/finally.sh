#!/bin/sh

set -eu

sleep 30

func="$(cat func-tmp.txt)"

gcloud functions logs read "$func"
gcloud functions delete "$func" --quiet
