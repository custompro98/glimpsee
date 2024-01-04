CREATE TABLE `og_image_blog` (
	`og_image_id` integer NOT NULL,
	`title` text DEFAULT '#FFFFFF' NOT NULL,
	`icon` text NOT NULL,
	FOREIGN KEY (`og_image_id`) REFERENCES `og_images`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `og_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `og_image_id_idx` ON `og_image_blog` (`og_image_id`);