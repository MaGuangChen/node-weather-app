// 建立一個新的異步Promise
// promise要求一個參數，也就是一個function
// 其中function為call back function並有兩個參數
// 一個為成功的resolve一個為失敗的reject
// 只能有一個resolve以及一個reject
// 執行時也只會有resolve或reject其中一個結果出現
// 也就是說call back function不會被叫到一次以上
// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('hey two second late');
//         reject('unable to fullfill promise');
//     }, 2000);
//     resolve('Hey it worked');
// });

// somePromise
// .then(
//     message => console.log('Success: ', message), 
//     err => console.log('Failed: ', err)
// );

const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            } else reject('Argument type must be number');
        }, 1000);
    })
}

asyncAdd(1, 3)
.then(
    res => asyncAdd(res, 30),
    // 如果在這邊叫出err則會往下一個then走，因為在執行完
    // err function時會被認為已經執行成功了
    // 因此如果輸入型別不為number造成err時候會沒有res
    // 下一個.then會印出
    // res should be 34 : undefined
    // 因此我們用catch來做處理
    // err => console.log(err) 
)
.then(
    res => console.log('res should be 34 : ', res),
    // err => console.log(err)
)
.catch(err => console.log(err));