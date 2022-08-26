<template>
    <v-container>
         <!-- <NavBarAndHeader/> -->
        <!-- Divide the screen into two rows -->
        <v-row>
            <!-- This first row will be divied into two colombs -->
            <!-- user a data table -->
            <v-col>
                <!-- this first col will display the users targets -->
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Macronutrient
                        </th>
                        <th class="text-left">
                            Maintainace Target
                        </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in targets"
                        :key="item.name"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.maintainace }}</td>

                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col>
                <!-- this second col will display the calendar <v-date-picker
        v-model="date1"
        :events="arrayEvents"
        event-color="green lighten-1"
      ></v-date-picker> -->
               <template>
               <v-date-picker
        v-model="date2"
        :events="functionEvents"
        event-color="date => date[9] % 2 ? 'red' : 'yellow'"
      ></v-date-picker>

            

            
      </template>
            </v-col>
        </v-row>
        <!-- the second row will also divied into two cols -->
        <v-row>
            <v-col>
                <!-- this first col will display the user data and history -->
                <template>
                    <v-sheet
                    class="mx-auto text-center"
                    color="grey"
                    max-width="600"
                    >
                        <v-card-text>
                            <v-sheet color="grey lighter-2">
                                <!-- <v-sparkline
                                :value="weights"
                                color="white"
                                smooth>
                                    <template v-slot: label="weight">
                                        ${{ weight.weights}}
                                    </template>
                                </v-sparkline> -->
                            </v-sheet>
                        </v-card-text>
                        <v-card-text>
                            <div>User Progress Coming Soon</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            block
                            text>
                                See All Data
                            </v-btn>
                        </v-card-actions>
                    </v-sheet>
                </template>
            </v-col>

        </v-row>
            
    
    </v-container>
</template>

<script>
        console.log('hyyyy-->',sessionStorage.getItem('maintenceTarget'));
        const maint = sessionStorage.getItem('maintenceTarget');
    export default {
        data: () =>({
            arrayEvents: [],
            arrayEvents1:[],
            arrayEvents2:[],
            date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), 
            maintainace:sessionStorage.getItem('maintenceTarget'),
            headers: [
                {text: 'Macronutrient',align: 'start',sortable: false,value: 'name',},
                {text: 'Maintainace Target', value: 'maintainace'},
                {text: 'Plan Targets', value: 'planned' },
            ],
            targets:[

                {name: 'Energy (Calories)', maintainace: maint,},

            ],
            focus:'',
            type: 'month',
            typeToLable:{
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['yellow', 'green'],
            names: ['grocery day', 'planned meals'],
            weights: [152,153,150,152,154,154,155],
            dayCarousel:[
                {slideHeading:"Breakfast", color:"grey"},
                {slideHeading:"Lunch", color:"white"},
                {slideHeading:"Dinner", color:"grey"},
                {slideHeading:"Snacks", color:"white"},
            ],
        }),
        mounted(){
            console.log('Hello')
            const mealDates1 = sessionStorage.getItem('mealDates')
            const groceryDate1 = sessionStorage.getItem('groceryDate')
            console.log('mealDates1-->',mealDates1)    
            console.log('groceryDate1-->',groceryDate1)    
            var m = mealDates1.split(',')  
            var g = groceryDate1.split(',')
            console.log('g-->',g)  
        for (let i = 0; i < m.length; i++) {
            this.arrayEvents.push(m[i])
            this.arrayEvents1.push(parseInt(m[i][8]+m[i][9]))
            console.log('typeof-->',parseInt(m[i][8]+m[i][9]))
        }
        for (let j = 0; j < g.length; j++) {
            // this.arrayEvents.push(m[i])
            console.log(g[j][8]+g[j][9])
            this.arrayEvents2.push(parseInt(g[j][8]+g[j][9]))
            // console.log('typeof-->',parseInt(m[i][8]+m[i][9]))
        }
        console.log('this.arrayEvents-->',this.arrayEvents)
        console.log('this.arrayEvents1->',this.arrayEvents1)
        console.log('this.arrayEvents2->',this.arrayEvents2)
        },
        methods:{
            functionEvents (date) {

            const [,, day] = date.split('-')
            if (this.arrayEvents1.includes(parseInt(day, 10))) return ['green' ]
            if (this.arrayEvents2.includes(parseInt(day, 10))) return ['yellow']
            return false
        
      },
            viewDay ({ date }){
                this.focus = date
                this.type = 'day'
            },
            getEventColor (event){
                return event.color
            },
            setToday(){
                this.focus = ''
            },
            prev (){
                this.$refs.calendar.prev()
            },
            next (){
                this.$refs.calendar.next()
            },
            showEvent({ nativeEvent, event}){
                const open = () =>{
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
                }

                if (this.selectedOpen){
                    this.selectedOpen = false
                    requestAnimationFrame(() => requestAnimationFrame(() => open()))
                }else{
                    open()
                }

                nativeEvent.stopPropagation()
            },
            updateRange({ start, end }){
                const events = []

                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T23:59:59`)
                const days = (max.getTime() - min.getTime()) / 86400000
                const eventCount = this.rnd(days, days + 20)

                for(let i = 0; i < eventCount; i++){
                    const allDay = this.rnd(0,3) === 0
                    const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                    const secondTimeStamp = this.rnd(2, allDay ? 288 : 8) * 900000
                    const second = new Date(first.getTime() + secondTimeStamp)

                    events.push({
                        name: this.names[this.rnd(0, this.names.length - 1)],
                        start: first,
                        end: second,
                        color: this.colors[this.rnd(0, this.colors.length - 1)],
                        timed: !allDay
                    })
                }

                this.events = events
            },
            rnd (a, b){
                return Math.floor((b -a + 1) * Math.random()) + a
            },
        },
    }
</script>