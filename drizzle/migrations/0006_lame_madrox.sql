DROP INDEX IF EXISTS `og_image_id_idx`;--> statement-breakpoint
CREATE INDEX `og_image_blogs_og_image_id_idx` ON `og_image_blog` (`og_image_id`);--> statement-breakpoint
CREATE INDEX `og_image_views_og_image_id_idx` ON `og_image_views` (`og_image_id`);--> statement-breakpoint
CREATE INDEX `og_image_user_id_idx` ON `og_images` (`user_id`);