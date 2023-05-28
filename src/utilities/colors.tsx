type RGB = {
    r: number,
    g: number,
    b: number
};

export const parseColor = (color: string): RGB => {
    let r, g, b;

    if (color.startsWith('#')) {
      const hex = color.substring(1);
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);

      if (!match) {
        throw new Error('Invalid color format');
      }

      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }
  
    return { r, g, b };
}

export const relativeLuminance = ({ r, g, b }: RGB): number => {
    const sRGB = (color: number) => color / 255;
    const adjustGamma = (value: number) => (value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));
  
    const R = adjustGamma(sRGB(r));
    const G = adjustGamma(sRGB(g));
    const B = adjustGamma(sRGB(b));
  
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export const contrastRatio = (lum1: number, lum2: number): number => {
    const L1 = Math.max(lum1, lum2);
    const L2 = Math.min(lum1, lum2);
  
    return (L1 + 0.05) / (L2 + 0.05);
}