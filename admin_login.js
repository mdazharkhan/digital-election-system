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

var username = "";
var password = "";

document.getElementById("adminform").onsubmit = function () { return submit() };

function submit() {

    username = document.getElementById("username").value;
    password = document.getElementById("inputpassword").value;
       
    var checked = false;
    firebase.database().ref("/Admin" ).on('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            
            console.log(childData);
            if (childKey ==username) {
                checked=true;
                admin_id = childKey;
                admin_data = childData;
                console.log(admin_data);
                    //Start code
                    if (password==admin_data['password']) {
                        localStorage.setItem("admin_uname",admin_id);
                        window.location="admin-home.html";
                    }
                    else{
                        window.alert("Wrong Password");
                        return false;
                    }
                    //End code
            }
            
        });
        if(checked==false){
            window.alert("Enter valid username");
        }
    });
   return false;
}