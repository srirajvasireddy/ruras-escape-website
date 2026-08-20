export interface LegalSection {
  id: string
  title: string
  body: string[]
  bullets?: string[]
  links?: { label: string; href: string }[]
}
