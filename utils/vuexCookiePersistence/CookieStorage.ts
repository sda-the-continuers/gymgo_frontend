import { Cookies } from '~/utils/Cookies'

class CookieStorage implements Storage {
  keys: string[] = []

  key (index: number): string | null {
    return this.keys[index]
  }

  private addKey (key: string): void {
    if (!this.keys.includes(key)) {
      this.keys.push(key)
    }
  }

  private removeKey (key: string): void {
    this.keys = this.keys.filter(key1 => key1 !== key)
  }

  get length (): number {
    return this.keys.length
  }

  clear (): void {
    this.keys.forEach(key => this.removeItem(key))
  }

  setItem (key: string, value: string): void {
    this.addKey(key)
    Cookies.set(key, value)
  }

  getItem (key: string): string | null {
    return Cookies.get(key)
  }

  removeItem (key: string): void {
    this.removeKey(key)
    Cookies.remove(key)
  }
}

export const cookieStorage = new CookieStorage()
