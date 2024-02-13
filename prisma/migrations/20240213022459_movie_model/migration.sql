-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "imdb_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_long" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "genres" TEXT[],
    "summary" TEXT,
    "yt_trailer_code" TEXT,
    "language" TEXT NOT NULL,
    "background_image" TEXT NOT NULL,
    "background_image_original" TEXT NOT NULL,
    "small_cover_image" TEXT NOT NULL,
    "medium_cover_image" TEXT NOT NULL,
    "large_cover_image" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "date_uploaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torrents" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "video_codec" TEXT NOT NULL,
    "bit_depth" TEXT NOT NULL,
    "audio_channels" TEXT NOT NULL,
    "seeds" INTEGER NOT NULL,
    "peers" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "date_uploaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieId" INTEGER,

    CONSTRAINT "torrents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_imdb_code_key" ON "movies"("imdb_code");

-- AddForeignKey
ALTER TABLE "torrents" ADD CONSTRAINT "torrents_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
