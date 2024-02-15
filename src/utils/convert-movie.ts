import { YtsMovie } from '../jobs/types';

export function convertToMovieData(movie: YtsMovie) {
  return {
    data: {
      background_image: movie.background_image,
      background_image_original: movie.background_image_original,
      imdb_code: movie.imdb_code,
      language: movie.language,
      large_cover_image: movie.large_cover_image,
      medium_cover_image: movie.medium_cover_image,
      rating: movie.rating,
      small_cover_image: movie.small_cover_image,
      state: movie.state,
      title_long: movie.title_long,
      summary: movie.summary,
      title: movie.title,
      yt_trailer_code: movie.yt_trailer_code,
      year: movie.year,
      description_full: movie.description_full,
      mpa_rating: movie.mpa_rating,
      genres: movie.genres,
      slug: movie.slug,
      title_english: movie.title_english,
      synopsis: movie.synopsis,
      url: movie.url,
      torrents: {
        createMany: {
          data: movie.torrents,
        },
      },
    },
  };
}
