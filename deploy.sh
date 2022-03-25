#!/usr/bin/env sh

set -e

npm run build

cd dist/hackthon_platform_assets

# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:daocore/daocore.github.io.git master:gh-pages

cd -