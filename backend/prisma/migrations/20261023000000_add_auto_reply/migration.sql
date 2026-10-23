-- AddColumn autoReply to site_config
ALTER TABLE "site_config" ADD COLUMN "autoReply" BOOLEAN NOT NULL DEFAULT false;
