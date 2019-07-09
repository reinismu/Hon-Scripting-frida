import { decode, IdaInfo } from "../src/idaExport";
import { writeFileSync } from "fs";
import { parse } from "path";

function exportIdaInfo(filePath: string) {
  const name = parse(filePath).name;
  const k2 = decode(filePath);

  if (!k2.callGraph) return;

  writeFileSync(
    "ida_data/" + name + ".json",
    JSON.stringify({
      vertexes: k2.callGraph.vertex
    } as IdaInfo)
  );
}

exportIdaInfo("/home/detuks/Projects/hon/binaries/4.7.7.DUNNO/libk2-x86_64.BinExport");
