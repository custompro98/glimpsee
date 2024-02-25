-- Custom SQL migration file, put you code below! --
-- ALTER TABLE `og_images`
-- MODIFY `account_id` integer NOT NULL;

ALTER TABLE og_images ADD `account_id_bak` integer DEFAULT 0 NOT NULL;

--> statement-breakpoint
UPDATE og_images
SET `account_id_bak` = `account_id`;

--> statement-breakpoint
ALTER TABLE og_images DROP `account_id`;

--> statement-breakpoint
ALTER TABLE og_images ADD `account_id` integer DEFAULT 0 NOT NULL;

--> statement-breakpoint
UPDATE og_images
SET `account_id` = `account_id_bak`;

--> statement-breakpoint
ALTER TABLE og_images DROP `account_id_bak`;
