/* MongoDB Manager Class for CRUD operations moduled ready for use :-) */

function MongoDBManager(url) {
  this.db = null;
  this.dbUrl = url;
  this.dbConnector = require("mongojs");
  this.collections = ["users", "reports"];
  this.connectToDB();
}

MongoDBManager.prototype.connectToDB = function() {
    try {
      this.db = this.dbConnector.connect(this.dbUrl, this.collections);
    } catch(err){
      console.log(err);
    }
}

MongoDBManager.prototype.isConnOK = function() {
    this.db.runCommand(
      {
        ping:1
      }, 
      function(err, res) {
        console.log(res);
        if(!err && res.ok) {
          console.log("we're up");
        }
        else {
          console.log(err);
        }
      }
    );
}

//Connected!!! and so CRUD operartions from now
//SELECT -> collection to find in and whereParams(plain JSON object) for conditions
MongoDBManager.prototype.selectUsers = function(whereParams) {
  this.db.users.find(
    whereParams, 
    function(err, users) {
      if( err || !users) 
        console.log("No users found");
      else {
        if(users.length > 0) {
          users.forEach( 
            function(user) {
              console.log(user);
            } 
          );
        }
        else {
          console.log("No users inserted");
        }
      }
    }
  );
}

//INSERT into users -> needs user json object
MongoDBManager.prototype.insertUsers = function(userObj) {
  this.db.users.save(
    userObj, 
    function(err, saved) {
      //console.log(saved);
      if( err || !saved ) 
        console.log("User not saved");
      else 
        console.log("User saved");//
    }
  );
}

MongoDBManager.prototype.updateUsers = function(whereParams, toBeUpdatedParams) {
  this.db.users.update(
    whereParams, 
    {
      $set: toBeUpdatedParams
    }, 
    function(err, updated) {
      if( err || !updated ) 
        console.log("User not updated");
      else 
        console.log("User updated");
    }
  );
}

MongoDBManager.prototype.deleteUsers = function(whereParams) {
  this.db.users.remove(
    whereParams, 
    function(err, deleted) {
      console.log(deleted);
      if( err || !deleted ) 
        console.log("User not deleted");
      else {
        if( deleted && deleted.n == 0 )
          console.log(deleted.n + " Users deleted");
      } 
    }
  );
}

/*-------------------------------------------------------*/

var databaseUrl = "localhost:27017/test"; // "username:password@example.com/mydbname"
var dbm = new MongoDBManager(databaseUrl);
dbm.isConnOK();

//dbm.selectUsers({sex:"male"});

/*dbm.insertUsers(
  {
      _id: 1, 
      email: "srirangan@gmail.com", 
      password: "iLoveMongoDB", 
      sex: "male"
  });
*/

//dbm.updateUsers({_id: 1},{password: "iReallyLoveMongo"});

//dbm.deleteUsers({_id: "2"});

}
