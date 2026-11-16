// Contact address, stored encoded (reversed, XOR 23) so it never appears in the
// prerendered HTML or as a plain string in the JS bundle. Decoded only on click.
const ENCODED_CONTACT = [127, 103, 57, 98, 115, 114, 57, 103, 98, 87, 118, 112, 114, 116, 101, 118, 100, 118];

export const decodeContact = () =>
  ENCODED_CONTACT.map((c) => String.fromCharCode(c ^ 23)).reverse().join("");

export const openEmail = (subject?: string) => {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  window.location.href = "mailto:" + decodeContact() + query;
};
