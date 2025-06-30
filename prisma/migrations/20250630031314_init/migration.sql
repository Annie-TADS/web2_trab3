/*
  Warnings:

  - Added the required column `method` to the `EndpointAccesses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EndpointAccesses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EndpointAccesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EndpointAccesses" ("approved", "dateTime", "endpoint", "id", "userId") SELECT "approved", "dateTime", "endpoint", "id", "userId" FROM "EndpointAccesses";
DROP TABLE "EndpointAccesses";
ALTER TABLE "new_EndpointAccesses" RENAME TO "EndpointAccesses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
