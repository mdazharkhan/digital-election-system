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


    firebase.database().ref("/registration").on('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childData['status']== "pending") {
                
                voter_data = childData;
                //Start code
                var select = document.getElementById("username");
            
                var option = document.createElement('option');
                option.text = option.value = childKey;
                select.add(option, 1);
                //End code
            }
        });
    });

function getvoterdata(){

    var username=document.getElementById("username").value;
    
    firebase.database().ref("/registration").on('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey== username) {
                
                voter_data = childData;
                //Start code
                document.getElementById("vname").innerHTML=voter_data['vname'];
                document.getElementById("aadharno").innerHTML=voter_data['aadharno'];
                document.getElementById("phoneno").innerHTML=voter_data['phonenumber'];
                document.getElementById("age").innerHTML=voter_data['age'];
                document.getElementById("emailid").innerHTML=voter_data['email'];
                document.getElementById("constituency").innerHTML=voter_data['constituency'];
                //End code
            }
        });
    });
}
function reject() {
    var username=document.getElementById("username").value;
    if (username=="") {
        window.alert("Please Select a Username");
        
    }
    else{
        firebase.database().ref("/registration").child(username).update({
            status:"rejected"
        });
        window.alert("Rejected");
        window.location="pending_registrations.html";
    }
}
function approve() {
    var username=document.getElementById("username").value;
    if (username=="") {
        window.alert("Please Select a Username");
        
    }
    else{
        firebase.database().ref("/registration").child(username).update({
            status:"approved"
        });
        window.alert("Approved");
        window.location="pending_registrations.html";
    }
}
  function gohome(){
    window.location="admin-home.html";
  }

  function logout(){
    localStorage.removeItem("admin_uname");
    window.location="index.html";
  }

