function normalizeCompanyName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\bpvt\b|\bpvt.\b/g, 'private')
    .replace(/\bltd\b|\bltd.\b/g, 'limited')
    .replace(/\bpvt ltd\b|\bpvt. ltd.\b/g, 'private limited')
    .replace(/\bco\b|\bco.\b/g, 'company')
    .replace(/[^a-z0-9\s]/g, '')  // Remove punctuation
    .replace(/\s+/g, ' ')         // Collapse multiple spaces
    .trim();
}

module.exports = normalizeCompanyName;
