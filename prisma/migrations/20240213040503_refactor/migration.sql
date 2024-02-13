/*
  Warnings:

  - Added the required column `description_full` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mpa_rating` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_english` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_uploaded_unix` to the `torrents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_repack` to the `torrents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "description_full" TEXT NOT NULL,
ADD COLUMN     "mpa_rating" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "title_english" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "torrents" ADD COLUMN     "date_uploaded_unix" INTEGER NOT NULL,
ADD COLUMN     "is_repack" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "yts_scraped_data" ALTER COLUMN "last_scraped_page" SET DEFAULT 0;
