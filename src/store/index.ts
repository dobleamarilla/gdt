import { createStore } from 'vuex'
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signOut, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc42YH1OroXFZcsSKcGNNmAAM0i8WN2n8",
  authDomain: "gdt-temporal.firebaseapp.com",
  projectId: "gdt-temporal",
  storageBucket: "gdt-temporal.appspot.com",
  messagingSenderId: "63373478000",
  appId: "1:63373478000:web:9ccf17fa2cda032270ccb5",
  measurementId: "G-342NSHQFR1"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth();
// getRedirectResult(auth)
//   .then((result) => {
//     console.log("Eze: ", result);
//   }).catch((error) => {
//     console.log(error.message);
//   });

const db = getFirestore(app);
export default createStore({
  state: {
    userInfo: {
      logeado: false,
      displayName: ''
    }
  },
  mutations: {
    setUserInfoMutation(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    login({commit}) {
      signInWithRedirect(auth, provider);
    },
    logout({commit}) {
      signOut(auth).then(() => {
        console.log("Log Out OK");
      }).catch((err) => {
        console.log(err);
      });
    },
    setUserInfo({commit}, data) {
      commit('setUserInfoMutation', data);
    },
    testGet({commit}) {
      const tecladosRef = collection(db, "teclados");
      const q = query(tecladosRef, where("idTienda", "==", 1));
      getDocs(q).then((querySnapshot) => {      
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
    },    
    test({commit}, data) {
      try {
        const objetoInsertar = {
          idTienda: 2,
          timestamp: 123457,
          menus: [
            {
              nombre: "101 Bebidas",
              color: "Azul",
              submenus: [
                {
                  nombre: "Frías",
                  color: "Celeste",
                  teclas: [
                    {
                      id: 1,
                      displayName: "Nestea",
                      idArticulo: 5
                    },
                    {
                      id: 2,
                      displayName: "Cocacola",
                      idArticulo: 6					
                    }
                  ]
                },
              ]
            },
          ]
        };

        addDoc(collection(db, "teclados"), objetoInsertar).then(() => {
          console.log("Documento insertado");
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})
