const connection = require("/connection.js");

function printQuestionMarks(num) {
    let array = [];

    for (let i = 0; i < num; i++) {
        array.push("?");
    }

    return array.toString();
}

function objToSql(obj) {
    let array = [];
    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
        return array.toString();
    }
}

let orm = {
    selectAll: function (tableInput, cb) {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        const queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        const queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
}

module.exports = orm;