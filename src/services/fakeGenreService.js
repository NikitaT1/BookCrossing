export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Drama" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Poetry" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" }
];

export function getGenres() {
  return genres.filter(g => g);
}
