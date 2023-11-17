import type { ManifestElement, ManifestElementWithElementName } from '../types/index.js';

export function isManifestElementNameType(manifest: unknown): manifest is ManifestElementWithElementName {
	return typeof manifest === 'object' && manifest !== null && (manifest as ManifestElement).elementName !== undefined;
}
