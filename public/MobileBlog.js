var blog;
var saveToBEInterval;
var saveToBEIntervaltitle;
var saveToBEIntervalcontent;

var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

var Blog = function(){
  this.name = guid();
};

var change = function(event, type){
  if(!blog){
    blog = new Blog();
  }
  var intervalName = "saveToBEInterval" + type;
  if(!eval(intervalName)){
    eval(intervalName + " = setInterval(function(){callSaveToBE(type);}, 1000)");
  }
  var text = event.target.value.trim();
  if(event.keyCode == 13){
    saveToBE(type, text);
    type === "title" && event.target.blur();
    window.localStorage.removeItem(blog.name + type);
    eval("clearInterval(" + intervalName + ")");
    eval(intervalName + "= undefined");
  }
  else{
    window.localStorage.setItem(blog.name + type, text);
  }
};

var saveToBE = function(type, text){
  console.log(blog.name + " " + type + " " + text);
  window.localStorage.removeItem(blog.name + type);
};

var callSaveToBE = function(type){
  var text = window.localStorage.getItem(blog.name + type);
  text && text.trim !== "" && saveToBE(type, text);
};
