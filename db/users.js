var records = [
  {
    id: 1,
    username: "sam",
    password: "codec@demy10",
  },
  {
    id: 2,
    username: "jill",
    password: "birthday",
  },
  {
    id: 3,
    username: "joseam",
    password: "1234"
  },
];

exports.createUser = function (user) {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: getNewId(records),
      ...user,
    };
    records = [newUser, ...records];
    console.log(records);
    resolve(newUser);
  });
};

exports.findById = function (id, cb) {
  process.nextTick(function () {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
