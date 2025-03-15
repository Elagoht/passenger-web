class FaviconFetcher {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = this.normalizeUrl(url);
  }

  private normalizeUrl(url: string): string {
    let normalizedUrl = url;
    if (!normalizedUrl.match(/^https?:\/\//)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    const urlObj = new URL(normalizedUrl);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  }

  private async fetchPage(): Promise<Document | null> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: {
          // Tell the server that we want a web browser result
          // But we are a bot and we are fetching the favicon
          "User-Agent": "Mozilla/5.0 (compatible; FaviconFetcher/1.0)",
        },
      });
      if (!response.ok) return null;
      const html = await response.text();
      const parser = new DOMParser();
      return parser.parseFromString(html, "text/html");
    } catch (error) {
      console.warn("Sayfa fetch hatası:", error);
      return null;
    }
  }

  private getIconsFromMeta(doc: Document): { url: string; size?: number }[] {
    const candidates: { url: string; size?: number }[] = [];
    const icons = doc.querySelectorAll(
      'link[rel="icon"], link[rel="shortcut icon"]',
    );
    icons.forEach((icon) => {
      const href = icon.getAttribute("href");
      const sizes = icon.getAttribute("sizes");
      if (href) {
        const faviconUrl = new URL(href, this.baseUrl).toString();
        const size = sizes ? parseInt(sizes.split("x")[0], 10) : undefined;
        candidates.push({ url: faviconUrl, size });
      }
    });
    return candidates;
  }

  private getAppleIcons(doc: Document): { url: string; size?: number }[] {
    const candidates: { url: string; size?: number }[] = [];
    const appleIcons = doc.querySelectorAll(
      'link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]',
    );
    appleIcons.forEach((icon) => {
      const href = icon.getAttribute("href");
      if (href) {
        const faviconUrl = new URL(href, this.baseUrl).toString();
        candidates.push({ url: faviconUrl, size: 180 });
      }
    });
    return candidates;
  }

  private async getIconsFromManifest(
    doc: Document,
  ): Promise<{ url: string; size?: number }[]> {
    const candidates: { url: string; size?: number }[] = [];
    const manifestLink = doc.querySelector('link[rel="manifest"]');
    if (!manifestLink) return candidates;

    const manifestHref = manifestLink.getAttribute("href");
    if (!manifestHref) return candidates;

    try {
      const manifestUrl = new URL(manifestHref, this.baseUrl).toString();
      const response = await fetch(manifestUrl);
      const manifest = await response.json();
      if (manifest.icons && Array.isArray(manifest.icons)) {
        manifest.icons.forEach((icon: { src: string; sizes?: string }) => {
          const faviconUrl = new URL(icon.src, this.baseUrl).toString();
          const size = icon.sizes
            ? parseInt(icon.sizes.split("x")[0], 10)
            : undefined;
          candidates.push({ url: faviconUrl, size });
        });
      }
    } catch (error) {
      console.warn("Manifest dosyası yüklenemedi:", error);
    }
    return candidates;
  }

  private async isValidFavicon(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      return (
        response.ok &&
        response.headers.get("content-type")?.startsWith("image/") === true
      );
    } catch (error) {
      console.warn(`Favicon kontrolü başarısız: ${url}`, error);
      return false;
    }
  }

  public async fetchFavicon(): Promise<string | null> {
    const doc = await this.fetchPage();
    if (!doc) {
      return this.checkDefaultFavicon();
    }

    const candidates: { url: string; size?: number }[] = [
      ...this.getIconsFromMeta(doc),
      ...this.getAppleIcons(doc),
      ...(await this.getIconsFromManifest(doc)),
    ];

    candidates.sort((a, b) => (b.size || 0) - (a.size || 0));

    for (const candidate of candidates) {
      if (await this.isValidFavicon(candidate.url)) {
        return candidate.url;
      }
    }

    return this.checkDefaultFavicon();
  }

  private async checkDefaultFavicon(): Promise<string | null> {
    const defaultFaviconUrl = `${this.baseUrl}/favicon.ico`;
    if (await this.isValidFavicon(defaultFaviconUrl)) {
      return defaultFaviconUrl;
    }
    return null;
  }
}

export default FaviconFetcher;
