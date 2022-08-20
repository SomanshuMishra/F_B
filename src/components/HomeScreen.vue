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
                        <th class="text-left">
                            Plan Targets
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
                        <td>{{ item.planned }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col>
                <!-- this second col will display the calendar -->
                <template>
                    <v-row class="fill-height">
                        <v-col>
                            <v-sheet height="64"
                            elevation="0">
                                <v-toolbar>
                                    <!-- Set up button for today -->
                                    <v-btn outlined
                                    class="mr-4"
                                    color="grey darken-2"
                                    @click="setToday">
                                        Today
                                    </v-btn>
                                    <!-- Set up return back to dates -->
                                    <v-btn
                                    fab
                                    text
                                    small
                                    color="grey darken-2"
                                    @click="prev">
                                        <v-icon small>
                                            mdi-chevron-left
                                        </v-icon>
                                    </v-btn>
                                    <!-- Set up advance to dates -->
                                    <v-btn
                                    fab
                                    text
                                    small
                                    color="grey darken-2"
                                    @click="next">
                                        <v-icon small>
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-btn>
                                    <!-- Here is the title of the calendar based on the displayed month-->
                                    <v-toolbar-title v-if="$refs.calendar">
                                        {{ $refs.calendar.title }}
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <!-- Set up a click menu that allows for you to click and change the calendar range -->
                                    <template>
                                        <div class="text-center">
                                            <v-menu 
                                            offset-y
                                            bottom
                                            right>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                        outlined
                                                        color="grey darken-2"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        >
                                                            <span>{{ typeToLable[type] }}</span>
                                                            <v-icon right>
                                                                mdi-menu-down
                                                            </v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item @click="type = 'day'">
                                                        <v-list-item-title>Day</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item @click="type = 'week'">
                                                        <v-list-item-title>Week</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item @click="type = 'month'">
                                                        <v-list-item-title>Month</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item @click="type = '4day'">
                                                        <v-list-item-title>4 Day</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </div>
                                    </template>
                                </v-toolbar>
                            </v-sheet>
                            <!-- Set up the actual calendar, so start with a sheet -->
                            <v-sheet height="300">
                                <v-calendar
                                ref="calendar"
                                v-model="focus"
                                color="primary"
                                :events="events"
                                :event-color="getEventColor"
                                :type="type"
                                @click:event="showEvent"
                                @click:more="viewDay"
                                @click:date="viewDay"
                                @change="updateRange">
                                </v-calendar>
                                <!-- Get a menu when ever you click on an even -->
                            </v-sheet>
                        </v-col>
                    </v-row>
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
            <v-col>
                <!-- this second col will display the meals for selected day on a carousel-->
                <v-carousel
                cycle
                height="200"
                hide-delimiter-background>
                    <v-carousel-item v-for="(slide, i) in dayCarousel"
                    :key="i">
                        <v-sheet
                        :color="slide.color"
                        height="100%">
                            <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                                <div>
                                    {{slide.slideHeading}}
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
            
    
    </v-container>
</template>

<script>
    export default {
        data: () =>({
            headers: [
                {text: 'Macronutrient',align: 'start',sortable: false,value: 'name',},
                {text: 'Maintainace Target', value: 'maintainace'},
                {text: 'Plan Targets', value: 'planned' },
            ],
            targets:[
                {name: 'Energy (Calories)', maintainace: 159, planned: 6.0,},
                {name: 'Protein (g)', maintainace: 237, planned: 9.0,},
                {name: 'Fat (g)', maintainace: 262, planned: 16.0,},
                {name: 'Carbs(g)', maintainace: 305, planned: 3.7,},
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
            this.$refs.calendar.checkChange()
        },
        methods:{
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