#!/bin/bash
set +x

# Environment variable validation
VALIDATION_ERRORS=""
if ! command -v node &>/dev/null; then
    VALIDATION_ERRORS="Must have node.js installed.\n${VALIDATION_ERRORS}"
fi
if ! command -v npm &>/dev/null; then
    VALIDATION_ERRORS="Must have npm installed.\n${VALIDATION_ERRORS}"
fi
if ! command -v npx &>/dev/null; then
    VALIDATION_ERRORS="Must have npx installed.\n${VALIDATION_ERRORS}"
fi
if ! command -v curl &>/dev/null; then
    VALIDATION_ERRORS="Must have curl installed.\n${VALIDATION_ERRORS}"
fi
if ! command -v jq &>/dev/null; then
    VALIDATION_ERRORS="Must have jq installed.\n${VALIDATION_ERRORS}"
fi

[ -z "$SHOPEE_USERNAME" ] && VALIDATION_ERRORS="Must set SHOPEE_USERNAME environment variable. Example: 'export SHOPEE_USERNAME=\"johnsmith\"'\n${VALIDATION_ERRORS}"
[ -z "$SHOPEE_PASSWORD" ] && VALIDATION_ERRORS="Must set SHOPEE_PASSWORD environment variable. Example: 'export SHOPEE_PASSWORD=\"PaSSw0rd\"'\n${VALIDATION_ERRORS}"
[ -z "$SHOPEE_LISTING" ] && VALIDATION_ERRORS="Must set SHOPEE_LISTING environment variable. Example: 'export SHOPEE_LISTING=\"https://shopee.ph/product\"'\n${VALIDATION_ERRORS}"
[ ! -f shopee.js ] && VALIDATION_ERRORS="Script 'shopee.js' not found\n${VALIDATION_ERRORS}"

if [ -n "$VALIDATION_ERRORS" ]; then
    echo "VALIDATION ERRORS:"
    echo -e "$VALIDATION_ERRORS"
    exit 1      # exit with error because we didn't pass the validation checks above
fi

# If all validation passes, run the shopee javascript
node shopee.js