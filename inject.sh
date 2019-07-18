echo "Make sure frida-cli is installed!":
echo "Injecting into hon":
sudo frida -p 25611 -l dist/script.js --enable-jit
