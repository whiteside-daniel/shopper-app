# Instructions

### :tw-1f449: **_This will install extra packages on your Mac - just FYI_**

Run setup script via command line: `./setup.sh`

------------


#### Notes:
- All vagrant commands must run from inside this directory (`infra/`) on your Mac
- All files & folders added to this directory on your Mac will be available at the `/vagrant` directory inside the VM

#### Try:
- Copy the large files to this directory on your Mac
- Run `vagrant ssh` to SSH into the VM (No keys or passwords)
  - Copy the large files from `/vagrant` to `/mnt/nfs_vagrant`
- Now these files are available in the NFS mount point!
- Run `vagrant halt` to stop the VM (Still there, just stopped)
