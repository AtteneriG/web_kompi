<template>
    <TheHeader />
    <section v-cloak class="body">
        <main>
            <div class="carousel">
                <div class="img-container">
                    <img class="img1" :src="this.dog.Imagen1" alt="imagen1">
                </div>
            </div>

            <div class="info">
                <div class="details">
                    <h1 class="name">{{ dog.Nombre }}</h1>
                    <p class="location">{{ dog.Ubicacion }}</p>
                </div>
            </div>
        </main>

        <section class="publish-date">
            <p @click="info">Publicado 04/05/2022</p>
        </section>

        <div class="info">
            <div class="description">
                <h2>Descripción</h2>
                <p>
                    {{ dog.Descripcion }}
                </p>

            </div>
            <div class="animal-data">
                <div class="data">
                    <h2>Edad:</h2>
                    <p class="age">{{ dog.Edad }}</p>
                </div>
                <div class="data">
                    <h2>Raza:</h2>
                    <p class="breed">{{ dog.Raza }}</p>
                </div>
                <div class="data">
                    <h2>Sexo:</h2>
                    <p class="gender">{{ dog.Sexo }}</p>
                </div>

                <div class="data">
                    <h2>Tamaño:</h2>
                    <p class="size">{{ dog.Tamano }}</p>
                </div>

                <div class="data">
                    <h2>Peso:</h2>
                    <p class="weight">{{ dog.Peso }}</p>
                </div>

                <div class="data">
                    <h2>Color:</h2>
                    <p class="color">{{ dog.Color }}</p>
                </div>
                <!--
                <div class="data">
                    <h2>Pelo:</h2>
                    <p class="hair">{{ dog.Pelo }}</p>
                </div> -->

                <div class="data">
                    <h2>Microchip:</h2>
                    <p class="microchip">{{ dog.Microchip }}</p>
                </div>

                <div class="data">
                    <h2>Vacunación:</h2>
                    <p class="vaccination">{{ dog.Vacunacion }}</p>
                </div>

                <div class="data">
                    <h2>Certificado ppp:</h2>
                    <p class="certified">{{ dog.Certificado_ppp }}</p>
                </div>

                <div class="data">
                    <h2>Esterilizado:</h2>
                    <p class="esterilized">{{ dog.Esterilizacion }}</p>
                </div>

            </div>
            <div class="adoption">
                <p>¿Quieres adoptar o saber más sobre {{ dog.Nombre }}?</p>
                <p> ¡Ponte en contacto con su cuidador!</p>

                <BaseButton @click="checkUser" text=" CONTACTAR" />
            </div>
        </div>


        <div class="other-kompis">
            <p>Otros Kompis que encajan con tu búsqueda</p>
            <CardGroup specie="Perro" />
        </div>
    </section>
    <TheFooter />
</template>

<script>
import { initFirebase } from '@/firebase/firebase.js'
import { getFirestore, getDoc, doc, collection, getDocs, query, where } from "firebase/firestore/lite"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { KompiStore } from "@/stores/KompiStore.js" // Almacen de pinia
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import CardGroup from '../components/CardGroup.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
    name: "TemplateDog",
    data() {
        return {
            db: null,
            storage: null,
            firestore: null,
            auth: null,
            animalInfo: null,
            arrayAnimales: [],
            store: null,

            nombre_1: '',
            location_1: '',
            img_1: null,

            nombre_2: '',
            location_2: '',
            img_2: '',

            nombre_3: '',
            location_3: '',
            img_3: '',

            nombre_4: '',
            location_4: '',
            img_4: '',

            nombre_5: '',
            location_5: '',
            img_5: '',

            dog: {
                Nombre: '',
                Ubicacion: '',
                Edad: '',
                Raza: '',
                Sexo: '',
                Tamano: '',
                Peso: '',
                Color: '',
                Pelo: '',
                Microchip: '',
                Vacunacion: '',
                Certificado_ppp: '',
                Esterilizacion: '',
                Descripcion: '',
                Imagen1: '',
                Propietario: ""
            },

            store: ""

        }
    },
    components: {
        TheHeader,
        TheFooter,
        CardGroup,
        BaseButton
    },
    methods: {
        checkUser() {
            const auth = getAuth();

            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.$swal({
                        text: "Le enviaremos al cuidador del animal tus datos de contacto y las respuestas del formulario que has rellenado previamente. Si estás de acuerdo haz click en CONTACTAR.",
                        showCancelButton: "true",
                        confirmButtonText: "Contactar",
                        cancelButtonText: "Volver atrás"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push("/ViewCaptcha");
                        }

                    });
                } else {
                    this.$swal({
                        text: "Para poder ponerte en contacto con el cuidador del animal debes iniciar sesión previamente.",
                        showCancelButton: "true",
                        confirmButtonText: "Iniciar sesión",
                        cancelButtonText: "Volver atrás",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push({
                                path: '/Login',
                            })

                        }

                    });
                }
            });
        },

    },
    created() {
        this.store = KompiStore() // Inicializamos el enlace a la store cuando se crea el componente
    },

    mounted() {
        this.db = initFirebase()
        this.storage = getStorage(this.db)
        this.firestore = getFirestore(this.db)
        this.auth = getAuth()
        getDoc(doc(this.firestore, `animals/${this.store.getId()}`))
            .then(snap => {
                if (snap.exists()) {
                    this.animalInfo = snap.data();
                    for (const element in this.dog) {
                        this.dog[element] = this.animalInfo[element]
                    }
                    this.store.setEmail(this.dog.Propietario.id);
                    console.log(this.dog.Propietario.id);

                    getDownloadURL(ref(this.storage, this.dog.Imagen1))
                        .then(URL => {
                            this.dog.Imagen1 = URL;
                        })
                }
            })
        // Esto es para obtener cuatro animales de la especie Perro para ponerlos en las tarjetas  de la ficha
        /*const p = query(collection(this.firestore, 'animals'), where('Ubicacion', '==', `Tenerife`));
        getDocs(p)
            .then(element => {
                const aux = Math.floor(Math.random() * element.size);
                for (let i = 0; i < 5; i++) {
                    this.arrayAnimales[i] = element._docs[(aux + i) % element.size].data();
                }

                this.nombre_1 = this.arrayAnimales[0].Nombre;
                this.location_1 = this.arrayAnimales[0].Ubicacion;
                getDownloadURL(ref(this.storage, this.arrayAnimales[0].Imagen1))
                    .then(e => {
                        this.img_1 = e
                    })

                this.nombre_2 = this.arrayAnimales[1].Nombre;
                this.location_2 = this.arrayAnimales[1].Ubicacion;
                getDownloadURL(ref(this.storage, this.arrayAnimales[1].Imagen1))
                    .then(e => {
                        this.img_2 = e
                    })

                this.nombre_3 = this.arrayAnimales[2].Nombre;
                this.location_3 = this.arrayAnimales[2].Ubicacion;
                getDownloadURL(ref(this.storage, this.arrayAnimales[2].Imagen1))
                    .then(e => {
                        this.img_3 = e
                    })

                this.nombre_4 = this.arrayAnimales[3].Nombre;
                this.location_4 = this.arrayAnimales[3].Ubicacion;
                getDownloadURL(ref(this.storage, this.arrayAnimales[3].Imagen1))
                    .then(e => {
                        this.img_4 = e
                    })

                this.nombre_5 = this.arrayAnimales[4].Nombre;
                this.location_5 = this.arrayAnimales[4].Ubicacion;
                getDownloadURL(ref(this.storage, this.arrayAnimales[4].Imagen1))
                    .then(e => {
                        this.img_5 = e
                    })
            })*/

    },
}
</script>

<style scoped>
p {
    font-size: 1rem;
}


h1 {
    font-family: var(--text-font);
}

h2 {
    font-size: 1rem;
}

.body {
    display: flex;
    flex-direction: column;
    color: var(--black);
    font-family: var(--title-font);
}

/* CAROUSEL */

main {
    margin-top: 5rem;
    width: 100%;
    height: calc(6.5 / 9 * 90vh);
    background-color: var(--green);
}

.carousel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-container img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.info {
    display: flex;
    flex-direction: column;
    color: var(--black);
    font-family: var(--title-font);
}


.details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 83%;
    align-self: center;
}

.name {
    margin-top: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
}

.location {
    font-size: 1rem;
    font-weight: 600;

}

.publish-date p {
    font-size: 1rem;
}

/* PUBLISH DATE */

.publish-date {
    margin-top: 7rem;
    width: 83%;
    align-self: center;
}



/* CONTENT */


.description {
    margin-top: 1rem;
    padding: 0 1.8rem;
    width: 83%;
    align-self: center;
}

.description h2 {
    margin-bottom: 0.5rem;
}

.animal-data {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-row-gap: 1rem;
    justify-content: center;
    align-self: center;
    margin: 2rem 0;
    padding: 2rem 1.8rem;
    background-color: var(--lightgrey);
    border-radius: 0.8rem;
    width: 75%;
}




.adoption {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    text-align: center;
    gap: 0.5rem;
    margin: 0 1rem 4rem;
    padding: 2rem 1.8rem;
    background-color: var(--orange);
    border-radius: 0.8rem;
    width: 75%;

}

.adoption p {
    font-size: 1rem;
    font-weight: 700;
    width: 90%;

}

.other-kompis {
    display: flex;
    flex-direction: column;
    align-content: center;
}

.other-kompis p {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 1rem -2rem;
    text-align: center;
}

.button {
    background-color: var(--white);
    margin-top: 1rem;
}




/* <!-- -----------------------------CARD------------------------- --> */





@media screen and (min-width: 767px) {

    .details,
    .publish-date,
    .description {
        width: 83%;
    }

    .publish-date {
        margin-top: 4.2rem;
        text-align: right;
    }


    .animal-data {
        justify-items: center;
        padding: 3rem 2rem;
    }

    .adoption {
        padding: 3rem 2rem;

    }

    .adoption p {
        font-size: 1.2rem;
    }

    .data {
        padding-bottom: 0.5rem;
        display: flex;
        gap: 0.6rem;
        border-bottom: solid 0.1rem var(--black);
        width: 80%;
    }

    .other-kompis {
        margin-top: 3rem;
    }

    .other-kompis p {
        font-size: 1.5rem;
        margin-bottom: -0.5rem;
    }

}

@media screen and (min-width: 1170px) {}

@media screen and (min-width: 1300px) {


    .img-container {
        width: auto;
        max-width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .body {
        background-color: var(--lightgrey);
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: var(--white);
        align-self: center;
        position: relative;
        top: -8rem;
        width: 50%;
    }

    .publish-date {
        margin-top: 3rem;
        width: 77%;
    }

    .info {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-template-rows: 2fr 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        justify-items: center;
        width: 82%;
        align-self: center;
    }

    .description {
        grid-area: 1 / 1 / 3 / 2;
        background: var(--white);
        padding: 3rem 2rem;
        margin: 2rem;
        align-self: auto;
        border-radius: 0.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .description p {
        width: 87%;
    }

    .description h2 {
        width: 90%;
    }

    .animal-data {
        grid-area: 1 / 2 / 2 / 3;
        background-color: var(--white);
        align-self: auto;
        margin: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
    }

    .data {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .adoption {
        grid-area: 2 / 2 / 3 / 3;
        align-self: auto;
        margin: 0 0 2rem;
    }

    .other-kompis {
        margin-top: 5rem;
    }

    .other-kompis p {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

}
</style>
