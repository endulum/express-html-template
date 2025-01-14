-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubId" INTEGER,
ADD COLUMN     "githubUser" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
