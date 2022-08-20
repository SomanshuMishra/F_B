import { doc, getDoc,getDocs,collection,query } from "firebase/firestore"; 
import { db as fsdb } from '../fb'

export async function storeUserDataLocal(uid){
    readFromDB(uid);
    console.log('after read and store');
}

export async function clearHistory(){
    console.log('clearing previous data');
    sessionStorage.setItem('userID', '');
    sessionStorage.setItem('activeDaysPerWeek', 0);
    sessionStorage.setItem('calorieTarget', 0);
    sessionStorage.setItem('carbsGrams', 0);
    sessionStorage.setItem('carbsRatio', 0);
    sessionStorage.setItem('fatGrams', 0);
    sessionStorage.setItem('fatRatio', 0);
    sessionStorage.setItem('goal', "");
    sessionStorage.setItem('heightF', 0);
    sessionStorage.setItem('maintenceTarget', 0);
    sessionStorage.setItem('protienGrams', 0);
    sessionStorage.setItem('proteinRatio', 0);
    sessionStorage.setItem('sex', "");
    sessionStorage.setItem('weightLb', 0);
    sessionStorage.setItem('age', 0);
    sessionStorage.setItem('isAdmin', false);
    sessionStorage.setItem('isInvestor', false);
}

export default function storeUsersInfo(){
    console.log('wrong function called');
}

async function readFromDB(uid){
    console.log('storing user data locally');
    console.log(uid);
    const docRef = doc(fsdb, 'userData', uid);
    const infoDoc = doc(fsdb, 'userInfo', uid);
    const infoCol = query(collection(fsdb, "mealPlans",'8PXKw6RPwgd5TSO0CAj2H4Eec7I2','userMealPlan'))
    console.log(docRef);
    //there is an uncaught (in promise) error here
    const docSnap = await getDoc(docRef);
    const docSnap1 = await getDocs(infoCol);
    var c = []
    docSnap1.forEach((x) => {
        console.log('Hello')
        console.log(x.id)
        // const infoCol1 = query(collection(fsdb, "mealPlans",'8PXKw6RPwgd5TSO0CAj2H4Eec7I2','userMealPlan',x.id))
        // const docSnap2 = getDocs(infoCol1)
        c.push(x.id)

    })

    for (let i=0; i<c.length; i++) {
        console.log(c[0])
        const infoCol1 = doc(fsdb, "mealPlans",'8PXKw6RPwgd5TSO0CAj2H4Eec7I2','userMealPlan','2022-08-20')
        const docSnap2 = await getDoc(infoCol1)

        if (docSnap2.exists()) {
            console.log('exists-->',docSnap2.data())
        }
    }
    

    console.log(docSnap);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        sessionStorage.setItem('userID', uid);
        sessionStorage.setItem('activeDaysPerWeek', docSnap.data().activeDaysPerWeek);
        sessionStorage.setItem('calorieTarget', docSnap.data().calorieTarget);
        sessionStorage.setItem('carbsGrams', docSnap.data().carbsGrams);
        sessionStorage.setItem('carbsRatio', docSnap.data().carbsRatio);
        sessionStorage.setItem('fatGrams', docSnap.data().fatGrams);
        sessionStorage.setItem('fatRatio', docSnap.data().fatRatio);
        sessionStorage.setItem('goal', docSnap.data().goal);
        sessionStorage.setItem('heightF', docSnap.data().heightF);
        sessionStorage.setItem('maintenceTarget', docSnap.data().maintenceTarget);
        sessionStorage.setItem('protienGrams', docSnap.data().protienGrams);
        sessionStorage.setItem('proteinRatio', docSnap.data().proteinRatio);
        sessionStorage.setItem('sex', docSnap.data().sex);
        sessionStorage.setItem('weightLb', docSnap.data().weightLb);
        sessionStorage.setItem('age', docSnap.data().age);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    const docInfoSnap = await getDoc(infoDoc);
    console.log(docInfoSnap);
    // if(docSnap1.exists()) {
    //     console.log('Usermeal is here -->')
    // }else{
    //     console.log('No user meal')
    // }
    // })
    if (docInfoSnap.exists()) {
        console.log("Document two data:", docInfoSnap.data());
        // console.log('storeing more');
        sessionStorage.setItem('isAdmin', docInfoSnap.data().staff);
        sessionStorage.setItem('isInvestor', docInfoSnap.data().investor);
        // this.show(false)
        
        
    }else{
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}