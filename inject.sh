echo "Make sure frida-cli is installed!":
echo "Injecting into hon":
sudo frida -p 26496 -l dist/script.js --enable-jit
