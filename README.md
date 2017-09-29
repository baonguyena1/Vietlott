# Vietlott

# Dump and Restore Database
## Dump database
    mongodump --db=Vietlott --dumpDbUsersAndRoles -u vietlott -p 12345 --out=./
## Restore Database
    mongorestore -d Vietlott --drop --restoreDbUsersAndRoles --dir=../backup/database/20092017_1/Vietlott/

## Create new user
    db.createUser(
    {
        user: "abc",
        pwd: "123456",
        roles: [   { role: "clusterAdmin", db: "admin" },
                    { role: "readAnyDatabase", db: "admin" },
                    {role: "dbAdminAnyDatabase", db: "admin"},
                    "readWrite", 
                    "dbAdmin" ]
    })