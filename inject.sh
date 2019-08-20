echo "Make sure frida-cli is installed!":
echo "Injecting into hon":
sudo frida -p 23176 -l dist/script.js --enable-jit
