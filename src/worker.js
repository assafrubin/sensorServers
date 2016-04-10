/**
 * Created by Assaf on 3/10/2016.
 */
var selectedDbNumber = null;
var RAW_TABLE_DB = 0;
var NEW_ADS_TABLE = 1;
function initClient(dbNumber, callback) {
  var client = redis.createClient({port: 6842});
  client.on("error", function (err) {
    console.log("Error " + err);
  });
  client.select(dbNumber, function (err, res) {
    if (err) {
      console.log('Error: ' + err);
    }
    selectedDbNumber = dbNumber;
    callback(client);
  });
}

exports.saveSensorRecord = function (record) {
  //TODO validate record siteId, sensorId, etc
  //initClient(RAW_TABLE_DB, function(client) {
  //  writeRawData(client, record, 0, [], function(newAds) {
  //    console.log('newAds: ' + newAds.length + ', existingAds: ' + existingAdCounter);
  //    client.end(true);
  //    writeNewAds(newAds);
  //    callback();
  //  });
  //});
};