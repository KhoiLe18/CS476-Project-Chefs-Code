# How to serve the Chef's Code website using Nginx as a webserver on an Ubuntu machine
## Get the repository
1. ``cd /var/www/html``
2. ``sudo git clone https://github.com/KhoiLe18/CS476-Project-Chefs-Code.git``
3. ``sudo chmod -R 755 /var/www/html/CS476-Project-Chefs-Code``
4. ``sudo chown -R $USER:$USER /var/www/html/CS476-Project-Chefs-Code``

## Install NGINX
1. ``sudo apt install nginx``
2. Move the nginx config file (chefs-code) to /etc/nginx/sites-available
3. Comment out everything in the `default` file in /etc/nginx/sites-available
4. ``sudo ln -s /etc/nginx/sites-available/chefs-code /etc/nginx/sites-enabled/``
5. ``sudo nginx -t``
6. ``sudo systemctl restart nginx``

## Run the website
1. ``cd /var/www/html/CS476-Project-Chefs-Code/website/backend``
2. ``npm install mariadb``
3. ``cd /var/www/html/CS476-Project-Chefs-Code/website/backend/controller``
4. ``npm install``
5. ``npm start``

## Result
- The website should be accessible on port 80 via nginx or directly via port 4000
- You should see something like this in the console
<p>
<code>[nodemon] 3.1.9<br>
[nodemon] to restart at any time, enter `rs`<br>
[nodemon] watching path(s): *.*<br>
[nodemon] watching extensions: js,mjs,cjs,json<br>
[nodemon] starting `node index.js`<br>
listening at port 4000</code>
</p>