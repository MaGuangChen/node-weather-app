console.log('Starting app');

setTimeout(() => {
    console.log('Inside of call back');
}, 2000);

setTimeout(() => {
    console.log('second set timeout');
}, 0);

console.log('Finishing up');