My fiance and I are getting married, so I'm building us a wedding website.

Installation
============

I'm hosting this on EC2, so the setup looks like this:

Install Git

    apt-get install git

Install and configure apache (vhosts, permissions, etc?)

Install Node

    cd ~
    git clone git://github.com/joyent/node.git
    cd node
    git checkout v0.8.15
    ./configure
    make
    sudo make install

Install NPM

    cd ~
    git clone https://github.com/isaacs/npm.git
    cd npm
    sudo make install

Clone repo

    cd /var/www
    git clone git://github.com/blakehaswell/elane-and-blake.git elaneandblake.com

Install dependencies

    cd elaneandblake.com
    npm install

Install Forever

    sudo npm install -g forever

Start the app using Forever

    forever start app.js

Install questions
-----------------

*   Where should I be installing Node and NPM? **It doesn't matter, make installs the compiled programs elsewhere**
*   What is make? Do I need to install it? **make is like rake, just for C (I think)**
*   When installing Node, what do the lines `./configure` and `make` do? **`./configure` builds the makefile**
*   What's the deal with port forwarding? Best practice? Security? **Use Apache in front of Node**
*   Running the app – do I use forever? Is `node app` ok? **Forever seems to be the go. `sudo npm install -g forever`**

Update Instructions
===================

Log into EC2 and:

    cd /var/www/elaneandblake.com
    git pull
    forever restart app.js