-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "description_full" DROP NOT NULL,
ALTER COLUMN "mpa_rating" DROP NOT NULL,
ALTER COLUMN "synopsis" DROP NOT NULL;

-- AlterTable
ALTER TABLE "torrents" ALTER COLUMN "size_bytes" SET DATA TYPE BIGINT;
