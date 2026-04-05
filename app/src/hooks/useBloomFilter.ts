import { useRef } from "react"
import { BloomFilter } from "../utils/bloomfilter"

const STORAGE_KEY = "bloom-filter"

export const useBloomFilter = (size = 100, hashCount = 3) => {
  const filterRef = useRef<BloomFilter | null>(null)

  // 🔁 Initialize (load from localStorage if exists)
  if (!filterRef.current) {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      filterRef.current = BloomFilter.fromBase64(saved, size, hashCount)
    } else {
      filterRef.current = new BloomFilter(size, hashCount)
    }
  }

  const save = () => {
    const data = filterRef.current!.toBase64()
    localStorage.setItem(STORAGE_KEY, data)
  }

  const add = (item: string) => {
    filterRef.current!.add(item)
    save() // persist after mutation
  }

  const contains = (item: string) => {
    return filterRef.current!.contains(item)
  }

  return { add, contains }
}