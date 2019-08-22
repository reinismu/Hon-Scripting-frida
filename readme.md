# Hon-frida
Tool to easily interact with game

## Setup

### Ida function names (Used for better stacktrace logging)
* Get **IDA BinExport** (https://github.com/google/binexport)
* Export needed files based on **idaExpoertGetNeeded.ts** file
* run `npm run export-funcs`

### Ida structures to classes
* Export header file in IDA `File -> Produce file -> Create C header file`
* Edit ***scripts/header-parse.py* to use the new file
* Requires `Clang` and `Python`
* Run `npm run generate-ida-structs`


## Version update

### Symbol migration

#### Pre steps
* Check if libs were actually updated `md5sum cgame-x86_64.so`
* If not then copy over ida databases

#### Migration
* alternative https://www.zynamics.com/bindiff.html
* Use https://github.com/joxeankoret/diaphora
* Tips https://github.com/joxeankoret/diaphora/blob/master/doc/diaphora_help.pdf
* Could change haxrays max function size to lower than 256

## Useful links

* https://hon.gamepedia.com/Bot_API

## TODO/BUGS

* DONE get spell ranges
* DONE get hero facing direction
* DONE Focus easiest kill in range
* DONE Magic immunity checks
* DONE Anti illusion logic 
* DONE Accursed ult ignore
* DONE Item usage!
* Orbwalking
* draw circle
* isMoving
* prediction math

## Top tier Heroes

* Nitro
* Thunderbringer
* Soulstealer
* Oogie
* Artesia
* Paralex (2x combo)
* Armadon
* Pebbles
* Deadlift
* Devo if can improve prediction? 
* Gauntlet - super grabs
* Maliken maybe with good orbwalker