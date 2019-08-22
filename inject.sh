echo "Make sure frida-cli is installed!":
echo "Injecting into hon":
sudo frida -p 6505 -l dist/script.js --enable-jit
