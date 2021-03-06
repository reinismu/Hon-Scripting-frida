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

### Running

* `npm install`
* `sudo ./inject.sh <pid>`
* `sudo npm run frida-watch` <-- auto hot reload

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
* DONE Orbwalking
    * DONE AttackSpeed
    * DONE AttackRange
    * DONE OnGameEntityCreate
    *
* DONE Improve dev
* DONE prediction math
    * DONE Hero Velocity
    * DONE Vector prediction
* KINDA DONE isMoving
* DONE Empath in hero issues
* DONE Extract stoppable spell logic 
* DONE IsStunned/Silenced etc..
* nullstone
* Andromeda
    * Ult -> pk back logic
    * illusion control
* I my own hero
* Improve nitro farm
* draw circle
* Auto pick champ

## Top tier Heroes

* DONE Nitro
* DONE Thunderbringer
* DONE Devo if can improve prediction? 
* Soulstealer
* Oogie
* Artesia
* Paralex (2x combo)
* Armadon
* Pebbles
* Deadlift
* Gauntlet - super grabs
* Maliken maybe with good orbwalker