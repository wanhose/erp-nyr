<template>
    <div id="customers">
        <Navigation :app_part="title"/>

        <v-container fluid>
            <v-layout row wrap fill-width>
                <v-flex xs3>
                    <v-btn
                        block
                        color="success"
                        href="/customers/create"
                        class="elevation-6">
                        <v-icon>add_circle_outline</v-icon><span>&nbsp; Nuevo cliente</span>
                    </v-btn>
                </v-flex>

                <v-flex xs12 mt-3>
                    <CompaniesDatatable
                        title="Listado de empresas"/>
                </v-flex>

                <v-flex xs12 mt-4>
                    <PersonsDatatable
                        title="Listado de personas"/>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import CompaniesDatatable from '../../datatables/CompaniesDatatable'
    import PersonsDatatable from '../../datatables/PersonsDatatable'
    import Navigation from '../navigation/Navigation'

    export default {    
        name: 'Customers',
        components: {
            CompaniesDatatable,
            PersonsDatatable,
            Navigation
        },
        props: {
            title: String
        }
    }
</script>