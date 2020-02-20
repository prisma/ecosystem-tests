-- -------------------------------------------------------------
-- TablePlus 3.1.2(296)
--
-- https://tableplus.com/
--
-- Database: defaultdb
-- Generation Time: 2020-02-19 11:50:16.7610
-- -------------------------------------------------------------
CREATE DATABASE blog;
\c blog;
DROP TABLE IF EXISTS "public"."Post";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."Post" (
  "id" text NOT NULL,
  "title" text NOT NULL DEFAULT '' :: text,
  "slug" text NOT NULL DEFAULT '' :: text,
  "data" text NOT NULL DEFAULT '' :: text,
  "date" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' :: timestamp without time zone,
  "user" text NOT NULL,
  PRIMARY KEY ("id")
);
DROP TABLE IF EXISTS "public"."User";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."User" (
  "id" text NOT NULL,
  "name" text NOT NULL DEFAULT '' :: text,
  "email" text NOT NULL DEFAULT '' :: text,
  PRIMARY KEY ("id")
);
INSERT INTO "public"."Post" ("id", "title", "slug", "data", "date", "user")
VALUES
  (
    '05f88cc0-583a-4cb9-a7b2-c7a0e0dd8a67',
    'Post 1',
    'post-807a026e-fc02-4297-b4c1-259fb6c4bc7c-1',
    'post 1',
    '2020-02-19 10:03:57.782',
    'd97227bb-97b6-4a6d-81bf-04322b686165'
  );
INSERT INTO "public"."User" ("id", "name", "email")
VALUES
  (
    'd97227bb-97b6-4a6d-81bf-04322b686165',
    'Alice',
    'alice-d97227bb-97b6-4a6d-81bf-04322b686165@prisma.io'
  );
ALTER TABLE "public"."Post"
ADD
  FOREIGN KEY ("user") REFERENCES "public"."User"("id");
