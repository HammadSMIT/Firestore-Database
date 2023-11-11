import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc , getDocs  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";  

 const firebaseConfig = {
   apiKey: "AIzaSyBR9wc81pZ7-Sa_fVcRQKE-VCMbAh4Z3Wo",
   authDomain: "smitb10-8d5cb.firebaseapp.com",
   projectId: "smitb10-8d5cb",
   storageBucket: "smitb10-8d5cb.appspot.com",
   messagingSenderId: "282733667161",
   appId: "1:282733667161:web:6646aeef6f51da1be7e248",
   measurementId: "G-T4HJE3VGH3"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 let btn = document.querySelector("#SU-btn")
 if(btn){
    
    btn.addEventListener("click", ()=>{
           
   
       let getEmail = document.querySelector("#Semail")
       let getPass = document.querySelector("#Spass")  
    
        
       createUserWithEmailAndPassword(auth , getEmail.value , getPass.value)
       .then(async(userCredential) => {
         const user = userCredential.user;
         console.log(user)
   
         try {
           const docRef = await addDoc(collection(db, "users"), {
             first: getEmail.value,
             last: getPass.value,
           
           });
           console.log("Document written with ID: ", docRef.id);
            alert("OK Fine")
            location.href = "./signin.html"  
       } 
         
         
   
         catch (e) {
           console.error("Error adding document: ", e);
         }
         
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log("error code >>>> " ,  errorCode)
         console.log("error message >>>> " ,  errorMessage)  
     
     
     });
     
    })
   
 }

 
 let btn1 = document.querySelector("#SI-btn")
 if(btn1){
 btn1.addEventListener("click", ()=>{

    let email = document.querySelector("#Lemail")
    let password = document.querySelector("#Lpass")

        

signInWithEmailAndPassword(auth, email.value , password.value )
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.email)
    location.href = "./welcome.html"
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
  });

})
}

let getBtn = document.querySelector("#show")
if(getBtn){
getBtn.addEventListener("click", async() => {
    let getDiv = document.getElementById("getUsers")
    const hammad = await getDocs(collection(db, "users"));
    hammad.forEach((doc) => {
        getDiv.innerHTML += `
        <div>${doc.data().first}</div>
        <div>${doc.data().last}</div>

        `
    //   console.log(doc.data());
      
    });
    
})
}