var firebaseConfig = {
    apiKey: "AIzaSyCwUFJd_w5ttP9uotOncImZWPlE9l118KE",
    authDomain: "digital-election-system.firebaseapp.com",
    databaseURL: "https://digital-election-system-default-rtdb.firebaseio.com",
    projectId: "digital-election-system",
    storageBucket: "digital-election-system.appspot.com",
    messagingSenderId: "1017590704452",
    appId: "1:1017590704452:web:735fab9a5ceb55b4d24f11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var vname = "";
var aadharno = "";
var phno = "";
var age= "";
var email = "";
var username = "";
var password = "";
var confirmpassword = "";
var constituency = "";

var select = document.getElementById("age");
for (var i = 1; i <= 130; i++) {
    var option = document.createElement('option');
    option.text = option.value = i+17;
    select.add(option, i);
   
}


document.getElementById("registration").onsubmit = function () { return submit() };
function submit() {
    username = document.getElementById("username").value;
    aadharno = document.getElementById("aadharno").value;
    vname = document.getElementById("v_name").value;
    phno = document.getElementById("phoneno").value;
    age = document.getElementById("age").value;
    email = document.getElementById("emailid").value;
    password = document.getElementById("inputpassword").value;
    confirmpassword = document.getElementById("inputpassword2").value;
    constituency = document.getElementById("constituency").value;


    var checked = "false";
    firebase.database().ref("/registration").on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            checkuname = childKey;
            //Start code
            if (username == checkuname) {
                checked = "true";
            }
            //End code
        });
    });


    if (checked == "true") {
        window.alert("username already exists");
        return false;
    }
    else {
        if (password != confirmpassword) {
            window.alert("passwords dont match");
            return false;
        }
        else {

            firebase.database().ref("/registration").child(username).update({
                uname: username,
                vname: vname,
                aadharno: aadharno,
                phonenumber: phno,
                age: age,
                email: email,
                password: password,
                constituency: constituency,
                status: "pending",
                voted:"no"
            });

            document.getElementById("username").value = "";
            document.getElementById("aadharno").value = "";
            document.getElementById("v_name").value="";
            document.getElementById("phoneno").value="";
            document.getElementById("age").value="";
            document.getElementById("emailid").value="";
            document.getElementById("inputpassword").value="";
            document.getElementById("inputpassword2").value="";
            document.getElementById("constituency").value="";
            document.getElementById("message").innerHTML="Please Wait For Admin Approval";
            document.getElementById("message").style.display="inline-block";
            window.location="#message";
        }
    }
    return false;
}