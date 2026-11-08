DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Property'
      AND column_name = 'latitute'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Property'
      AND column_name = 'latitude'
  ) THEN
    ALTER TABLE "Property" RENAME COLUMN "latitute" TO "latitude";
  ELSIF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Property'
      AND column_name = 'latitude'
  ) THEN
    RAISE EXCEPTION 'Neither latitude nor latitute exists on Property';
  END IF;
END $$;

ALTER TABLE "Property"
ADD COLUMN IF NOT EXISTS "amenities" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];