
// Demo
export const project = 'syudanaffan';
export const wishlistDoc = "syudanaffan";
export const projectTitle = 'Syu & \'Affan';

export const allowedEmails = [
  // "fadziljusri@gmail.com",
  "a.doublef.a.n@gmail.com",
  "nsyuhada.zulkifli@gmail.com"
]

export const fireStore = {
  collection: "infos",
  doc: project === "demo" ? "_demo" : project
};

export const fireStoreProtected = {
  collection: "infos_protected",
  doc: project === "demo" ? "_demo" : project
}

export const fireStoreWishlist = {
  collection: "wishlist",
  doc: project === "demo" ? "_demo" : wishlistDoc
};

export const themes = [
  "baby-blue-floral",
  "leaves",
  "wine",
  "vector-pink",
  "classic",
  "rose",
  "autumn",
  "tropical",
  "flora",
  "brush",
  "blush",
  "elegant",
  "lavender"
];

export const rsvpOptions = [
  { value: 'Hadir', class: 'is-success', faIcon: 'smile-wink' },
  // { value: 'Maybe', class: 'is-link', faIcon: 'meh' },
  { value: 'Tidak Hadir', class: 'is-warning', faIcon: 'frown', hidePax: true },
];

export const rsvpMaxPax = 2;

export const userData = require(`./_infos/client.json`);

export const cfg = {
  name: project,
  title: "Walimatul Urus - " + projectTitle,
}