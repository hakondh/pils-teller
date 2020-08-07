module.exports = class Dao {
  constructor(pool) {
    // Dependency Injection
    this.pool = pool;
  }

  query(sql, params, callback) {
    // Get a connection from the pool
    this.pool.getConnection((err, connection) => {
      console.log("dao: connected to database");
      // If there are any errors getting a connection
      if (err) {
        console.log("dao: error connecting");
        callback(500, { error: "error connecting" });
      }
      // Else run the statement
      else {
        console.log("dao: running sql: " + sql);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          console.log("connection was released");
          if (err) {
            console.log("error (query)");
            console.log(err);
            callback(500, { error: "error querying" });
          } else {
            console.log("dao: returning rows");
            callback(200, rows);
          }
        });
      }
    });
  }
};
