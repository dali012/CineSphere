import { Movie, Torrent } from '@prisma/client';

export type YtsResponse = {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: [Movie & { torrents: [Torrent] }];
  };
};

export type YtsMovie = Movie & { torrents: [Torrent] };
