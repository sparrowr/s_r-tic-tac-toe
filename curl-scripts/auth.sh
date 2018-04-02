# sh curl-scripts/json/sign-up.sh

# don't use a password you use for any real websites! this is a toy application

# first account (in script): email nobody@srubin.com, pw n
# second account (on page): email coffee@srubin.com, pw c

curl "http://tic-tac-toe.wdibos.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email":"coffee@srubin.org",
      "password":"c"
    }
  }'

echo
