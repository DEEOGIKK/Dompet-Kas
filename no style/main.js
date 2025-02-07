import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, update, set, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQa-DaLCaFQ8p-toZ0qm_7H1ej65nLVOM",
    authDomain: "duit-kas-9f8ef.firebaseapp.com",
    databaseURL: "https://duit-kas-9f8ef-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "duit-kas-9f8ef",
    storageBucket: "duit-kas-9f8ef.firebasestorage.app",
    messagingSenderId: "594929321039",
    appId: "1:594929321039:web:4a2a13be45efdaf636563a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const inputsaldo = document.getElementById("inputsaldo");

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

// update saldo
onValue(ref(db, "saldo/saldo"), (snapshot) => {
    document.getElementById("saldo").textContent = rupiah(snapshot.val());
});

// tambah saldo
function tambahSaldo() {

    if(inputsaldo.value != 0) {

        get(ref(db, "saldo/saldo")).then((snapshot) => {

            var saldoSekarang = parseInt(snapshot.val())
            var saldoInput = parseInt(inputsaldo.value);
            var tambahan = 0;

            tambahan = saldoSekarang + saldoInput;
            
            set(ref(db, "saldo"), {
                saldo: tambahan
            })

            inputsaldo.value = "";

        }).catch(error => {
            console.log(error)
        }) 

    }

}

// kurang saldo
function kurangSaldo() {
    
    if(inputsaldo.value != 0) {

        get(ref(db, "saldo/saldo")).then((snapshot) => {

            var saldoSekarang = parseInt(snapshot.val())
            var saldoInput = parseInt(inputsaldo.value);
            var tambahan = 0;

            if(saldoSekarang >= saldoInput) {
                tambahan = saldoSekarang - saldoInput;
            
                set(ref(db, "saldo"), {
                    saldo: tambahan
                })

                inputsaldo.value = "";
            }else {
                alert("saldo anda kurang!");
            }

        }).catch(error => {
            console.log(error)
        }) 

    }
}

// listener
document.getElementById("tambah").addEventListener("click", function() {
    tambahSaldo();
});
document.getElementById("kurang").addEventListener("click", function() {
    kurangSaldo();
});