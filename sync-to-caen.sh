#!/usr/bin/env sh
rsync -ahLPvvz --delete-after --no-whole-file --info=progress2 \
--include='**.gitignore' --exclude='.git' --filter=':- .gitignore' \
'.' \
itd:'~/Public/html/493'
