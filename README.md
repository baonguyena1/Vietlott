# Vietlott

# Dump and Restore Database
    Dump:
    mongodump --db=Vietlott --dumpDbUsersAndRoles -u vietlott -p 12345 --out=./

    Create user
    db.createUser(
   {
     user: "vietlott",
     pwd: "123456",
     roles: [   { role: "clusterAdmin", db: "admin" },
                { role: "readAnyDatabase", db: "admin" },
                {role: "dbAdminAnyDatabase", db: "admin"},
                "readWrite", 
                "dbAdmin" ]
   }
)