echo "Make sure frida-cli is installed!":
echo "Injecting into hon":
sudo frida -p $1 -l dist/script.js --runtime=v8
