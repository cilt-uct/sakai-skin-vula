#! /bin/bash

USER_CFG="/usr/local/serverconfig/users.cfg"
CURRENT_USER=$(logname)

# Get the display name of the user
# params:
# $1 -- the section (if any)
# $2 -- the key
getCurrentUser() {

  section=$1
  key=$2

  value=$(
    if [ -n "$section" ]; then
      sed -n "/^\[$section\]/, /^\[/p" $USER_CFG
    else
      cat $USER_CFG
    fi |

    egrep "^ *\b$key\b *=" |

    head -1 | cut -f2 -d'=' |
    sed 's/^[ "'']*//g' |
    sed 's/[ ",'']*$//g' )

  if [ -n "$value" ]; then
    echo $value
    return
  else
    echo 'NA'
    return
  fi
}

branch_name=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
user="$(getCurrentUser 'git' $CURRENT_USER)"
user_default="$(getCurrentUser 'default' '0')"

# echo $user
# echo $user_default

if [[ "$user" != "NA" ]]; then
    user_name=$(echo "${user%<*}" | awk '{$1=$1};1')
    user_email=${user##*<}
    user_email=${user_email//>/}
else
    user_name=$(echo "${user_default%<*}" | awk '{$1=$1};1')
    user_email=${user_default##*<}
    user_email=${user_email//>/}
fi

read -p "[$branch_name] for $user_name - commit: " msg
read -p "Push [Y/n]: " yn
yn=${yn:-'Y'}

git config user.name "$user_name"
git config user.email "$user_email"    
# git config --list | grep user
git commit --author="$user" -m "$msg"

case $yn in
    [Yy]* ) bash push.sh;;
esac

