<template>
    <v-container>
        <!-- make two rows -->
        <v-row >
            <!-- this row will contain meals and verified totals -->
            <v-col>
                <!-- this col will cotain daily planned meals -->
                <!-- make two rows -->
                <v-card
               >
                    <v-row style="margin: 0px;">
                    <!-- this row will contain a date picker and button changer -->
                        <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <!-- taken out from above
                        :return-value.sync="date" -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="Picker in menu"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            >

                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="datePick(date)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-row>
                    <v-row style="margin: 0px;">
                        <!-- this row will display the meal with a check box attached -->
                        <v-expansion-panels
                        v-model="panel"
                        multiple
                        width="100%"
                        >
                            <v-expansion-panel
                                width="100"
                            >
                                <v-expansion-panel-header>Breakast</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                <!-- checkable table data -->
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="desserts"
                                    :single-select="singleSelect"
                                    item-key="name"
                                   
                                    class="elevation-1"
                                    hide-default-footer
                                >

                                    <template v-slot:top>
                                    </template>
                                </v-data-table>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels
                        v-model="panel"
                        multiple
                        width="100%"
                        >
                            <v-expansion-panel
                                width="100"
                            >
                                <v-expansion-panel-header>Lunch</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                <!-- checkable table data -->
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="dessertsLunch"
                                    :single-select="singleSelect"
                                    item-key="name"      
                                    class="elevation-1"
                                    hide-default-footer
                                >

                                    <template v-slot:top>
                                    </template>
                                </v-data-table>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels
                        v-model="panel"
                        multiple
                        width="100%"
                        >
                            <v-expansion-panel
                                width="100"
                            >
                                <v-expansion-panel-header>Snack</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                <!-- checkable table data -->
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="dessertsSnack"
                                    :single-select="singleSelect"
                                    item-key="name"
                                   
                                    class="elevation-1"
                                    hide-default-footer
                                >

                                    <template v-slot:top>
                                    </template>
                                </v-data-table>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels
                        v-model="panel"
                        multiple
                        width="100%"
                        >
                            <v-expansion-panel
                                width="100"
                            >
                                <v-expansion-panel-header>Dinner</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                <!-- checkable table data -->
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="dessertsDinner"
                                    :single-select="singleSelect"
                                    item-key="name"
                                   
                                    class="elevation-1"
                                    hide-default-footer
                                >

                                    <template v-slot:top>
                                    </template>
                                </v-data-table>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        
                    </v-row>
                </v-card>
            </v-col>
            <!-- <v-col>
              
                <v-sheet>
                    <template>
                            <v-container fluid>
                                <template>
                                    <v-row>
                                    <v-col>
                                        <v-card>
                                        <v-card-title>
                                            <h4>Values</h4>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-list
                                        dense
                                        >
                                            <v-list-item>
                                            <v-list-item-content>Calories:</v-list-item-content>
                                            <v-list-item-content class="align-end">
                                                0
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>Fat:</v-list-item-content>
                                            <v-list-item-content class="align-end">
                                                0
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>Carbs:</v-list-item-content>
                                            <v-list-item-content class="align-end">
                                                0
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-content>Protein:</v-list-item-content>
                                            <v-list-item-content class="align-end">
                                                0
                                            </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                        </v-card>
                                    </v-col>
                                    </v-row>
                                </template>
                            </v-container>
                        </template>
                </v-sheet>
            </v-col> -->
        </v-row>

         <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.firstName}} {{user.lastName}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.role}}</td>
                </tr>
            </tbody>
        </table>

        <v-row style="margin: 20px 0px;">
            <!-- this row will contain  planned totals-->
            <v-card
            width="100%">
                <v-card-title>
                    <h3>Planned Totals</h3>
                </v-card-title>
                <v-row>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>Calories</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>0</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>Protein</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>0</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>Carbs</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>0</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>Fats</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>0</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { doc, getDoc } from "firebase/firestore"; 
import { db as fsdb } from '../fb'
 
 let dataList =  {
           
            panel: [],
            items: ["Breakfast", "Lunch", "Dinner", "Snacks"],
            singleSelect: false,
            selected: [],
            headers: [
            {
                text: 'Dessert (100g serving)',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            ],
            desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 157,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },],
        dessertsLunch:[
                      {
            name: 'Frozen Yogurt',
            calories: 157,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
        ],
        dessertsSnacks:[
                      {
            name: 'Frozen Yogurt',
            calories: 157,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
        ],
        dessertsDinner:[
                      {
            name: 'Frozen Yogurt',
            calories: 157,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
        ],
         
         
        };

  export default {
    methods: {
      // Create an array the length of our items
      // with all values as true
     async  datePick(date) {
        console.log(date)
        const uid = sessionStorage.getItem('uid')
        const infoCol1 = doc(fsdb, "mealPlans",uid,'userMealPlan',date)
        const docSnap2 = await getDoc(infoCol1)
       
        if (docSnap2.exists()) {
            //console.log('exists-->',docSnap2.data().breakfast.iNames)
            console.log('exists-->',docSnap2.data().breakfast.iNames);
            // data.desserts = docSnap2.data().breakfast.iNames;
            // console.log( data.desserts )
            dataList = docSnap2.data();
            console.log("Data" ,dataList);
            var objectA = {
                panel: [],
                items: ["Breakfast", "Lunch", "Dinner", "Snacks"],
                singleSelect: false,
                selected: [],
             headers: [
            {
                text: 'Dessert (100g serving)',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            ],
          desserts: [
          {
            name: [docSnap2.data().breakfast.recipeName].toString(),
            calories: docSnap2.data().breakfast.totalCalories,
            fat: docSnap2.data().breakfast.fatsTotal,
            carbs: docSnap2.data().breakfast.carbTotal,
            protein: docSnap2.data().breakfast.protienTotal,
          },],   
            }
            console.log(objectA);
           this.dataList = objectA
           this.desserts=  [
          {
            name: [docSnap2.data().breakfast.recipeName].toString(),
            calories: docSnap2.data().breakfast.totalCalories,
            fat: docSnap2.data().breakfast.fatsTotal,
            carbs: docSnap2.data().breakfast.carbTotal,
            protein: docSnap2.data().breakfast.protienTotal,
          },]
          this.dessertsLunch=  [
          {
            name: [docSnap2.data().lunch.recipeName].toString(),
            calories: docSnap2.data().lunch.totalCalories,
            fat: docSnap2.data().lunch.fatsTotal,
            carbs: docSnap2.data().lunch.carbTotal,
            protein: docSnap2.data().lunch.protienTotal,
          },]

          this.dessertsDinner=  [
          {
            name: [docSnap2.data().dinner.recipeName].toString(),
            calories: docSnap2.data().dinner.totalCalories,
            fat: docSnap2.data().dinner.fatsTotal,
            carbs: docSnap2.data().dinner.carbTotal,
            protein: docSnap2.data().dinner.protienTotal,
          },]

          this.dessertsSnack=  [
          {
            name: [docSnap2.data().snack.recipeName].toString(),
            calories: docSnap2.data().snack.totalCalories,
            fat: docSnap2.data().snack.fatsTotal,
            carbs: docSnap2.data().snack.carbTotal,
            protein: docSnap2.data().snack.protienTotal,
          },]

          
        }else{
            console.log('No data on given date for this user')
        }
    },
      all () {
        this.panel = [...Array(this.items).keys()].map((k, i) => i)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
    },
    data () {
        console.log(dataList);
      
        return dataList
    },
    
  }
</script>

<style>

</style>