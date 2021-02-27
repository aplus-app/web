if [[ $* == *-w* ]]
then
  npx windicss './public/*.html' -mto public/styles.css
  npx rollup -c -w
else
  npx windicss './public/*.html' -mto public/styles.css
  npx rollup -c --environment NODE_ENV:production
fi