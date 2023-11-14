const testPromise = new Promise((resolve, reject) => {
    let value = 2;

    if(value < 4){
        resolve("value is less than 4")
    }else{
        reject("value is greater than 4")
    }
});

testPromise
.then((result) => {
    console.log("====> ", result);
})
.catch((error) => console.log("error ", error));