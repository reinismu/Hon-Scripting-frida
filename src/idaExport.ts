import { BinExport2 } from "../types/binexport2";
import { readFileSync } from "fs";
import IntervalTree from "@flatten-js/interval-tree";

export function decode(path: string): BinExport2 {
  return BinExport2.decode(readFileSync(path));
}

export interface IdaInfo {
  vertexes?: BinExport2.CallGraph.IVertex[];
}

type HonLibraryType =
  | "libk2-x86_64.so"
  | "libgame_shared-x86_64.so"
  | "cgame-x86_64.so";

export class IdaHelper {
  private vertexTreeMap: Map<HonLibraryType, IntervalTree> = new Map();

  public addIdaInfo(type: HonLibraryType, jsonPath: string) {
    console.log(`add type ${type}`);
    const idaInfo = JSON.parse(readFileSync(jsonPath).toString()) as IdaInfo;
    if (!idaInfo.vertexes) return;
    this.vertexTreeMap.set(type, this.vertexesToIntervalTree(idaInfo.vertexes));
  }

  public getFunctionAt(
    libName: string,
    pointer: NativePointer
  ): BinExport2.CallGraph.IVertex | null {
    const tree = this.vertexTreeMap.get(libName as HonLibraryType);
    if (!tree) return null;
    const results = tree.search([pointer.toInt32(), pointer.toInt32()]);
    if (results.length === 0) return null;
    return results[0] as BinExport2.CallGraph.IVertex;
  }

  private vertexesToIntervalTree(
    vertexes: BinExport2.CallGraph.IVertex[]
  ): IntervalTree {
    const tree = new IntervalTree();
    vertexes.reduce((p, c, index) => {
      if (p === c || !p || !p.address || !c.address) return c;

      tree.insert([p.address as number, c.address as number], p);
      return c;
    });
    return tree;
  }
}
