-- CreateTable
CREATE TABLE "specifications_cars" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specifications_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
