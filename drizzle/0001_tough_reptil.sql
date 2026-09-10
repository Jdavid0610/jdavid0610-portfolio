ALTER TABLE "post" DROP CONSTRAINT "post_slug_unique";--> statement-breakpoint
DROP INDEX "post_published_at_idx";--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "locale" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
CREATE INDEX "post_feed_idx" ON "post" USING btree ("published","locale","published_at" DESC);--> statement-breakpoint
CREATE UNIQUE INDEX "post_slug_locale_idx" ON "post" USING btree ("slug","locale");