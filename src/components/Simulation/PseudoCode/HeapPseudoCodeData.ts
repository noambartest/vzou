import { PseudoItem } from "./pc-helpers";


export interface CodeReference<T> {
  line: number;
  name: T;
}
export type HeapAlgNames = keyof typeof HeapPseudoCode;
export const HeapPseudoCode = {
  BuildMaxHeap: [
    { text: "Build-Max-Heap(A)", tabAmount: 0 },
    { text: "𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 ← 𝐴.𝑙𝑒𝑛𝑔𝑡ℎ", tabAmount: 1 },
    { text: "for 𝑖 ← ⌊𝐴.𝑙𝑒𝑛𝑔𝑡ℎ/2⌋ down to 1", tabAmount: 1 },
    { text: "𝑴𝒂𝒙-𝑯𝒆𝒂𝒑𝒊𝒇𝒚(𝐴,𝑖)", tabAmount: 2 },
  ] as PseudoItem[],
  MaxHeapify: [
    { text: "𝑴𝒂𝒙−𝑯𝒆𝒂𝒑𝒊𝒇𝒚(𝑨,𝒊)", tabAmount: 0 },
    { text: "𝑙 ← 2i", tabAmount: 1 },
    { text: "r ← 2i + 1", tabAmount: 1 },
    { text: "𝑖𝑓 𝑙 ≤𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 𝑎𝑛𝑑 𝐴[𝑙] > 𝐴[𝑖]", tabAmount: 1 },
    { text: "𝑙𝑎𝑟𝑔𝑒𝑠𝑡 ← 𝑙", tabAmount: 2 },
    { text: "𝑒𝑙𝑠𝑒 𝑙𝑎𝑟𝑔𝑒𝑠𝑡 ← 𝑖", tabAmount: 1 },
    { text: "𝑖𝑓 𝑟 ≤ 𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 𝑎𝑛𝑑 𝐴[𝑟] > 𝐴[𝑙𝑎𝑟𝑔𝑒𝑠𝑡]", tabAmount: 1 },
    { text: "𝑙𝑎𝑟𝑔𝑒𝑠𝑡 ← r", tabAmount: 2 },
    { text: "𝑖𝑓 𝑙𝑎𝑟𝑔𝑒𝑠𝑡 ≠ 𝑖", tabAmount: 1 },
    { text: "𝑒𝑥𝑐ℎ𝑎𝑛𝑔𝑒 𝐴[𝑖] ↔ 𝐴[𝑙𝑎𝑟𝑔𝑒𝑠𝑡]", tabAmount: 2 },
    { text: "𝑀𝑎𝑥−𝐻𝑒𝑎𝑝𝑖𝑓𝑦(𝐴,𝑙𝑎𝑟𝑔𝑒𝑠𝑡)", tabAmount: 2 },
  ] as PseudoItem[],
  HeapExtractMax: [
    { text: "𝑯𝒆𝒂𝒑−𝑬𝒙𝒕𝒓𝒂𝒄𝒕−𝑴𝒂𝒙(𝑨)", tabAmount: 0 },
    { text: "if A.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 < 1", tabAmount: 1 },
    { text: "error “ℎ𝑒𝑎𝑝 𝑢𝑛𝑑𝑒𝑟𝑓𝑙𝑜𝑤”", tabAmount: 2 },
    { text: "max ← 𝐴[1]", tabAmount: 1 },
    { text: "𝐴[1] ← 𝐴[𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒]", tabAmount: 1 },
    { text: "𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 ← 𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 − 1", tabAmount: 1 },
    { text: "𝑴𝒂𝒙-𝑯𝒆𝒂𝒑𝒊𝒇𝒚(𝐴,1)", tabAmount: 1 },
    { text: "return max", tabAmount: 1 },
  ] as PseudoItem[],
  HeapMax: [
    { text: "𝑯𝒆𝒂𝒑−𝑴𝒂𝒙(𝑨)", tabAmount: 0 },
    { text: "if A.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 < 1", tabAmount: 1 },
    { text: "error “ℎ𝑒𝑎𝑝 𝑢𝑛𝑑𝑒𝑟𝑓𝑙𝑜𝑤”", tabAmount: 2 },
    { text: "return 𝐴[1]", tabAmount: 1 },
  ] as PseudoItem[],
  MaxHeapInsert: [
    { text: "𝑴𝒂𝒙−𝑯𝒆𝒂𝒑−𝑰𝒏𝒔𝒆𝒓𝒕(𝑨,𝒌𝒆𝒚)", tabAmount: 0 },
    { text: "𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 ← 𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 + 1", tabAmount: 1 },
    { text: "𝐴[𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒] ← −∞", tabAmount: 1 },
    { text: "𝐻𝑒𝑎𝑝−𝐼𝑛𝑐𝑟𝑒𝑎𝑠𝑒−𝐾𝑒𝑦(𝐴,𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒,𝑘𝑒𝑦)", tabAmount: 1 },
  ] as PseudoItem[],
  HeapIncreaseKey: [
    { text: "𝑯𝒆𝒂𝒑−𝑰𝒏𝒄𝒓𝒆𝒂𝒔𝒆−𝑲𝒆𝒚(𝑨,𝒊,𝒌𝒆𝒚)", tabAmount: 0 },
    { text: "if 𝑘𝑒𝑦 < 𝐴[𝑖]", tabAmount: 1 },
    { text: "error “𝑛𝑒𝑤 𝑘𝑒𝑦 𝑖𝑠 𝑠𝑚𝑎𝑙𝑙𝑒𝑟”", tabAmount: 2 },
    { text: "𝐴[𝑖] ← 𝑘𝑒𝑦", tabAmount: 1 },
    { text: "while 𝑖 > 1 and 𝐴[𝑝𝑎𝑟𝑒𝑛𝑡(𝑖)] < 𝐴[𝑖]", tabAmount: 1 },
    { text: "𝑒𝑥𝑐ℎ𝑎𝑛𝑔𝑒 𝐴[𝑖] ↔ 𝐴[𝑝𝑎𝑟𝑒𝑛𝑡(𝑖)]", tabAmount: 2 },
    { text: "𝑖 ← 𝑝𝑎𝑟𝑒𝑛𝑡(𝑖)", tabAmount: 2 },
  ] as PseudoItem[],
  MaxHeapSort: [
    { text: "𝑯𝒆𝒂𝒑−𝑺𝒐𝒓𝒕(𝑨)", tabAmount: 0 },
    { text: "𝐵𝑢𝑖𝑙𝑑−𝑀𝑎𝑥−𝐻𝑒𝑎𝑝(𝐴) //skipped", tabAmount: 1 },
    { text: "for 𝑖 ← 𝐴.𝑙𝑒𝑛𝑔𝑡ℎ down to 2", tabAmount: 1 },
    { text: "𝑒𝑥𝑐ℎ𝑎𝑛𝑔𝑒 𝐴[1] ↔ 𝐴[𝑖]", tabAmount: 2 },
    { text: "𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 ← 𝐴.ℎ𝑒𝑎𝑝_𝑠𝑖𝑧𝑒 - 1", tabAmount: 2 },
    { text: "𝑴𝒂𝒙-𝑯𝒆𝒂𝒑𝒊𝒇𝒚(𝐴,1)", tabAmount: 2 },
  ] as PseudoItem[],
};
export const HeapPseudoCodeList = {
  BuildMaxHeap: [ "BuildMaxHeap", "MaxHeapify" ] as HeapPseudoCodeKeys[],
  MaxHeapify: [ "MaxHeapify" ] as HeapPseudoCodeKeys[],
  HeapExtractMax: [ "HeapExtractMax", "MaxHeapify" ] as HeapPseudoCodeKeys[],
  HeapMax: [ "HeapExtractMax" ] as HeapPseudoCodeKeys[],
  MaxHeapInsert: [ "MaxHeapInsert", "HeapIncreaseKey" ] as HeapPseudoCodeKeys[],
  HeapIncreaseKey: [ "HeapIncreaseKey" ] as HeapPseudoCodeKeys[],
  MaxHeapSort: [ "MaxHeapSort", "MaxHeapify" ] as HeapPseudoCodeKeys[],
};
export type HeapPseudoCodeKeys = keyof typeof HeapPseudoCode;
