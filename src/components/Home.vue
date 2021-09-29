<template>
  <div class="container-fluid">
    <!-- Nuevo teclado editor -->
    <div class="row mt-1 mx-auto" style="max-width: 1200px">
      <div class="col">
        <div class="form-floating">
          <input v-model="editorNombreMenu" type="text" @keyup.enter="addMenu()" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          <label>Nombre del menú</label>
        </div>

        <div class="row form-group mt-1">
          <div class="col pe-0">
            <button class="btn btn-primary w-100" @click="addMenu()">
            <i class="bi bi-plus-lg"></i> MENÚ
            </button></div>
          <div class="col ps-0" style="margin-left: 10px">
            <button class="btn btn-primary ms-1 w-100" @click="borrarMenu()">
              <i class="bi bi-dash-lg"></i> MENÚ
              </button></div>
        </div>  
      </div>
      <div class="col">
        <div class="form-floating">
          <input v-model="editorNombreSubmenu" @keyup.enter="addSubmenu()" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          <label>Nombre del submenú</label>
        </div>

        <div class="row form-group mt-1">
          <div class="col pe-0">
            <button class="btn btn-info w-100" @click="addSubmenu()">
              <i class="bi bi-plus-lg"></i> SUBMENÚ
            </button></div>
          <div class="col ps-0">
            <button class="btn btn-info ms-1 w-100" @click=" borrarSubmenu()">
              <i class="bi bi-dash-lg"></i> SUBMENÚ
            </button></div>
        </div>        
      </div>
      <div class="col">
        <div class="form-floating">
          <input v-model="editorDisplaynameTeclas" @keyup.enter="addSubmenu()" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          <label>Nombre de la tecla</label>
        </div>
        <div class="form-floating  mt-1">
          <select v-model="editorColorTeclas" class="form-select" aria-label="Default select example">
            <option value="1" class="colorIvan1 h4">COLOR 1</option>
            <option value="2" class="colorIvan2 h4">COLOR 2</option>
            <option value="3" class="colorIvan3 h4">COLOR 3</option>
            <option value="4" class="colorIvan4 h4">COLOR 4</option>
            <option value="5" class="colorIvan5 h4">COLOR 5</option>
            <option value="6" class="colorIvan6 h4">COLOR 6</option>
          </select>
          <label>Color de la tecla</label>
        </div>
        <div class="form-floating  mt-1">
          <input v-model="editorIdArticuloTeclas" @keyup.enter="addSubmenu()" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          <label>Artículo</label>
        </div>
        <div class="row form-group mt-1">
          <div class="col pe-0">
            <button class="btn btn-primary w-100" @click="addTecla()">
              <i class="bi bi-plus-lg"></i> TECLA
            </button></div>
          <div class="col ps-0">
            <button class="btn btn-primary ms-1 w-100" @click="borrarTecla()">
              <i class="bi bi-dash-lg"></i> TECLA
            </button></div>
        </div>        
      </div>
      <div class="col">
        <div class="btn-group-vertical w-100">
          <button type="button" class="btn w-100 btn-secondary btn-lg">Nuevo teclado</button>
          <button type="button" class="btn w-100 btn-secondary btn-lg mt-1">Modificar teclado</button>
          <button type="button" class="btn w-100 btn-secondary btn-lg mt-1">Eliminar teclado</button>
          <button type="button" class="btn w-100 btn-secondary btn-lg mt-1">Guardar teclado</button>
        </div>
      </div>
    </div>
    <!-- MENÚS -->
    <div class="row mt-1">
      <div v-for="(item, index) in arrayMenus" v-bind:key="index" class="col g-1">
        <button class="btn btn-primary w-100" :class="{'border-dark border-4': index == menuActivo}" @click="setMenuActivo(index)">{{item.nombre}}</button>
      </div>
    </div>
    <!-- SUBMENÚS -->
    <div class="row mt-1" v-if="mostrarSubmenus">
      <div v-for="(item, index) in arrayMenus[menuActivo].submenus" v-bind:key="index" class="col g-1">
        <button class="btn btn-info w-100" :class="{'border-dark border-4': index == submenuActivo}" @click="setSubmenuActivo(index)">{{item.nombre}}</button>
      </div>
    </div>
    <!-- TECLAS -->
    <div class="row mt-1" v-if="mostrarTeclas">
      <div class="row" v-for="(itemRow, indexRow) in (0, 6)" v-bind:key="indexRow">
        <div v-for="(item, index) in lodash.range(indexRow*6, indexRow*6+6)" v-bind:key="index" class="col g-1">
          <button v-if="arrayMenus[menuActivo].submenus[submenuActivo].teclas[(6*indexRow)+index].idArticulo != -1" 
            class="btn btn-secondary w-100 teclas"
            :class="['colorIvan'+arrayMenus[menuActivo].submenus[submenuActivo].teclas[(6*indexRow)+index].color]"
            @click="setTeclaActiva((6*indexRow)+index)">
            {{arrayMenus[menuActivo].submenus[submenuActivo].teclas[(6*indexRow)+index].displayName}}
          </button>
          <button v-else
            class="btn btn-secondary w-100 teclas"
            :class="['colorIvan'+arrayMenus[menuActivo].submenus[submenuActivo].teclas[(6*indexRow)+index].color]"
            @click="setTeclaActiva((6*indexRow)+index)">
          </button>
          
          <img v-if="(6*indexRow)+index == teclaActiva" src="../assets/activo.png" width="50" alt="Activo" style="position: fixed; margin-left: -150px; margin-top: 50px;">
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';
import { tecladoVacio } from '../helpers/teclado.vacio';
import * as _ from "lodash";

// import { useStore } from 'vuex';

// const tecladoVacio = {
// 	idTienda: null,
// 	timestamp: null,
// 	menus: []
// }

interface menusInterface {
  nombre: string,
  submenus: submenusInterface[]
}

interface submenusInterface {
  nombre: string,
  teclas: teclas[]
}

interface teclas {
  displayName: string,
  idArticulo: number,
  color: number
}

export default defineComponent({
  name: 'Home',
  setup() {
    // const store = useStore();
    const arrayMenus: Ref<menusInterface[]> = ref([]);

    const editorNombreMenu = ref('');
    const editorColorMenu = ref('');

    const editorNombreSubmenu = ref('');
    const editorColorSubmenu = ref('');

    const editorDisplaynameTeclas = ref('');
    const editorColorTeclas = ref(1);
    const editorIdArticuloTeclas = ref(-1);

    const lodash = _;
    const menuActivo = ref(0);
    const submenuActivo = ref(0);
    const teclaActiva = ref(0);
    const mostrarSubmenus = computed(() => {
      if (arrayMenus.value.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    const mostrarTeclas = computed(() => {
      if (arrayMenus.value != undefined) {
        if (arrayMenus.value.length > 0) {
          if (arrayMenus.value[menuActivo.value].submenus != undefined) {
            if (arrayMenus.value[menuActivo.value].submenus.length > 0) {
              return true;
            }
          } 
        }
      }
      return false;
    });

    function existeCoincidenciaMenus(nombreMenu: string) {
      for(let i = 0; i < arrayMenus.value.length; i++) {
        if (arrayMenus.value[i].nombre == nombreMenu) {
          return true;
        }
      }
      return false;
    }
    
    function existeCoincidenciaSubmenus(nombreSubmenu: string) {
      for(let i = 0; i < arrayMenus.value[menuActivo.value].submenus.length; i++) {
        if (arrayMenus.value[menuActivo.value].submenus[i].nombre == nombreSubmenu) {
          return true;
        }
      }
      return false;
    }

    function existeCoincidenciaTeclas(nombreTeclas: string) {
      for(let i = 0; i < arrayMenus.value[menuActivo.value].submenus[submenuActivo.value].teclas.length; i++) {
        if (arrayMenus.value[menuActivo.value].submenus[submenuActivo.value].teclas[i].displayName == nombreTeclas) {
          return true;
        }
      }
      return false;
    }

    function addMenu() {
      if (editorNombreMenu.value.length > 0) {
        if (!existeCoincidenciaMenus(editorNombreMenu.value)) {
          if (arrayMenus.value.length < 10) {
            arrayMenus.value.push({
              nombre: editorNombreMenu.value,
              submenus: []
            });
          } else {
            alert("No se permiten más menús. Máximo 10.");
          }
        } else {
          alert("Ya existe un menú con este nombre.");
        }

      } else {
        alert("El nombre del menú debe contener al menos una letra.");
      }
    }

    function addSubmenu() {
      if (editorNombreSubmenu.value.length > 0) {
        if (!existeCoincidenciaSubmenus(editorNombreSubmenu.value)) {
          if (arrayMenus.value[menuActivo.value] != undefined) {
            if (arrayMenus.value[menuActivo.value].submenus.length < 10) {
              arrayMenus.value[menuActivo.value].submenus.push({
                nombre: editorNombreSubmenu.value,
                teclas: tecladoVacio
              });
            } else {
              alert("No se permiten más submenús. Máximo 10.");
            }
          } else {
            alert("Menú no definido");
          }
        } else {
          alert("Ya existe un submenú con este nombre.");
        }
      } else {
        alert("El nombre del submenú debe contener al menos una letra");
      }
    }

    function addTecla() {
      const meActivo = menuActivo.value;
      const subActivo = submenuActivo.value;
      const tecActiva = teclaActiva.value;

      const displayNameTeclas = editorDisplaynameTeclas.value;
      const idArticuloTeclas = Number(editorIdArticuloTeclas.value);
      const colorTeclas = Number(editorColorTeclas.value);

      const arrayMenusCopia = JSON.parse(JSON.stringify(arrayMenus.value)); // Array.from(arrayMenus.value);


      if (displayNameTeclas.length > 0) {
        if (!existeCoincidenciaTeclas(displayNameTeclas)) {
          if (arrayMenusCopia[meActivo] != undefined) {
            if (arrayMenusCopia[meActivo].submenus[subActivo] != undefined) {
              arrayMenusCopia[meActivo].submenus[subActivo].teclas.splice(tecActiva, 1, {
                displayName: displayNameTeclas,
                idArticulo: idArticuloTeclas,
                color: colorTeclas
              });
              arrayMenus.value = arrayMenusCopia;
            } else {
              alert("Submenú no definido");
            }
          } else {
            alert("Menú no definido");
          }
        } else {
          alert("Ya existe una tecla con este nombre.");
        }
      } else {
        alert("El nombre de la tecla debe contener al menos una letra.");
      }
    }

    function borrarMenu() {
      if (arrayMenus.value[menuActivo.value] != undefined) {
        if(confirm("¿Seguro que quieres borrar el menú " + arrayMenus.value[menuActivo.value].nombre + " ?")) {
          arrayMenus.value.splice(menuActivo.value, 1);
        } else {
          console.log("Acción cancelada por el usuario");
        }
      } else {
        console.log("Menú no definido");
      }
    }

    function borrarSubmenu() {
      if (arrayMenus.value[menuActivo.value] != undefined) {
        if (arrayMenus.value[menuActivo.value].submenus[submenuActivo.value] != undefined) {
          if(confirm("¿Seguro que quieres borrar el submenú " + arrayMenus.value[menuActivo.value].submenus[submenuActivo.value].nombre + " ?")) {
            arrayMenus.value[menuActivo.value].submenus.splice(submenuActivo.value, 1);
          } else {
            console.log("Acción cancelada por el usuario");
          }
        } else {
          console.log("Submenú no definido");
        }
      } else {
        console.log("Menú no definido");
      }
    }

    function borrarTecla() {
      try {
        arrayMenus.value[menuActivo.value].submenus[submenuActivo.value].teclas[teclaActiva.value] = {
          displayName: '',
          color: 1,
          idArticulo: -1
        };
      } catch(err) {
        console.log(err);
        alert("Error, no se ha podido eliminar la tecla.");
      }
    }

    function setMenuActivo(index: number) {
      menuActivo.value = index;
      if (arrayMenus.value[menuActivo.value].submenus.length > 0) {
        setSubmenuActivo(0);
      }
    }
    function setSubmenuActivo(index: number) {
      submenuActivo.value = index;
      if (arrayMenus.value[menuActivo.value].submenus[submenuActivo.value].teclas.length > 0) {
        setTeclaActiva(0);
      }
    }

    function setTeclaActiva(index: number) {
      teclaActiva.value = index;
    }

    return {
      arrayMenus,
      addMenu,
      addSubmenu,
      addTecla,
      editorNombreMenu,
      editorNombreSubmenu,
      editorColorMenu,
      menuActivo,
      submenuActivo,
      teclaActiva,
      setMenuActivo,
      setSubmenuActivo,
      setTeclaActiva,
      borrarMenu,
      borrarSubmenu,
      borrarTecla,
      editorColorSubmenu,
      mostrarSubmenus,
      mostrarTeclas,
      lodash,
      editorDisplaynameTeclas,
      editorColorTeclas,
      editorIdArticuloTeclas,
    };
  },
  watch: {
    menuActivo() {
      this.editorNombreMenu =  this.arrayMenus[this.menuActivo].nombre;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .teclas {
      height: 70px;
  }
  .colJuntitas {
      /* padding-right: 0px; */
      padding: 2px;
  }
  .colorIvan1 {
      background-color: #DEE3E9 !important;
      color: #5E5F61 !important;
      border-color: #DEE3E9 !important;
  }
  .colorIvan2 {
      background-color: #EDDECB !important;
      color: #5E5F61 !important;
      border-color: #EDDECB !important;
  }
  .colorIvan3 {
      background-color: #FBB5B5 !important;
      color: #5E5F61 !important;
      border-color: #FBB5B5 !important;
  }
  .colorIvan4 {
      background-color: #DCE9D5 !important;
      color: #5E5F61 !important;
      border-color: #DCE9D5 !important;
  }
  .colorIvan5 {
      background-color: #EFD8A6 !important;
      color: #5E5F61 !important;
      border-color: #EFD8A6 !important;
  }
  .colorIvan6 {
      background-color: #B0AEC6 !important;
      color: #5E5F61 !important;
      border-color: #B0AEC6 !important;
  }
  .btn-secondary:hover {
    outline: none;
    box-shadow: none;
  }

  .btn-secondary:focus, .btn-secondary.focus {
  outline: none;
  box-shadow: none;
  }

  .btn-secondary.disabled, .btn-secondary:disabled {
  outline: none;
  box-shadow: none;
  }

  .btn-secondary:not(:disabled):not(.disabled):active,
  .btn-secondary:not(:disabled):not(.disabled).active,
  .show > .btn-secondary.dropdown-toggle {
  outline: none;
  box-shadow: none;
  }

  .btn-secondary:not(:disabled):not(.disabled):active:focus,
  .btn-secondary:not(:disabled):not(.disabled).active:focus
  .show > .btn-secondary.dropdown-toggle:focus {
    box-shadow: none !important;
  }
</style>
