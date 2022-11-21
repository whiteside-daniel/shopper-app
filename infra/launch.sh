#!/bin/bash

sudo apt update -y
sudo apt-get install -y nfs-utils
sudo systemctl restart nfs-utils
sudo systemctl status nfs-utils

sudo mkdir -p /mnt/nfs_vagrant
sudo mount -v -t nfs -o port=4747 64.109.199.107:/nfs_shared /mnt/nfs_vagrant
nfsstat -m
