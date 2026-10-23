-- Add replyMessage and repliedAt to quotes
ALTER TABLE "quotes" ADD COLUMN "replyMessage" TEXT;
ALTER TABLE "quotes" ADD COLUMN "repliedAt" TIMESTAMP(3);
