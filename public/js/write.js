/**
 * Created by lingchuanh on 12/11/14.
 */

var title = new MediumEditor('.title', {
    placeholder: "题目"
});

var content = new MediumEditor(".content", {
    placeholder: "你的故事"
});

var blog = document.getElementById("blog");

var publish = function(){
    console.log(blog.innerHTML);
};