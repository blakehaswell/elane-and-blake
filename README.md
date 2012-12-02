My fiance and I are getting married, so I'm building us a wedding website.

Installation
============

I'm hosting this on EC2, so the setup looks like this:

Install Git

    apt-get install git

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

Setup port forwarding

    iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 3000

Clone repo

    cd /var/sites
    git clone xxx@xxxxxxxx.xxxx.xxx

Install dependencies

    cd elane-and-blake
    npm install

Start the app (maybe using Forever?)

    node app

Install questions
-----------------

*   Where should I be installing Node and NPM?
*   What is make? Do I need to install it?
*   When installing Node, what do the lines `./configure` and `make` do?
*   What's the deal with port forwarding? Best practice? Security?
*   Running the app – do I use forever? Is `node app` ok?