module.exports = {
  response: function(res, code){
    if(code === 500){
      res.status(500).send("Internal error!");
    }
    else if(code === 201){
      res.status(201).send("Created!");
    }
    else if(code === 202){
      res.status(202).send("Updated!");
    }
    else if(code === 409){
      res.status(409).send("Conflicted!");
    }
  },
  json: function(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

    if(typeof data === "string") res.write(data);

    else res.write(JSON.stringify(data));

    res.end();
  },
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
};
