#!/bin/bash
echo -n 'Do you want to see a random number [Y/n]: '
read -r answer
answer="${answer:-Y}"
if [[ "$answer" =~ [Yy] ]]; then
   echo How about $RANDOM?
else
   echo 'Ok, fine.'
   exit
fi