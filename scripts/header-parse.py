from tempfile import NamedTemporaryFile

from clang import cindex
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
            "void": {"return": "number", "read": "readPointer"},
            "wchar_t": {"return": "NativePointer", "read": "readPointer"},
            "const wchar_t": {"return": "NativePointer", "read": "readPointer"},
        }
        self.allowedStructs = ["CVec3"]

    def isValidStruct(self, structName):
        return len(structName) > 0 and structName[0] != "$"

    def generateClass(self):
        c = self.cursor
        class_string = ""
        # if c.type.get_size() <= 0:
        #     return ""
        if not self.isValidStruct(c.spelling):
            return ""
        classType = self.cursor.type.spelling.replace("struct ", "")
        inheritence = self.getInheritence(c)
        class_string = f"// inheritence: {inheritence }\n"
        class_string += f"export class {classType} extends {inheritence} " + "{\n\n"
        for f in c.type.get_fields():
            # Ignore arrays and gaps
            class_string += f"// {f.spelling} -> type: {f.type.spelling} met: {f.type} \n"
            if "[" in f.type.spelling or "gap" in f.spelling or f.spelling == "align":
                continue
            offset = int(c.type.get_offset(f.spelling) / 8)
            if self.is_valid_type(f.type.get_pointee()):
                if f.type.spelling.endswith(" *"):
                    if f.type.spelling == "wchar_t *":
                        class_string += self.createWCharPtrGetter(f, offset)
                        continue
                    if f.type.spelling.replace(" *", "") in self.typeDictionary:
                        class_string += self.createFunctionCall(f, offset)
                    else:
                        class_string += self.createPointerStructGetter(f, offset)
                else:
                    class_string += "// function \n"
                    class_string += self.createFunctionCall(f, offset)
                continue

            if "struct" in f.type.spelling or f.type.spelling in self.allowedStructs:
                struct = f.type.spelling.replace("struct ", "")
                if "*" in struct:
                    class_string += self.createPointerStructGetter(f, offset)
                else:
                    class_string += self.createStructGetter(f, offset)
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

    def getInheritence(self, cls):
        for c in cls.get_children():
            if c.kind == CursorKind.CXX_BASE_SPECIFIER:
                return c.get_definition().displayname
        return "CObj"


    def createFunctionCall(self, f, offset):
        argTypes = self.getArgumentsTypes(f)
        returnType = f.type.get_pointee().get_result()
        getter_string = f"// args: {' '.join(map(lambda t: t.spelling, argTypes))} -> ret: {returnType.spelling} \n"
        getter_string += f"\tpublic {f.spelling}() " + "{\n"
        getter_string += f"\t\treturn null;\n"
        getter_string += "\t}\n\n"
        return getter_string

    def createWCharPtrGetter(self, f, offset):
        getter_string = ""
        getter_string += f"\tget {f.spelling}(): string " + "{\n"
        getter_string += f"\t\t const bytes = new Uint32Array(this.align({hex(offset)}).readPointer().readByteArray(200) || []);\n"
        getter_string += "\t\t let str = \"\";\n"
        getter_string += "\t\t for (let i = 0; i < bytes.length; i++) {;\n"
        getter_string += "\t\t\t if(bytes[i] === 0) return str;\n"
        getter_string += "\t\t\t str += String.fromCharCode(bytes[i]);\n"
        getter_string += "\t\t}\n"

        getter_string += "\t return str; \n"
        getter_string += "\t}\n\n"
        return getter_string

    def getArgumentsTypes(self, f):
        argsTypes = []
        for c in f.get_children():
            if c.kind == CursorKind.PARM_DECL:
                argsTypes.append(c.type)
        return argsTypes

    def createStructGetter(self, f, offset):
        struct = f.type.spelling.replace("struct ", "")
        getter_string = ""
        getter_string += f"\tget {f.spelling}(): {struct} " + "{\n"
        getter_string += f"\t\treturn new {struct}(this.align({hex(offset)}));\n"
        getter_string += "\t}\n\n"
        return getter_string

    def createPointerStructGetter(self, f, offset):
        struct = f.type.spelling.replace("struct ", "").replace(" *", "")
        getter_string = ""
        getter_string += f"\tget {f.spelling}(): {struct} " + "{\n"
        getter_string += f"\t\treturn new {struct}(this.align({hex(offset)}).readPointer());\n"
        getter_string += "\t}\n\n"
        return getter_string

    def is_valid_type(self, t):
        return t.kind != cindex.TypeKind.INVALID

    def printEnum(self):
        print("enum class %s\r\n{" % self.className)
        for con in self.constants:
            print("\t%s = 0x%08x;\r\n" % (con.name, con.offset))
        print("}")


# tu = index.parse(None, "/home/detuks/ida/IDA 7.2/plugins/defs.h")
filenames = ['/home/detuks/ida/IDA 7.2/plugins/defs.h',
             '/home/detuks/Projects/hon/binaries/4.7.8/libgame_shared-x86_64.so.h']
# filenames = ['/home/detuks/Projects/hon/binaries/4.7.7.DUNNO/cgame-x86_64.so.h']
outfile = NamedTemporaryFile(mode="w", suffix="hed.cpp")

for fname in filenames:
    with open(fname) as infile:
        for line in infile:
            outfile.write(line.replace("__cppobj ", "").replace("_OWORD", "__int128"))

index = Index.create()

tu = index.parse(outfile.name, args=['-std=c++11'])

#
# for c in tu.cursor.get_children():
#     if c.kind == CursorKind.STRUCT_DECL:
#         print("" + c.type.spelling + ": " + str(c.type.get_size()))
#         for f in c.type.get_fields():
#             print(" -> (" + f.type.spelling + ") " + f.spelling + " : " + str(c.type.get_offset(f.spelling)))

# codecomplete = tu.codeComplete(outfile.name, 9, 1)
for r in tu.diagnostics:
    if r.severity > 2:
        print(r)

print("""
export class CObj {
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

seenStructs = set()

for c in tu.cursor.get_children():
    if c.kind == CursorKind.STRUCT_DECL:
        if c.spelling in seenStructs:
            continue
        seenStructs.add(c.spelling)
        cString = ClassCreator(c).generateClass()
        if cString != "":
            print(cString)
