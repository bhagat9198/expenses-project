-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
