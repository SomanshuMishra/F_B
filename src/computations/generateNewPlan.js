//import { collection, getDocs, query, where, addDoc, doc, setDoc } from "firebase/firestore"
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore"
import { db as fsdb } from '../fb';

export default async function generateNewPlan(){

    // console.log('Start Generation')

}

export async function startGeneration(startingDates, planLengths){

    // console.log('Start Generation')
    const baseNumberStored = await getDataBaseNumber()

    // console.log('storage complete', baseNumberStored)

    if (await baseNumberStored == true){
        var saveDay = false
        // var breakfastData = sessionStorage.getItem('breakfastArray')
        // console.log('stored breakfast data', breakfastData)

        for(var i = 0; i < startingDates.length; i++){
            while (saveDay != true) {
            
                saveDay = await generateDay()
            }

            if(saveDay == true){
                // console.log('grocery date', JSON.parse(sessionStorage.getItem('groceryDate')))
                // console.log('starting date', startingDates[i])
                // console.log('length', planLengths[i])
                // console.log('breakfast', JSON.parse(sessionStorage.getItem('breakfastItem')))
                // console.log('breakfast serving size', JSON.parse(sessionStorage.getItem('breakfastServingSize')))
                // console.log('lunch', JSON.parse(sessionStorage.getItem('lunchItem')))
                // console.log('lunch serving size', JSON.parse(sessionStorage.getItem('lunchServingSize')))
                // console.log('dinner', JSON.parse(sessionStorage.getItem('dinnerItem')))
                // console.log('dinner serving size', JSON.parse(sessionStorage.getItem('dinnerServingSize')))
                // console.log('snack', JSON.parse(sessionStorage.getItem('snackItem')))
                // console.log('snack serving size', JSON.parse(sessionStorage.getItem('snackServingSize')))

                const uid = sessionStorage.getItem('userID');

                const planData = {
                    uid: uid,
                    startingDate: startingDates[i],
                    planLength: planLengths[i],
                    breakfast: JSON.parse(sessionStorage.getItem('breakfastItem')),
                    breakfastServingSize: JSON.parse(sessionStorage.getItem('breakfastServingSize')),
                    lunch: JSON.parse(sessionStorage.getItem('lunchItem')),
                    lunchServingSize: JSON.parse(sessionStorage.getItem('lunchServingSize')),
                    dinner: JSON.parse(sessionStorage.getItem('dinnerItem')),
                    dinnerServingSize: JSON.parse(sessionStorage.getItem('dinnerServingSize')),
                    snack: JSON.parse(sessionStorage.getItem('snackItem')),
                    snackServingSize: JSON.parse(sessionStorage.getItem('snackServingSize')),
                    groceryDate: JSON.parse(sessionStorage.getItem('groceryDate')),
                }
                
                var startingDate = await startingDates[i]

                // const recipeRef = collection(fsdb, "recipeInfo");
                await setDoc(doc(fsdb, 'mealPlans', uid),{
                    uid: uid
                }).then(()=>{
                    setDoc(doc(fsdb, 'mealPlans', uid, 'userMealPlan', startingDate), planData)
                })
                //await addDoc(doc(fsdb, 'mealPlans', uid, 'userMealPlan'), planData);
                // const newDoc = await addDoc(docRef, docData)

            }else{
                console.log('error')
            }
            
            console.log('while loop broken')
        }
    }
    
    console.log('outside of if statement')
    //make the length of the arrays
    //make a serving size random number
    //make a random number between 

}

export async function getDataBaseNumber(){
    const recipeRef = collection(fsdb, "recipeInfo");
    
    var breakfastData
    var lunchData
    var dinnerData
    var snackData

    for(var i = 0; i < 4; i++){
        switch (i) {
            case 0:{
                
                const breafastQ = query(recipeRef, where("isBreakfast", "==", "Breakfast"))

                // console.log(await breafastQ)
                
                const { docs } = await getDocs(breafastQ)

                breakfastData = docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                }))

                
                
                break;}
            case 1:{
            
                const lunchQ = query(recipeRef, where("isLunch", "==", "Lunch"))

                // console.log(await lunchQ)
                
                const { docs } = await getDocs(lunchQ)

                lunchData = docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                }))

                
                
                break;}
            case 2:{
        
                const dinnerQ = query(recipeRef, where("isDinner", "==", "Dinner"))

                // console.log(await dinnerQ)
                
                const { docs } = await getDocs(dinnerQ)

                dinnerData = docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                }))
                
                break;}
            case 3:{
    
                const snackQ = query(recipeRef, where("isSnack", "==", "Snack"))

                // console.log(await snackQ)
                
                const { docs } = await getDocs(snackQ)

                snackData = docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                }))

                
                
                break;}
            default:{
                // console.log('other')
                break;}
        }
    }

    // console.log('breakfast data: ',await breakfastData)
    // console.log('lunch data: ',await lunchData)
    // console.log('dinner data: ',await dinnerData)
    // console.log('snack data: ',await snackData)
    
    //pass to local data 
    sessionStorage.setItem('breakfastArray', JSON.stringify(await breakfastData))
    sessionStorage.setItem('lunchArray', JSON.stringify(await lunchData))
    sessionStorage.setItem('dinnerArray', JSON.stringify(await dinnerData))
    sessionStorage.setItem('snackArray', JSON.stringify(await snackData))
    
    if ( await breakfastData != null && await lunchData != null && await dinnerData != null && await snackData != null){
        return true
    }else{
        return false
    }
}

async function generateDay(){
    var saveDay = false

    //get user nutritional values
    var userCal = parseFloat(sessionStorage.getItem('calorieTarget')) 
    var userProtein = parseFloat(sessionStorage.getItem('protienGrams'))
    var userFats = parseFloat(sessionStorage.getItem('fatGrams'))
    //var userCarbs = sessionStorage.getItem('carbsGrams')

    //make and upper and lower varience
    var limitCal = (userCal * 0.025)
    var userCalUpper = userCal + limitCal
    var userCalLower = userCal - 100

    //set the current meal plan values to 0
    var planCal = 0
    var planProtein = 0
    var planFats = 0
    // var planCarbs = 0

    //get all the meal type arrays
    var breakfastArray = JSON.parse(sessionStorage.getItem('breakfastArray'))
    var lunchArray = JSON.parse(sessionStorage.getItem('lunchArray'))
    var dinnerArray = JSON.parse(sessionStorage.getItem('dinnerArray'))
    var snackArray = JSON.parse(sessionStorage.getItem('snackArray'))

    //find the length of each array
    var breakfastLength = breakfastArray.length
    var lunchLength = lunchArray.length
    var dinnerLength = dinnerArray.length
    var snackLength = snackArray.length

    //set checks states
    var meetsCal = false
    var meetsProtein = false
    var meetsFats = false
    //var meetsCarbs = false

    //get a random meal for each meal type
    var breakfastMeal = (getRandomIntInclusive(0, breakfastLength - 1))
    var lunchMeal = (getRandomIntInclusive(0, lunchLength - 1))
    var dinnerMeal = (getRandomIntInclusive(0, dinnerLength - 1))
    var snackMeal = (getRandomIntInclusive(0, snackLength - 1))

    //get a random serving size for each meal
    var breakfastServingSize = (getRandomIntInclusive(2, 6) * .25)
    var lunchServingSize = (getRandomIntInclusive(2, 6) * .25)
    var dinnerServingSize = (getRandomIntInclusive(2, 6) * .25)
    var snackServingSize = (getRandomIntInclusive(2, 8) * .25)

    //now read the random meal and it values
    var breakfastItem = breakfastArray[breakfastMeal]
    planCal = ( breakfastItem.totalCalories * breakfastServingSize ) + planCal
    planProtein = ( breakfastItem.protienTotal * breakfastServingSize ) + planProtein
    planFats = ( breakfastItem.fatsTotal * breakfastServingSize ) + planFats
    // planCarbs = ( breakfastItem.carbTotal * breakfastServingSize ) + planCarbs
    sessionStorage.setItem('breakfastItem', JSON.stringify(await breakfastItem))
    sessionStorage.setItem('breakfastServingSize', JSON.stringify(await breakfastServingSize))

    var lunchItem = lunchArray[lunchMeal]
    planCal = ( lunchItem.totalCalories * lunchServingSize ) + planCal
    planProtein = ( lunchItem.protienTotal * lunchServingSize ) + planProtein
    planFats = ( lunchItem.fatsTotal * lunchServingSize ) + planFats
    // planCarbs = ( lunchItem.carbTotal * lunchServingSize ) + planCarbs
    sessionStorage.setItem('lunchItem', JSON.stringify(await lunchItem))
    sessionStorage.setItem('lunchServingSize', JSON.stringify(await lunchServingSize))


    var dinnerItem = dinnerArray[dinnerMeal]
    planCal = ( dinnerItem.totalCalories * dinnerServingSize ) + planCal
    planProtein = ( dinnerItem.protienTotal * dinnerServingSize ) + planProtein
    planFats = ( dinnerItem.fatsTotal * dinnerServingSize ) + planFats
    // planCarbs = ( dinnerItem.carbTotal * dinnerServingSize ) + planCarbs
    sessionStorage.setItem('dinnerItem', JSON.stringify(await dinnerItem))
    sessionStorage.setItem('dinnerServingSize', JSON.stringify(await dinnerServingSize))


    var snackItem = snackArray[snackMeal]
    planCal = ( snackItem.totalCalories * snackServingSize ) + planCal
    planProtein = ( snackItem.protienTotal * snackServingSize ) + planProtein
    planFats = ( snackItem.fatsTotal * snackServingSize ) + planFats
    // planCarbs = ( snackItem.carbTotal * snackServingSize ) + planCarbs
    sessionStorage.setItem('snackItem', JSON.stringify(await snackItem))
    sessionStorage.setItem('snackServingSize', JSON.stringify(await snackServingSize))

    //print out the totals
    // console.log('total cal', planCal)
    // console.log('total protein', planProtein)
    // console.log('user protein', userProtein)
    // console.log('total fats', planFats)
    // console.log('total carbs', planCarbs)

    //run status checks
    if( userCalUpper > planCal  && planCal > userCalLower){
        // console.log('meets calorie targets')
        meetsCal = true
    }else{
        meetsCal = false
    }

    if( planProtein > userProtein ){
        // console.log('meets protein target')
        meetsProtein = true
    }else{
        meetsProtein = false
    }

    if( planFats > userFats ){
        // console.log('meets fats target')
        meetsFats = true
    }else{
        meetsFats = false
    }


    if ( meetsCal && meetsProtein && meetsFats){
        // console.log('requirements are meet')
        saveDay = true
    }else{
        saveDay = false
    }
    return saveDay
}

function getRandomIntInclusive(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}