-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "date_uploaded" DROP DEFAULT,
ALTER COLUMN "date_uploaded" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "torrents" ALTER COLUMN "date_uploaded" DROP DEFAULT,
ALTER COLUMN "date_uploaded" SET DATA TYPE TEXT;
