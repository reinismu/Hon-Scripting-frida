
class CObj {
  public ptr: NativePointer;

  constructor(ptr: NativePointer) {
    this.ptr = ptr;
  }

  protected align(amount: number): NativePointer {
    return this.ptr.add(amount);
  }

  public toJSON(): string {
    let obj = Object.assign(this);
    let keys = Object.keys(this.constructor.prototype);
    obj.toJSON = undefined;
    return JSON.stringify(obj, keys);
  }
}


class Elf64_Sym extends CObj {

	get st_name(): number {
		return this.align(0x0).readU32();
	}

	get st_info(): number {
		return this.align(0x4).readU8();
	}

	get st_other(): number {
		return this.align(0x5).readU8();
	}

	get st_shndx(): number {
		return this.align(0x6).readU16();
	}

	get st_value(): UInt64 {
		return this.align(0x8).readU64();
	}

	get st_size(): UInt64 {
		return this.align(0x10).readU64();
	}

}

class Elf64_Rela extends CObj {

	get r_offset(): UInt64 {
		return this.align(0x0).readU64();
	}

	get r_info(): UInt64 {
		return this.align(0x8).readU64();
	}

	get r_addend(): Int64 {
		return this.align(0x10).readS64();
	}

}

class Elf64_Dyn extends CObj {

	get d_tag(): UInt64 {
		return this.align(0x0).readU64();
	}

	get d_un(): UInt64 {
		return this.align(0x8).readU64();
	}

}

class Elf64_Verneed extends CObj {

	get vn_version(): number {
		return this.align(0x0).readU16();
	}

	get vn_cnt(): number {
		return this.align(0x2).readU16();
	}

	get vn_file(): number {
		return this.align(0x4).readU32();
	}

	get vn_aux(): number {
		return this.align(0x8).readU32();
	}

	get vn_next(): number {
		return this.align(0xc).readU32();
	}

}

class Elf64_Vernaux extends CObj {

	get vna_hash(): number {
		return this.align(0x0).readU32();
	}

	get vna_flags(): number {
		return this.align(0x4).readU16();
	}

	get vna_other(): number {
		return this.align(0x6).readU16();
	}

	get vna_name(): number {
		return this.align(0x8).readU32();
	}

	get vna_next(): number {
		return this.align(0xc).readU32();
	}

}

class type_info extends CObj {

	get vfptr(): NativePointer {
		return this.align(0x0).readPointer();
	}

}

class CPlayer extends CObj {

	get field_0(): number {
		return this.align(0x0).readU32();
	}

	get field_9C(): number {
		return this.align(0x9c).readU16();
	}

	get field_A0(): number {
		return this.align(0xa0).readU16();
	}

	get field_A4(): number {
		return this.align(0xa4).readU16();
	}

	get field_A9(): UInt64 {
		return this.align(0xa9).readU64();
	}

	get field_B4(): UInt64 {
		return this.align(0xb4).readU64();
	}

	get field_BC(): number {
		return this.align(0xbc).readS32();
	}

	get field_C8(): number {
		return this.align(0xc8).readS32();
	}

	get field_CC(): number {
		return this.align(0xcc).readS32();
	}

	get field_10C(): number {
		return this.align(0x10c).readS8();
	}

	get currentCameraZoom(): number {
		return this.align(0x128).readFloat();
	}

	get nextCameraZoom(): number {
		return this.align(0x130).readFloat();
	}

	get endScroll(): number {
		return this.align(0x2b8).readS8();
	}

	get field_2D0(): number {
		return this.align(0x2d0).readU16();
	}

	get field_2D4(): number {
		return this.align(0x2d4).readU16();
	}

	get field_2D8(): UInt64 {
		return this.align(0x2d8).readU64();
	}

	get field_2E4(): number {
		return this.align(0x2e4).readFloat();
	}

	get field_308(): UInt64 {
		return this.align(0x308).readU64();
	}

	get field_310(): Int64 {
		return this.align(0x310).readS64();
	}

	get field_318(): UInt64 {
		return this.align(0x318).readU64();
	}

	get field_324(): number {
		return this.align(0x324).readS32();
	}

	get field_328(): number {
		return this.align(0x328).readU16();
	}

	get field_32C(): number {
		return this.align(0x32c).readU16();
	}

	get field_330(): number {
		return this.align(0x330).readU16();
	}

	get field_334(): number {
		return this.align(0x334).readU16();
	}

	get field_338(): number {
		return this.align(0x338).readU16();
	}

	get field_33C(): number {
		return this.align(0x33c).readU16();
	}

	get field_344(): number {
		return this.align(0x344).readDouble();
	}

	get field_34C(): number {
		return this.align(0x34c).readDouble();
	}

	get field_354(): number {
		return this.align(0x354).readFloat();
	}

	get field_358(): UInt64 {
		return this.align(0x358).readU64();
	}

	get field_39C(): number {
		return this.align(0x39c).readDouble();
	}

	get field_3A4(): number {
		return this.align(0x3a4).readDouble();
	}

	get field_3AC(): number {
		return this.align(0x3ac).readDouble();
	}

	get field_3C4(): number {
		return this.align(0x3c4).readU16();
	}

	get field_3CC(): number {
		return this.align(0x3cc).readS8();
	}

	get field_3CE(): UInt64 {
		return this.align(0x3ce).readU64();
	}

	get field_3DC(): number {
		return this.align(0x3dc).readS32();
	}

	get field_3E8(): UInt64 {
		return this.align(0x3e8).readU64();
	}

	get field_3F4(): UInt64 {
		return this.align(0x3f4).readU64();
	}

	get field_400(): UInt64 {
		return this.align(0x400).readU64();
	}

	get field_414(): number {
		return this.align(0x414).readS32();
	}

	get field_418(): number {
		return this.align(0x418).readS32();
	}

	get field_41C(): number {
		return this.align(0x41c).readS8();
	}

	get field_420(): number {
		return this.align(0x420).readS32();
	}

	get field_424(): number {
		return this.align(0x424).readU32();
	}

	get field_428(): number {
		return this.align(0x428).readU32();
	}

	get field_430(): number {
		return this.align(0x430).readU16();
	}

	get field_438(): number {
		return this.align(0x438).readU16();
	}

	get field_43C(): number {
		return this.align(0x43c).readS32();
	}

	get field_490(): UInt64 {
		return this.align(0x490).readU64();
	}

	get field_498(): number {
		return this.align(0x498).readS32();
	}

	get field_4D8(): number {
		return this.align(0x4d8).readS32();
	}

	get field_4E8(): number {
		return this.align(0x4e8).readS32();
	}

	get field_502(): UInt64 {
		return this.align(0x502).readU64();
	}

	get field_540(): number {
		return this.align(0x540).readFloat();
	}

	get field_544(): number {
		return this.align(0x544).readS32();
	}

	get field_548(): UInt64 {
		return this.align(0x548).readU64();
	}

	get field_550(): number {
		return this.align(0x550).readS32();
	}

	get field_608(): Int64 {
		return this.align(0x608).readS64();
	}

	get field_610(): UInt64 {
		return this.align(0x610).readU64();
	}

	get field_618(): UInt64 {
		return this.align(0x618).readU64();
	}

	get field_620(): UInt64 {
		return this.align(0x620).readU64();
	}

	get field_628(): number {
		return this.align(0x628).readS8();
	}

	get field_62C(): number {
		return this.align(0x62c).readS32();
	}

	get field_640(): number {
		return this.align(0x640).readU16();
	}

	get field_648(): number {
		return this.align(0x648).readS8();
	}

	get field_64B(): number {
		return this.align(0x64b).readS8();
	}

	get field_680(): number {
		return this.align(0x680).readS32();
	}

	get field_684(): number {
		return this.align(0x684).readS32();
	}

	get field_6BC(): number {
		return this.align(0x6bc).readU32();
	}

	get field_6E0(): Int64 {
		return this.align(0x6e0).readS64();
	}

	get field_6E8(): UInt64 {
		return this.align(0x6e8).readU64();
	}

	get field_6F0(): Int64 {
		return this.align(0x6f0).readS64();
	}

	get field_6F8(): Int64 {
		return this.align(0x6f8).readS64();
	}

	get field_700(): UInt64 {
		return this.align(0x700).readU64();
	}

	get field_708(): Int64 {
		return this.align(0x708).readS64();
	}

	get field_710(): Int64 {
		return this.align(0x710).readS64();
	}

	get field_718(): UInt64 {
		return this.align(0x718).readU64();
	}

	get field_720(): Int64 {
		return this.align(0x720).readS64();
	}

	get field_728(): Int64 {
		return this.align(0x728).readS64();
	}

	get field_730(): Int64 {
		return this.align(0x730).readS64();
	}

	get field_738(): Int64 {
		return this.align(0x738).readS64();
	}

	get field_74C(): Int64 {
		return this.align(0x74c).readS64();
	}

	get field_778(): Int64 {
		return this.align(0x778).readS64();
	}

	get field_780(): Int64 {
		return this.align(0x780).readS64();
	}

	get field_788(): UInt64 {
		return this.align(0x788).readU64();
	}

}

class CVec3 extends CObj {

	get x(): number {
		return this.align(0x0).readFloat();
	}

	get y(): number {
		return this.align(0x4).readFloat();
	}

	get z(): number {
		return this.align(0x8).readFloat();
	}

}

class CGameEvent extends CObj {

	get field_0(): number {
		return this.align(0x0).readS8();
	}

	get field_4(): number {
		return this.align(0x4).readS32();
	}

	get flags(): number {
		return this.align(0x8).readS16();
	}

	get expire(): number {
		return this.align(0xc).readU32();
	}

	get field_10(): number {
		return this.align(0x10).readS16();
	}

	get sourceEntity(): number {
		return this.align(0x14).readU32();
	}

	get position(): CVec3 {
		return new CVec3(this.align(0x18));
	}

	get field_28(): Int64 {
		return this.align(0x28).readS64();
	}

	get field_38(): number {
		return this.align(0x38).readS32();
	}

	get effect(): number {
		return this.align(0x3c).readFloat();
	}

	get effectScale(): number {
		return this.align(0x40).readFloat();
	}

	get targetEntity(): number {
		return this.align(0x44).readU16();
	}

	get targetPosition(): Int64 {
		return this.align(0x48).readS64();
	}

	get field_58(): Int64 {
		return this.align(0x58).readS64();
	}

	get targetAngles(): UInt64 {
		return this.align(0x60).readU64();
	}

	get field_68(): number {
		return this.align(0x68).readS32();
	}

	get effect2(): number {
		return this.align(0x6c).readFloat();
	}

	get effectScale2(): number {
		return this.align(0x70).readFloat();
	}

	get field_74(): number {
		return this.align(0x74).readU32();
	}

	get field_78(): number {
		return this.align(0x78).readS8();
	}

	get field_7C(): number {
		return this.align(0x7c).readS32();
	}

	get field_80(): Int64 {
		return this.align(0x80).readS64();
	}

	get field_88(): number {
		return this.align(0x88).readS16();
	}

	get field_8A(): number {
		return this.align(0x8a).readS8();
	}

}

class __va_list_tag extends CObj {

	get gp_offset(): number {
		return this.align(0x0).readU32();
	}

	get fp_offset(): number {
		return this.align(0x4).readU32();
	}

	get overflow_arg_area(): NativePointer {
		return this.align(0x8).readPointer();
	}

	get reg_save_area(): NativePointer {
		return this.align(0x10).readPointer();
	}

}

class _PMD extends CObj {

	get mdisp(): number {
		return this.align(0x0).readS32();
	}

	get pdisp(): number {
		return this.align(0x4).readS32();
	}

	get vdisp(): number {
		return this.align(0x8).readS32();
	}

}

class _RTTIClassHierarchyDescriptor extends CObj {

	get signature(): number {
		return this.align(0x0).readS32();
	}

	get attributes(): number {
		return this.align(0x4).readS32();
	}

	get numBaseClasses(): number {
		return this.align(0x8).readS32();
	}

	get baseClassArray(): number {
		return this.align(0xc).readS32();
	}

}

class _RTTIBaseClassDescriptor extends CObj {

	get typeDescriptor(): number {
		return this.align(0x0).readS32();
	}

	get numContainedBases(): number {
		return this.align(0x4).readS32();
	}

	get pmd(): _PMD {
		return new _PMD(this.align(0x8));
	}

	get attributes(): number {
		return this.align(0x14).readS32();
	}

}

class _RTTICompleteObjectLocator extends CObj {

	get signature(): number {
		return this.align(0x0).readS32();
	}

	get offset(): number {
		return this.align(0x4).readS32();
	}

	get cdOffset(): number {
		return this.align(0x8).readS32();
	}

	get typeDescriptor(): number {
		return this.align(0xc).readS32();
	}

	get classDescriptor(): number {
		return this.align(0x10).readS32();
	}

	get objectBase(): number {
		return this.align(0x14).readS32();
	}

}

