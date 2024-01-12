#!/bin/sh

ls -d -1tr /home/ec2-user/temple_uploaded/temple_uploaded_images/* | head -n -15 | xargs -d '\n' rm -f