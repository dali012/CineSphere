-- CreateTable
CREATE TABLE "yts_scraped_data" (
    "id" SERIAL NOT NULL,
    "last_scraped_page" INTEGER NOT NULL,

    CONSTRAINT "yts_scraped_data_pkey" PRIMARY KEY ("id")
);
