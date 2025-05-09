-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'HUMAN_RESOURCE', 'SECURITY_OFFICER', 'SECURITY_GUARD', 'EMPLOYEE', 'SUPPLIER', 'VISITOR');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "agency" TEXT,
    "department" TEXT,
    "companyName" TEXT,
    "dateHired" TIMESTAMP(3),
    "registeredDate" TIMESTAMP(3),
    "avatar" TEXT,
    "phoneNumber" TEXT,
    "qrCode" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "userName" TEXT,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "initName" TEXT,
    "suffixName" TEXT,
    "role" "Role" NOT NULL,
    "permissions" TEXT[],
    "status" TEXT NOT NULL,
    "password" TEXT,
    "qrCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_qrCode_key" ON "Profile"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_qrCode_key" ON "User"("qrCode");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_qrCode_fkey" FOREIGN KEY ("qrCode") REFERENCES "User"("qrCode") ON DELETE CASCADE ON UPDATE CASCADE;
