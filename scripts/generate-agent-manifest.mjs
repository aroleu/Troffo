import { mkdir, writeFile } from 'node:fs/promises'
import { componentRegistry, getAgentContract, SOURCES } from '../src/library/registry.js'

const publicDir = new URL('../public/', import.meta.url)
await mkdir(publicDir, { recursive: true })

const manifest = {
  schemaVersion: '1.0.0',
  generatedAt: new Date().toISOString(),
  name: 'Troffo Component Intelligence',
  description: 'Unified component registry for humans and AI agents.',
  sources: Object.values(SOURCES),
  components: componentRegistry.map(getAgentContract),
}

const callable = manifest.components.filter((component) => component.status === 'local')
const restricted = manifest.components.filter((component) => component.status === 'restricted')
const sourceLines = manifest.sources.map((source) => `- ${source.label}: ${source.url} — ${source.author} — ${source.license}`)

const llms = `# Troffo Component Intelligence

Troffo is a local React component registry designed for both humans and AI agents.

## Machine-readable entry point

- /registry.json — complete structured contracts
- /llms.txt — this index

## Usage rules

1. Select components by semantic fit using useWhen and avoidWhen.
2. Import only entries whose status is "local".
3. Preserve source attribution and license notices.
4. Entries marked "restricted" are external indexes only; request user-supplied licensed source before implementation.

## Sources

${sourceLines.join('\n')}

## Counts

- ${manifest.components.length} catalog entries
- ${callable.length} local and callable entries
- ${restricted.length} restricted external indexes

## Local IDs

${callable.map((component) => `- ${component.id}: ${component.importPath}`).join('\n')}
`

await writeFile(new URL('registry.json', publicDir), `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(new URL('llms.txt', publicDir), llms)
