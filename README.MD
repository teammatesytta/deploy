# inisiasi project

```
mkdir my-express-app && cd my-express-app
npm init -y
npm install express
```

## tambah ke package.json
```
"scripts": {
  "start": "node index.js"
}
```
<hr>
<br>

## Launch the EC2 instance 


AWS Console → EC2 → Launch instance <br>
Ubuntu 22.04 (simplest for this guide) <br>
Instance type: t2.micro (free tier fine for testing) <br>
Key pair: create/download a .pem file — you need this to SSH in  Security group: allow inbound<br>
SSH (22) — restrict to your IP, not 0.0.0.0/0<br>
HTTP (80) — 0.0.0.0/0<br>
Custom TCP (3000) in all wizard available<br>
<br>
Careful: leaving port 22 open to the world is one of the most common EC2 security mistakes. Lock it to your IP.
<br><br>
<hr>

## to check available running project
```curl http://localhost:3000```


## Set up the server (SSH in first)
start with .pem file:
```chmod 400 deploy.pem```

to check available:
```
pm2 list
pm2 logs <my-app>
```

command:
```ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>```
in this project
```ssh -i deploy.pem ec2-user@52.77.213.65```

### then
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs git
sudo npm install -g pm2
```

### then 
```
git clone https://github.com/yourname/my-express-app.git
cd my-express-app 
npm install
pm2 start index.js --name my-app
pm2 save
pm2 startup   # run the command it prints, so the app survives reboots
```

Test: http://<EC2_PUBLIC_IP>:3000
in this case ```http://52.77.213.65:3000```

## set GitHub auto-deploy
.github/workflows/deploy.yml
File to create: .github/workflows/deploy.yml in your repo:

#belum setup nginx from hide :3000