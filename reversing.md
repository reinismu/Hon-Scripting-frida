## Useful info

https://stackoverflow.com/questions/70682/what-is-the-vtable-layout-and-vtable-pointer-location-in-c-objects-in-gcc-3-x

## Debugging

* `IDA 7.2/dbgsrv` run `sudo ./linux_server64`

## Compiler
`objdump -s --section .comment libgame_shared-x86_64.so`

Contents of section .comment:
 0000 4743433a 2028474e 55292034 2e392e32  GCC: (GNU) 4.9.2
 0010 00636c61 6e672076 65727369 6f6e2033  .clang version 3
 0020 2e362e30 20287461 67732f52 454c4541  .6.0 (tags/RELEA
 0030 53455f33 36302f66 696e616c 2900      SE_360/final).  

### Structure 
```
struct __cppobj __attribute__((aligned(8))) className : parentClassName
{
    vtbl * __vftable;
    ...members
}
```

## Class sizes

* CGameEntity -> 0xA0
* CGameEntity_Prop_Water -> 0xA0
* IVisualEntity -> 0x298
* CPlayer -> 0x7A8
* IUnitEntity -> 0x1518
* IHeroEntity -> 0x15A8
* ICreepEntity -> 0x1520
* IBuildingEntity -> 0x15B8