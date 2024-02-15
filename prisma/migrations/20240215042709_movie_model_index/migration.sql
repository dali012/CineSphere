-- CreateIndex
CREATE INDEX "movies_year_imdb_code_title_idx" ON "movies"("year", "imdb_code", "title");
