<template>
    <div id="personsDatatable">        
        <v-card>
            <v-card-title>
                <h4>{{ this.title }}</h4>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Buscar..."
                    single-line
                    hide-details>
                </v-text-field>
            </v-card-title>
            
            <v-data-table
            :headers="this.headers"
            :items="this.persons"
            :search="search">
                <template v-slot:items="props">                    
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.surname }}</td>
                    <td>{{ props.item.nif }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.phone }}</td>
                    <td>
                        <v-btn 
                            flat
                            icon
                            color="primary">
                            <v-icon>remove_red_eye</v-icon>
                        </v-btn>
                        <v-btn 
                            flat
                            icon
                            color="yellow darken-2"
                            @click="goToEdit(props.item.id)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn 
                            flat
                            icon
                            color="red"
                            @click="deletePerson(props.item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning">
                    Tu búsqueda para "{{ search }}" no tiene coincidencias.
                    </v-alert>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import firebase from 'firebase'

    const db = firebase.firestore()
    let personsRef = db.collection('customers')

    export default {    
        name: 'PersonsDatatable',
        data() {
            return {
                persons: [],
                headers: [                    
                    { text: 'Nombre', value: 'name' },
                    { text: 'Apellidos', value: 'surname' },
                    { text: 'NIF', value: 'nif' },
                    { text: 'Correo electrónico', value: 'email' },
                    { text: 'Teléfono', value: 'phone' },
                    { text: 'Acciones', value: null, sortable: false }
                ],
                search: ''
            }
        },
        methods: {
            deletePerson(person) {
                personsRef.doc(person.id).delete()
                    .then(() => {
                        let index = this.persons.map(item => item.id).indexOf(person.id)

                        this.persons.splice(index, 1)
                    })                
            },
            goToEdit(customerId) {
                this.$router.push(
                    { 
                        name: 'CustomerEdit', 
                        params: { 
                            id:  customerId
                        } 
                    })
            }
        },
        mounted() {
            personsRef.get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        if (doc.data().type == 'person') {
                            this.persons.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        }
                    })
                })
        },
        props: {
            title: String
        }
    }
</script>