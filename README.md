My fiance and I are getting married, so I'm building us a wedding website.

Installation
============

I'm hosting this on EC2, so the setup looks like this:

Install Git

    apt-get install git

Install and configure apache (vhosts, permissions, etc?)

    sudo apt-get install apache2

Edit your Apache config

    nano /etc/apache2/apache2.conf

Ensure the following config:

    Include conf/extra/httpd-vhosts.conf
    
    # Ensure that Apache listens on port 80
    Listen 80
    
    # All requests are virtual host requests (security? best practice?)
    NameVirtualHost *:*

Add a vhost entry for the site

    cd /etc/apache2/sites-available
    touch elaneandblake.com
    nano elaneandblake.com

    <VirtualHost *>
        DocumentRoot /var/www/elaneandblake.com
        
        ServerName elaneandblake.com
        ServerAlias www.elaneandblake.com
        
        ErrorLog "logs/elaneandblake.com/error_log"
        CustomLog "logs/elaneandblake.com/access_log" common
    </VirtualHost>

Create a symlink to sites-enabled

    ln -s /etc/apache2/sites-available/elaneandblake.com /etc/apache2/sites-enabled/elaneandblake.com

Restart Apache

    sudo /etc/init.d/apache2 restart

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

    sudo npm install forever -g

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