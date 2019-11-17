const connectionJSON = require("./config")
const mssql = require("mssql")

const pool1 = new mssql.ConnectionPool(connectionJSON);
const pool1Connect = pool1.connect();
pool1.on('error', err => {
    console.log(err);
})

async function getData(sql) {
    await pool1Connect;
    try {
      //'mssql://' + config.dbuser + ':' + config.dbpassword + '@' + config.dbhost + '/' + config.dbname
      const request = pool1.request();
    	const result = await request.query(sql)
    	return result.recordset;
  } catch (err) {
    console.log("Error: "+ err);
    return err;
  }
}


module.exports={
  execute : getData
}
