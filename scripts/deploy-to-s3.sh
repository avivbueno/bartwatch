#!/bin/bash

# ============================  Script Variables   ============================
DEPLOY_BUCKET="bart.gariany.com"
PUBLIC_FOLDER="../dist"
PUBLIC_URL="http://bart.gariany.com"
# =============================================================================

timestampString() {
  date +"%Y-%m-%d %T"
}

log() {
  echo "$(timestampString): $1"
}

# =============================================================================

log "================================================================================"
log "BART Watch - Deploy!"
log "================================================================================"

aws s3 sync $PUBLIC_FOLDER s3://$DEPLOY_BUCKET

log "================================================================================"
log ">> Done!"
log "================================================================================"
log ""
log ">> Check out: $PUBLIC_URL"
log ""
