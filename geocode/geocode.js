const request = require('request');// http request的套件

const geocodeAddress = (address, callback) => {
    // encodeURIComponent可以將一般字串轉為encode類型
    // %201301%20lombard%20street%20philadelphia
    const encodeAddress = encodeURIComponent(address);

    // 此套件第一個參數為option object
    // 第二個參數為一call back function
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
        json: true,// 這邊告訴http我們要JSON
    }, (error, response, body) => {
        // 因為在上面所輸入的json true
        // 在下面的body已經變為js了
        // body指的是整個網頁的檔案或元素像是document之類的
        // 所以說我們希望看到整個資料檔案，而不是js object時
        // 我們用JSON.stringify來將body變回JSON
        // 第二個argument我們不常使用，先設undefined
        // 第三個argument是轉出的JSON data的格式定義
        // 也就是指定在縮進中有多少空間
        if(error){
            callback('Unable to connect to Google server.');
        }
        else if(body.status === 'ZERO_RESULTS' || 
            body.status === "OVER_QUERY_LIMIT"
        ) {
            callback('Unable to connect to Google server.');
        }
        else if(body.status === 'OK') {
            const data = body.results[0];
            const location = data.geometry.location;
            // callback method中第一個參數為err，因為沒有err的關係
            // 所以設為undefined
            callback(undefined, {
                address: `${data.formatted_address}`,
                latitude: `${location.lat}`,
                longtitude: `${location.lng}`
            });
        }
    
});

// body不是http request中特有的
// body就是http的一部分 hyper text transfer protocol
// 當我們向某個網站發出請求時，例如貼上網址
// 印在screen上的就是body啦，所以說html檔案是讓browser知道
// 如何render body的一種檔案
// 而在只有JSON檔案的時候,body則是json檔案的內容
// 無論怎麼說body都是從server傳回的core data

// 而response則是整個回傳回來的data，這時候body會是一個
// object其中再包含內容，同時在response中會有statusCode
// statusCode有200, 404, 500 .....等,代表著狀態
// response中還有一個header object，內容是有關於我們的
// node server向google api server請求，google api server
// 回傳data的相關資訊與內容
// response中另外也有一個request object，內容包含
// 像是query host等等跟http request相關的資訊
// 在request下方，則有一個header是我們自己的header
// 也就是從node sent 去google api的


// error則是在錯誤發生時才會有值，若沒有則是null
}

module.exports.geocodeAddress = geocodeAddress;