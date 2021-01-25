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

document.getElementById("voter_form").onsubmit = function () { return submit(); };

function submit() {

    username = document.getElementById("username").value;
    password = document.getElementById("inputpassword").value;


    var checked = "";
    firebase.database().ref("/registration").on('value', function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            console.log(childData);
            if (childKey == username) {
                voter_data = childData;
                checked = "true";

                if (childData['status'] == "approved") {
                    if (password == voter_data['password']) {
                        localStorage.setItem("v_uname",username);
                        window.location = "vote-home.html";
                    }
                    else {
                        window.alert("Wrong Password");
                    }
                }
                if (childData['status'] == "pending") {
                    window.alert("Voter Stll Pending");

                }
                if (childData['status'] == "rejected") {
                    window.alert("Voter Rejected Please Contact Admin");

                } 
            }
            
        });
        
    });

    setTimeout(function() {
        if(checked==""){
            window.alert("not registered");
        }
       
    },5000);
   
   return false;
}