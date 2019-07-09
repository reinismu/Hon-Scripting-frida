import { BinExport2 } from "../types/binexport2";
import { readFileSync } from "fs";

export function decode(path: string): BinExport2 {
    return BinExport2.decode(readFileSync(path));
}

export class IdaHelper {

}