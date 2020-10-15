#!/usr/bin/env bash

SHOULD_LINT=$1
shift
SOURCES=$@
DESTINATIONS=""
DELIMITER=""
FIRST=1

set -e

echo "Ficheros: "$SOURCES

for src in $SOURCES; do
  if [ "${FIRST}" -eq "1" ]; then
    DELIMITER=""
    FIRST=0
  else
    DELIMITER=","
  fi
  DESTINATIONS="$DESTINATIONS$DELIMITER${src}"
done

if [ "${SHOULD_LINT}" -eq "1" ]; then
  tslint --fix -c tslint.json -p tsconfig.json $SOURCES;
fi

if [ "${SHOULD_LINT}" -eq "2" ]; then
  stylelint --syntax scss --fix $SOURCES;
fi

exit;
