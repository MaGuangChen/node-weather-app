// 這樣的例子是同步運作的callback範例
const getUser = (id, callback) => {
    const user = {
        id,
        name: 'kobe',
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
    
};

// 第二個參數callback function只會在找到user後執行
getUser('1', (userObject) => {
    console.log(userObject);
});