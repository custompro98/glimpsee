DROP INDEX IF EXISTS `email_partial_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `email_partial_idx` ON `users` (`email`) WHERE deleted_at IS NULL;
