CREATE TABLE `og_image_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`og_image_id` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`og_image_id`) REFERENCES `og_images`(`id`) ON UPDATE no action ON DELETE no action
);
