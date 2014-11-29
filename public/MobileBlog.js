var blog;
var saveToBEInterval;
var saveToBEIntervaltitle;
var saveToBEIntervalcontent;

//helpers
var ajax = function(method, url, data, callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = callback;
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(data);
};

var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

//helpers

//edit
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
  if(event.keyCode == 13 && type === "title") {
    saveToBE(type, text);
    type === "title" && event.target.blur();
    window.localStorage.removeItem(blog.name + type);
    eval("clearInterval(" + intervalName + ")");
    eval(intervalName + "= undefined");
  }
  else {
    window.localStorage.setItem(blog.name + type, text);
  }
};

var saveToBE = function(type, text){
  var key = blog.name + type;
  var data = {key: key, value: text};
  ajax("POST", API.updateBlog, JSON.stringify(data),
       function(){
         console.log("callback");
       });
  window.localStorage.removeItem(blog.name + type);
};

var callSaveToBE = function(type){
  var text = window.localStorage.getItem(blog.name + type);
  text && text.trim !== "" && saveToBE(type, text);
};
//edit

//login

var validate = (function () {
  var instance;

  var validateFunc = function(){
    this.validated = {
      penName: false,
      email: false,
      password: false
    };
  };

  validateFunc.prototype.checkAll = function(field, validated){
    this.validated[field] = validated;
  };

  validateFunc.prototype.login = function(){
    if(this.validated.penName &&
       this.validated.email &&
       this.validated.password){
      ajax("POST", API.auth,
           JSON.stringify(this.validated),
           function(event){
             if(event.currentTarget.readyState === 4){
               window.location = API.home;
             }
           });
    }
  };

  function createInstance() {
    var object = new validateFunc();
    return object;
  }

  return function () {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

var penNameChange = function(e){
  var penName = e.target.value.trim();
  if(penName){
    validate().checkAll("penName", penName);
  }
  else {
    validate().checkAll("penName", false);
  }
};

var emailChange = function(e){
  var email = e.target.value.trim();
  if(email){
    validate().checkAll("email", email);
  }
  else {
    validate().checkAll("email", false);
  }
};

var passwordChange = function(e){
  var password = e.target.value.trim();
  if(password){
    document.getElementById("loginBtn").style["display"] = "block";
    validate().checkAll("password", password);
  }
  else {
    document.getElementById("loginBtn").style["display"] = "none";
    validate().checkAll("password", false);
  }
};

var loginFunc = function(e){
  e.preventDefault();
  validate().login();
};
//login
