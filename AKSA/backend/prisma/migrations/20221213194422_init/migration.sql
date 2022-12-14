-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "userFname" TEXT NOT NULL,
    "userLname" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "userLocation" TEXT NOT NULL,
    "useraddress" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "Userpassword" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "certificate" (
    "teachid" SERIAL NOT NULL,
    "teacher_subject" TEXT NOT NULL,
    "teacheradress" TEXT NOT NULL,
    "teacherLevel" TEXT NOT NULL,
    "teacherImage" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,
    "isvery" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "certificate_pkey" PRIMARY KEY ("teachid")
);

-- CreateTable
CREATE TABLE "product_Teacher" (
    "T_id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "teacherFname" TEXT NOT NULL,
    "teacherLname" TEXT NOT NULL,
    "teacherPhone" TEXT NOT NULL,
    "teacherLocation" TEXT NOT NULL,
    "teacherLevel" TEXT NOT NULL,

    CONSTRAINT "product_Teacher_pkey" PRIMARY KEY ("T_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "mesId" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "iseccapt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("mesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "users"("userEmail");

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_Teacher" ADD CONSTRAINT "product_Teacher_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "certificate"("teachid") ON DELETE RESTRICT ON UPDATE CASCADE;
