const CLOUDINARY_UPLOAD_SEGMENT = '/upload/';
const CLOUDINARY_TRANSFORM = 'w_600,q_auto,f_auto';

export function optimizeCloudinaryUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com') || !url.includes(CLOUDINARY_UPLOAD_SEGMENT)) {
    return url;
  }

  const [baseUrl, hash] = url.split('#');
  const [cleanUrl, query] = baseUrl.split('?');
  const [prefix, suffix] = cleanUrl.split(CLOUDINARY_UPLOAD_SEGMENT);

  if (!prefix || !suffix) return url;

  const parts = suffix.split('/');
  const firstPart = parts[0] || '';
  const hasVersionFirst = /^v\d+$/.test(firstPart);
  const hasTransformationFirst = firstPart.includes(',') || firstPart.includes('_');
  const path = hasVersionFirst || !hasTransformationFirst ? suffix : parts.slice(1).join('/');
  const optimizedUrl = `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}${CLOUDINARY_TRANSFORM}/${path}`;
  const queryString = query ? `?${query}` : '';
  const hashString = hash ? `#${hash}` : '';

  return `${optimizedUrl}${queryString}${hashString}`;
}
