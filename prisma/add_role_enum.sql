-- Convert role column from VARCHAR to Role enum (USER | ADMIN)
-- Safe: maps existing 'admin'/'ADMIN' → ADMIN, everything else → USER

DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "user" ALTER COLUMN role DROP DEFAULT;

ALTER TABLE "user"
  ALTER COLUMN role TYPE "Role"
  USING (
    CASE UPPER(role)
      WHEN 'ADMIN' THEN 'ADMIN'::"Role"
      ELSE 'USER'::"Role"
    END
  );

ALTER TABLE "user" ALTER COLUMN role SET DEFAULT 'USER'::"Role";
