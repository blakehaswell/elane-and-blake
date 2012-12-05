My fiance and I are getting married, so I'm building us a wedding website.

Installation
============

I'm hosting this on EC2, so the setup looks like this:

Install Git

    sudo apt-get install git

Install and configure apache (vhosts, permissions, etc?)

    sudo apt-get install apache2

Edit your Apache config

    sudo nano /etc/apache2/apache2.conf

Ensure the following config:

    Include conf/extra/httpd-vhosts.conf
    
    # Ensure that Apache listens on port 80
    Listen 80
    
    # All requests are virtual host requests (security? best practice?)
    NameVirtualHost *:*

Enable proxy modules

    sudo apt-get install libapache2-mod-proxy-html
    
    sudo a2enmod proxy
    sudo a2enmod proxy_http

Add a vhost entry for the site

    cd /etc/apache2/sites-available
    sudo touch elaneandblake.com
    sudo nano elaneandblake.com

Add the following:

    <VirtualHost *>
        DocumentRoot /var/www/elaneandblake.com
        
        ServerName elaneandblake.com
        ServerAlias www.elaneandblake.com
        
        ErrorLog "/var/log/apache2/elaneandblake.com/error_log"
        CustomLog "/var/log/apache2/elaneandblake.com/access_log" common
        
        # Forward requests to the Node app.
        ProxyPass / http://127.0.0.1:3000/
        ProxyPassReverse / http://127.0.0.1:3000/
    </VirtualHost>

Create a symlink to sites-enabled

    a2ensite elaneandblake.com

Create log files

Restart Apache

    sudo /etc/init.d/apache2 restart



    sudo apt-get install build-essential

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
    sudo git clone git://github.com/blakehaswell/elane-and-blake.git elaneandblake.com

Install dependencies

    cd elaneandblake.com
    sudo npm install

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