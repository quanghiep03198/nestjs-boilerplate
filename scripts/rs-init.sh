#!/bin/bash

mongosh <<EOF
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodb-primary:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongodb-secondary:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongodb-arbiter:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
exit;
EOF

MESSAGE="\n[MongoDB] ::: Replica set configuration is applied.\n"

echo -e "\033[32m$MESSAGE\033[0m"







