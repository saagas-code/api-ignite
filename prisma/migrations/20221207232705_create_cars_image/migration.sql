-- CreateTable
CREATE TABLE "cars_image" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_image" ADD CONSTRAINT "cars_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
