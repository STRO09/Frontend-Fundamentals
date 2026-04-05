export class BloomFilter {
  private size: number
  private bits: Uint8Array
  private hashCount: number

  constructor(size: number = 100, hashCount: number = 3) {
    this.size = size
    this.hashCount = hashCount
    this.bits = new Uint8Array(size)
  }

  // Single base hash
  private baseHash(str: string, seed: number): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash * seed + str.charCodeAt(i)) % this.size
    }
    return hash
  }

  // Generate multiple hashes from base
  private getHashes(item: string): number[] {
    const hashes: number[] = []
    for (let i = 1; i <= this.hashCount; i++) {
      hashes.push(this.baseHash(item, 31 + i * 2))
    }
    return hashes
  }

  add(item: string) {
    const hashes = this.getHashes(item)
    hashes.forEach((h) => {
      this.bits[h] = 1
    })
  }

  contains(item: string): boolean {
    const hashes = this.getHashes(item)
    return hashes.every((h) => this.bits[h] === 1)
  }

  // optional: debug
  getBitArray() {
    return Array.from(this.bits)
  }

    // ✅ Serialize to base64
  toBase64(): string {
    return btoa(String.fromCharCode(...this.bits))
  }

  // ✅ Restore from base64
  static fromBase64(base64: string, size: number, hashCount: number) {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const filter = new BloomFilter(size, hashCount)
    filter.bits = bytes

    return filter
  }
}