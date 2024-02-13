import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TorrentEntity {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;

  @Field()
  hash: string;

  @Field()
  quality: string;

  @Field()
  type: string;

  @Field()
  video_codec: string;

  @Field()
  bit_depth: string;

  @Field()
  is_repack: string;

  @Field()
  audio_channels: string;

  @Field(() => Int)
  seeds: number;

  @Field(() => Int)
  peers: number;

  @Field()
  size: string;

  @Field(() => Int)
  size_bytes: number;

  @Field(() => Int)
  date_uploaded_unix: number;

  @Field()
  date_uploaded: string;

  @Field(() => Int, { nullable: true })
  movieId?: number;
}
