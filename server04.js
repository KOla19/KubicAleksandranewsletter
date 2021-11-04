var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;

let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]
//nasłuch na określonym porcie
var path = require("path")
app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile(path.join(__dirname + "/static/addUser.html"))

})
const bodyParser = require("body-parser");
const { executionAsyncResource } = require("async_hooks");
const { send } = require("process");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))
app.post("/handleForm", function (req, res) {
    console.log(req.body)
    var dodac = true;
    users.forEach(element => {
        if (element['email'] == req.body.email) {
            dodac = false;
        }
    });

    if (dodac) {
        users.push(req.body)
            res.sendFile(path.join(__dirname + "/static/addUser.html"))
    }
    else{
        res.send("Mail jest w bazie")
    }
    console.log(users)
    
})
app.get("/removeUserBySelect", function (req, res) {
    var select = ""
    for (var i=0; i<users.length; i++){
        select+="<option value='"+users[i].email+"'>"+users[i].email+"</option>"
    }
    res.send("<form action='/usun' method='POST'><select name='select'>"+select+"</select><br><br><input type='submit' value='usun'></form>")
    
})
app.post("/usun", function (req, res) {
    for (var i=0; i<users.length; i++){
        if(users[i].email==req.body.select){
            users.splice(i,1)
        }
    }
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
    
})
app.get("/removeUserByRadio", function (req, res) {
    var select = ""
    for (var i=0; i<users.length; i++){
        select+="<input type='radio' name='select'value='"+users[i].email+"'id='"+users[i].email+"'><label for='"+users[i].email+"'>"+users[i].email+"</label><br>"
    }
    res.send("<form action='/usun' method='POST'>"+select+"<br><br><input type='submit' value='usun'></form>")
    
})
app.post("/usunr", function (req, res) {
    var j;
    if(Array.isArray(req.body.select)) {
        j=req.body.select.length;
        for(j-1; j>-1; j--){
            for (var i=0; i<users.length; i++){
            if(users[i].email==req.body.select[j]){
                users.splice(i,1)
            }
        }
        }}
    else {
        for (var i=0; i<users.length; i++){
            if(users[i].email==req.body.select){
                users.splice(i,1)
            }
        }
    }

    
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
    
})
app.get("/removeUserByCheckbox", function (req, res) {
    var select = ""
    for (var i=0; i<users.length; i++){
        select+="<input type='checkbox' name='select' value='"+users[i].email+"'id='"+users[i].email+"'><label for='"+users[i].email+"'>"+users[i].email+"</label><br>"
    }
    res.send("<form action='/usunr' method='POST'>"+select+"<br><br><input type='submit' value='usun'></form>")
    
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)

})
