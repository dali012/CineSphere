import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { TorrentEntity } from './torrent.entity';

@ObjectType()
export class MovieEntity {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;

  @Field()
  imdb_code: string;

  @Field()
  title: string;

  @Field()
  title_long: string;

  @Field()
  title_english: string;

  @Field()
  slug: string;

  @Field(() => Int)
  year: number;

  @Field(() => Float)
  rating: number;

  @Field({ nullable: true })
  description_full?: string;

  @Field({ nullable: true })
  synopsis?: string;

  @Field(() => [String])
  genres: string[];

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  yt_trailer_code?: string;

  @Field()
  language: string;

  @Field({ nullable: true })
  mpa_rating?: string;

  @Field()
  background_image: string;

  @Field()
  background_image_original: string;

  @Field()
  small_cover_image: string;

  @Field()
  medium_cover_image: string;

  @Field()
  large_cover_image: string;

  @Field()
  state: string;

  @Field(() => Date)
  date_uploaded: Date;

  @Field(() => [TorrentEntity], { nullable: 'items' })
  torrents: TorrentEntity[];
}
