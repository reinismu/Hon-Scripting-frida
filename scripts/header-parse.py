from tempfile import NamedTemporaryFile

from clang.cindex import Index, CursorKind


class ClassCreator:
    def __init__(self, cursor):
        self.cursor = cursor
        self.constants = []
        self.classString = ""
        self.typeDictionary = {
            "unsigned long long": {"return": "UInt64", "read": "readU64"},
            "unsigned int": {"return": "number", "read": "readU32"},
            "unsigned short": {"return": "number", "read": "readU16"},
            "unsigned char": {"return": "number", "read": "readU8"},

            "uint64": {"return": "UInt64", "read": "readU64"},
            "uint32": {"return": "number", "read": "readU32"},
            "uint32": {"return": "number", "read": "readU16"},
            "uint8": {"return": "number", "read": "readU8"},

            "long long": {"return": "Int64", "read": "readS64"},
            "int": {"return": "number", "read": "readS32"},
            "short": {"return": "number", "read": "readS16"},
            "char": {"return": "number", "read": "readS8"},
            "void *": {"return": "NativePointer", "read": "readPointer"},

            "float": {"return": "number", "read": "readFloat"},
            "double": {"return": "number", "read": "readDouble"},
        }

    def generateClass(self):
        c = self.cursor
        class_string = ""
        if c.type.get_size() <= 0:
            return ""
        classType = self.cursor.type.spelling.replace("struct ", "")
        class_string += f"class {classType} extends CObj " + "{\n\n"
        for f in c.type.get_fields():
            # Ignore arrays and gaps
            if "[" in f.type.spelling or "gap" in f.spelling:
                continue
            offset = int(c.type.get_offset(f.spelling)/8)
            if "struct" in f.type.spelling:
                struct = f.type.spelling.replace("struct ", "")
                class_string += f"\tget {f.spelling}(): {struct} " + "{\n"
                class_string += f"\t\treturn new {struct}(this.align({hex(offset)}));\n"
                class_string += "\t}\n\n"
                continue
            if f.type.spelling not in self.typeDictionary:
                continue
            t = self.typeDictionary[f.type.spelling]
            returnName = t["return"]
            readName = t["read"]
            class_string += f"\tget {f.spelling}(): {returnName} " + "{\n"
            class_string += f"\t\treturn this.align({hex(offset)}).{readName}();\n"
            class_string += "\t}\n\n"

        class_string += "}\n"
        return class_string

    # def getReturnType(self, type):

    def printEnum(self):
        print("enum class %s\r\n{" % self.className)
        for con in self.constants:
            print("\t%s = 0x%08x;\r\n" % (con.name, con.offset))
        print("}")


# tu = index.parse(None, "/home/detuks/ida/IDA 7.2/plugins/defs.h")
filenames = ['/home/detuks/ida/IDA 7.2/plugins/defs.h',
             '/home/detuks/Projects/hon/binaries/4.7.7.DUNNO/libgame_shared-x86_64.so.h']
# filenames = ['/home/detuks/Projects/hon/binaries/4.7.7.DUNNO/cgame-x86_64.so.h']
outfile = NamedTemporaryFile(mode="w", suffix="hed.h")

for fname in filenames:
    with open(fname) as infile:
        for line in infile:
            outfile.write(line)

index = Index.create()

tu = index.parse(outfile.name)

#
# for c in tu.cursor.get_children():
#     if c.kind == CursorKind.STRUCT_DECL:
#         print("" + c.type.spelling + ": " + str(c.type.get_size()))
#         for f in c.type.get_fields():
#             print(" -> (" + f.type.spelling + ") " + f.spelling + " : " + str(c.type.get_offset(f.spelling)))

# codecomplete = tu.codeComplete(outfile.name, 9, 1)
# for r in tu.diagnostics:
#     print(r)

print("""
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

""")

for c in tu.cursor.get_children():
    if c.kind == CursorKind.STRUCT_DECL:
        cString = ClassCreator(c).generateClass()
        if cString != "":
            print(cString)
