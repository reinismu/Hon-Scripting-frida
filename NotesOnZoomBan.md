```
Access my zoom: libgame_shared-x86_64.so + 0xca1acf
Access my zoom: libgame_shared-x86_64.so + 0xca1bcc
Access my zoom: libgame_shared-x86_64.so + 0xca08b4
Access my zoom: libgame_shared-x86_64.so + 0xca08cc
Access my zoom: libgame_shared-x86_64.so + 0xca1cf1
Access my zoom: libgame_shared-x86_64.so + 0xca1d25
Access my zoom: libgame_shared-x86_64.so + 0xca1d6a
Access my zoom: libgame_shared-x86_64.so + 0xca1c6d
Access my zoom: libgame_shared-x86_64.so + 0xca1db1
Access my zoom: libgame_shared-x86_64.so + 0xca1de5
Access my zoom: libgame_shared-x86_64.so + 0xca1e2a // <---- next zoom global!! but notthing fun
```


```
Access client state zoom: libgame_shared-x86_64.so + 0xca049a
Access client state zoom: libgame_shared-x86_64.so + 0xca1a1c
Access client state zoom: libgame_shared-x86_64.so + 0xf93d20
Access client state zoom: libgame_shared-x86_64.so + 0xc9fc00
```


// in game results


```
Access client state zoom: libgame_shared-x86_64.so + 0xca049a // Seems to put player state into client state
Access client state zoom: libgame_shared-x86_64.so + 0xca1a1c  // Seems to put player state into client state
Access client state zoom: libgame_shared-x86_64.so + 0xf93d20 // CLientState MErge
Access client state zoom: libgame_shared-x86_64.so + 0xc9fc00 // TODO investigate further
Access client state zoom: cgame-x86_64.so + 0x1c1071 // CHecked This just takes value and puts it back
Access client state zoom: cgame-x86_64.so + 0x1c1093 // CHecked
Access client state zoom: cgame-x86_64.so + 0x1c1394 // CHecked This just takes value and puts it back
Access client state zoom: cgame-x86_64.so + 0x1c13c7 // CHecked
```


```
Access my zoom: libgame_shared-x86_64.so + 0xc9fb9f // Responsible for blacking out the screen if too far out. Checking my zoom and changing flag
Access my zoom: libgame_shared-x86_64.so + 0xca02d7 // Responsible for camera flip
Access my zoom: libgame_shared-x86_64.so + 0xca1abf // Responsible for camera zoom animation to next step
Access my zoom: libgame_shared-x86_64.so + 0xca1bc4 // Responsible for camera zoom animation to next step
Access my zoom: libgame_shared-x86_64.so + 0xca08d5 // About stoping zooming beyond. Calls a virt func. Could hceck more
Access my zoom: libgame_shared-x86_64.so + 0xca08ea // About stoping zooming beyond. Calls a virt func. Could hceck more
Access my zoom: libgame_shared-x86_64.so + 0xca0f66 // Around moving to Client State
Access my zoom: libgame_shared-x86_64.so + 0xca14b8 // Adjust something and save it. 3 floats. Maybe by checking those floats can get info
Access my zoom: libgame_shared-x86_64.so + 0xca1ce9 // ZoomIn
Access my zoom: libgame_shared-x86_64.so + 0xca1c71 // CHeck game ticks and update zoom
Access my zoom: libgame_shared-x86_64.so + 0xca1da9 // ZoomOut
```