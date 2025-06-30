/*
  Warnings:

  - A unique constraint covering the columns `[moduleName]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "EndpointAccesses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endpoint" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EndpointAccesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_moduleName_key" ON "Permissions"("moduleName");
