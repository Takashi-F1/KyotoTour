console.log("start");
var spot_list = {
    "伏見稲荷大社": 0,
    "清水寺": 1,
    "金閣寺": 2,
    "東寺": 3,
    "南禅寺": 4,
    "三十三間堂": 5,
    "銀閣寺": 6,
    "渡月橋": 7,
    "高台寺": 8,
    "平等院": 9,
    "東福寺": 10,
    "トロッコ嵯峨駅": 11,
    "天龍寺": 12,
    "京都駅ビル": 13,
    "鈴虫寺": 14,
    "元離宮二条城": 15,
    "天橋立": 16,
    "龍安寺": 17,
    "貴船神社": 18,
    "下賀茂神社": 19,
    "北野天満宮": 20,
    "八幡神社": 21,
    "西本願寺": 22,
    "京都駅鉄道博物館": 23,
    "三千院": 24,
    "知恩院": 25,
    "仁和寺": 26,
    "京都御所": 27,
    "建仁寺": 28,
    "鞍馬寺": 29,
    "嵐山公園": 30,
    "平安神宮": 31,
    "京都タワー": 32,
    "竹林の小径": 33
};
console.log(spot_list[1]);
window.onload = function () {
    var spot = document.check_form.spot;
    var n = 34; //選択肢の数
    var spot_index = []; // 観光地の番号を記録.
    var dummy; //仮の変数、意味は特にないダミー
    var cost = [ //観光地間の移動時間
        [0, 17, 37, 14, 25, 10, 29, 28, 22, 33, 8, 46, 41, 13, 37, 21, 107, 35, 51, 27, 31, 18, 16, 18, 51, 19, 35, 23, 16, 48, 38, 21, 15, 41, 16],
        [17, 0, 33, 22, 25, 14, 26, 37, 11, 47, 21, 41, 38, 19, 34, 19, 119, 33, 50, 27, 27, 14, 16, 18, 45, 14, 34, 20, 14, 46, 35, 18, 17, 40, 19],
        [37, 33, 0, 25, 30, 29, 28, 16, 34, 59, 37, 19, 27, 29, 27, 13, 117, 3, 31, 15, 5, 29, 24, 22, 36, 27, 6, 14, 31, 28, 26, 24, 29, 22, 31],
        [14, 22, 25, 0, 27, 12, 29, 26, 17, 34, 12, 27, 28, 9, 24, 17, 107, 25, 48, 27, 24, 16, 7, 7, 52, 18, 28, 19, 16, 43, 26, 20, 11, 30, 12],
        [25, 25, 30, 27, 0, 19, 9, 39, 15, 56, 26, 37, 38, 23, 38, 17, 122, 29, 38, 18, 24, 12, 21, 24, 33, 11, 30, 16, 15, 35, 38, 8, 23, 41, 26],
        [10, 14, 29, 12, 19, 0, 22, 31, 11, 35, 9, 31, 32, 8, 27, 14, 110, 27, 43, 23, 23, 11, 9, 12, 44, 12, 29, 19, 10, 42, 30, 14, 8, 34, 9],
        [29, 26, 28, 29, 9, 22, 0, 40, 18, 52, 29, 40, 42, 27, 42, 20, 125, 28, 36, 18, 23, 15, 25, 28, 32, 14, 30, 16, 18, 34, 40, 10, 28, 43, 29],
        [28, 37, 16, 26, 39, 31, 40, 0, 32, 50, 35, 6, 3, 29, 9, 23, 102, 17, 49, 32, 23, 31, 23, 22, 54, 33, 16, 28, 29, 45, 1, 33, 30, 10, 29],
        [22, 11, 34, 17, 15, 11, 18, 32, 0, 40, 18, 32, 33, 15, 29, 18, 114, 29, 43, 18, 25, 7, 13, 16, 38, 7, 33, 16, 5, 40, 32, 9, 15, 38, 17],
        [33, 47, 59, 34, 56, 35, 52, 50, 40, 0, 33, 56, 57, 36, 52, 45, 112, 60, 77, 52, 55, 42, 35, 39, 74, 44, 59, 51, 40, 73, 54, 46, 34, 59, 37],
        [8, 21, 37, 12, 26, 9, 29, 35, 18, 33, 0, 33, 33, 11, 30, 18, 110, 32, 47, 25, 27, 14, 12, 14, 45, 14, 33, 21, 13, 42, 35, 14, 12, 37, 14],
        [46, 41, 19, 27, 37, 31, 40, 6, 32, 56, 33, 0, 7, 33, 14, 23, 106, 19, 51, 35, 24, 35, 28, 25, 58, 38, 16, 29, 29, 47, 6, 33, 31, 11, 35],
        [41, 38, 27, 28, 38, 32, 42, 3, 33, 57, 33, 7, 0, 35, 14, 25, 106, 19, 51, 35, 25, 37, 29, 26, 58, 38, 17, 30, 29, 47, 3, 34, 30, 10, 33],
        [13, 19, 29, 9, 23, 8, 27, 29, 15, 36, 11, 33, 35, 0, 26, 15, 111, 27, 44, 22, 24, 14, 5, 8, 49, 17, 30, 20, 11, 39, 29, 17, 4, 33, 1],
        [37, 34, 27, 24, 38, 27, 42, 9, 29, 52, 30, 14, 14, 26, 0, 25, 101, 23, 55, 39, 27, 33, 23, 20, 62, 35, 22, 30, 26, 53, 12, 33, 26, 16, 29],
        [21, 19, 13, 17, 17, 14, 20, 23, 18, 45, 18, 23, 25, 15, 25, 0, 111, 14, 33, 15, 10, 15, 11, 14, 38, 16, 15, 7, 13, 29, 24, 12, 14, 24, 15],
        [107, 119, 117, 107, 122, 110, 125, 102, 114, 112, 110, 106, 106, 111, 101, 111, 0, 114, 145, 130, 116, 122, 112, 109, 141, 128, 109, 123, 111, 143, 102, 126, 111, 109, 112],
        [35, 33, 3, 25, 29, 27, 28, 17, 29, 60, 32, 19, 19, 27, 23, 14, 114, 0, 32, 16, 7, 27, 21, 22, 39, 28, 2, 16, 27, 28, 17, 24, 27, 18, 29],
        [51, 50, 31, 48, 38, 43, 36, 49, 43, 77, 47, 51, 51, 44, 55, 33, 145, 32, 0, 24, 32, 37, 39, 43, 23, 39, 34, 29, 40, 10, 50, 35, 42, 50, 47],
        [27, 27, 15, 27, 18, 23, 18, 32, 18, 52, 25, 35, 35, 22, 39, 15, 130, 16, 24, 0, 16, 15, 21, 23, 27, 15, 18, 8, 16, 24, 32, 12, 27, 33, 22],
        [31, 27, 5, 24, 24, 23, 23, 23, 25, 55, 27, 24, 25, 24, 27, 10, 116, 7, 32, 16, 0, 22, 17, 19, 38, 22, 9, 10, 22, 28, 24, 18, 22, 24, 23],
        [18, 14, 29, 16, 12, 11, 15, 31, 7, 42, 14, 35, 37, 14, 33, 15, 122, 27, 37, 15, 22, 0, 15, 17, 36, 3, 29, 13, 4, 36, 31, 5, 16, 38, 15],
        [16, 16, 24, 7, 21, 9, 25, 23, 13, 35, 12, 28, 29, 5, 23, 11, 112, 21, 39, 21, 17, 15, 0, 6, 46, 16, 25, 14, 10, 34, 24, 16, 6, 28, 9],
        [18, 18, 22, 7, 24, 12, 28, 22, 16, 39, 14, 25, 26, 8, 20, 14, 109, 22, 43, 23, 19, 17, 6, 0, 50, 21, 23, 19, 12, 38, 23, 22, 9, 27, 12],
        [51, 45, 36, 52, 33, 44, 32, 54, 38, 74, 45, 58, 58, 49, 62, 38, 141, 39, 23, 27, 38, 36, 46, 50, 0, 36, 39, 30, 37, 20, 55, 32, 46, 56, 48],
        [19, 14, 27, 18, 11, 12, 14, 33, 7, 44, 14, 38, 38, 17, 35, 16, 128, 28, 39, 15, 22, 3, 16, 21, 36, 0, 29, 14, 7, 37, 34, 7, 16, 40, 18],
        [35, 34, 6, 28, 30, 29, 30, 16, 33, 59, 33, 16, 17, 30, 22, 15, 109, 2, 34, 18, 9, 29, 25, 23, 39, 29, 0, 17, 28, 31, 17, 25, 27, 17, 29],
        [23, 20, 14, 19, 16, 19, 16, 28, 16, 51, 21, 29, 30, 20, 30, 7, 123, 16, 29, 8, 10, 13, 14, 19, 30, 14, 17, 0, 13, 27, 29, 9, 17, 30, 16],
        [16, 14, 31, 16, 15, 10, 18, 29, 5, 40, 13, 29, 29, 11, 26, 13, 111, 27, 40, 16, 22, 4, 10, 12, 37, 7, 28, 13, 0, 37, 30, 10, 15, 34, 13],
        [48, 46, 28, 43, 35, 42, 34, 45, 40, 73, 42, 47, 47, 39, 53, 29, 143, 28, 10, 24, 28, 36, 34, 38, 20, 37, 31, 27, 37, 0, 46, 33, 38, 50, 41],
        [38, 35, 26, 26, 38, 30, 40, 1, 32, 54, 35, 6, 3, 29, 12, 24, 102, 17, 50, 32, 24, 31, 24, 23, 55, 34, 17, 29, 30, 46, 0, 34, 30, 10, 32],
        [21, 18, 24, 20, 8, 14, 10, 33, 9, 46, 14, 33, 34, 17, 33, 12, 126, 24, 35, 12, 18, 5, 16, 22, 32, 7, 25, 9, 10, 33, 34, 0, 19, 35, 20],
        [15, 17, 29, 11, 23, 8, 28, 30, 15, 34, 12, 31, 30, 4, 26, 14, 111, 27, 42, 27, 22, 16, 6, 9, 46, 16, 27, 17, 15, 38, 30, 19, 0, 34, 4],
        [41, 40, 22, 30, 41, 34, 43, 10, 38, 59, 37, 11, 10, 33, 16, 24, 109, 18, 50, 33, 24, 38, 28, 27, 56, 40, 17, 30, 34, 50, 10, 35, 34, 0, 35],
        [16, 19, 31, 12, 26, 9, 29, 29, 17, 37, 14, 35, 33, 1, 29, 15, 112, 29, 47, 22, 23, 15, 9, 12, 48, 18, 29, 16, 13, 41, 32, 20, 4, 35, 0]
    ];
    var line = [90, 40, 90, 50, 100, 30, 40, 10, 30, 40, 45, 25, 30, 30, 45, 60, 60, 40, 60, 30, 30, 45, 40, 90, 50, 40, 40, 60, 20, 90, 30, 15, 30, 15]; //各観光地の標準滞在時間

    function count() {  //選択した観光地数を数える
        var num = 0;
        spot_index = [];
        for (var i = 0; i < 34; i++) {
            if (spot[i].checked == true) {
                num++;
                spot_index.push(i);
            }
        }
        document.getElementById("help").innerHTML = "<br>現在" + num + "個選択中です。";
        return num;
    }

    for (var i = 0; i < 34; i++) {
        spot[i].onclick = count;
    }

    function judge() {
        var x = count();
        if (x > 0 && x < 35) {
            return true;
        } else {
            return false;
        }
    }


    function result() {
        var x = judge();
        var startH = 0;
        var startM = 0;
        var startP = 0; // 出発地点の番号
        var lunch = 0;	//12：30（昼食）までに行動できる時間
        var dinner = 0; //17：00までに行動できる時間
        var dum1 = 0;
        var dum2 = 0;
        var co = 0;

        if (x == true) {
            switch (time[0].value) {
                case "07:00":
                    startH = 7;
                    startM = 0;
                    lunch = 330;
                    dinner = 600;
                    break;
                case "07:30":
                    startH = 7;
                    startM = 30;
                    lunch = 300;
                    dinner = 570;
                    break;
                case "08:00":
                    startH = 8;
                    startM = 0;
                    lunch = 270;
                    dinner = 540;
                    break;
                case "08:30":
                    startH = 8;
                    startM = 30;
                    lunch = 240;
                    dinner = 510;
                    break;
                case "09:00":
                    startH = 9;
                    startM = 0;
                    lunch = 210;
                    dinner = 480;
                    break;
                case "09:30":
                    startH = 9;
                    startM = 30;
                    lunch = 180;
                    dinner = 450;
                    break;
                case "10:00":
                    startH = 10;
                    startM = 0;
                    lunch = 150;
                    dinner = 420;
                    break;
                case "10:30":
                    startH = 10;
                    startM = 30;
                    lunch = 120;
                    dinner = 390;
                    break;
                case "11:00":
                    startH = 11;
                    startM = 0;
                    lunch = 90;
                    dinner = 360;
                    break;
                case "11:30":
                    startH = 11;
                    startM = 30;
                    lunch = 60;
                    dinner = 330;
                    break;
                case "12:00":
                    startH = 12;
                    startM = 0;
                    lunch = 100000;
                    dinner = 300;
                    break;
                case "12:30":
                    startH = 12;
                    startM = 30;
                    lunch = 100000;
                    dinner = 270;
                    break;
                case "13:00":
                    startH = 13;
                    startM = 0;
                    lunch = 100000;
                    dinner = 240;
                    break;
                case "13:30":
                    startH = 13;
                    startM = 30;
                    lunch = 100000;
                    dinner = 210;
                    break;
                case "14:00":
                    startH = 14;
                    startM = 0;
                    lunch = 100000;
                    dinner = 180;
                    break;
                case "14:30":
                    startH = 14;
                    startM = 30;
                    lunch = 100000;
                    dinner = 150;
                    break;
                case "15:00":
                    startH = 15;
                    startM = 0;
                    lunch = 100000;
                    dinner = 120;
                    break;


            }

            switch (START[0].value) { //開始場所を取得
                case "伏見稲荷大社":
                    startP = 0;
                    break;
                case "清水寺":
                    startP = 1;
                    break;
                case "金閣寺":
                    startP = 2;
                    break;
                case "東寺":
                    startP = 3;
                    break;
                case "南禅寺":
                    startP = 4;
                    break;
                case "三十三間堂":
                    startP = 5;
                    break;
                case "銀閣寺":
                    startP = 6;
                    break;
                case "渡月橋":
                    startP = 7;
                    break;
                case "高台寺":
                    startP = 8;
                    break;
                case "平等院":
                    startP = 9;
                    break;
                case "東福寺":
                    startP = 10;
                    break;
                case "トロッコ嵯峨駅":
                    startP = 11;
                    break;
                case "天龍寺":
                    startP = 12;
                    break;
                case "京都駅ビル":
                    startP = 13;
                    break;
                case "鈴虫寺":
                    startP = 14;
                    break;
                case "元離宮二条城":
                    startP = 15;
                    break;
                case "天橋立":
                    startP = 16;
                    break;
                case "龍安寺":
                    startP = 17;
                    break;
                case "貴船神社":
                    startP = 18;
                    break;
                case "下鴨神社":
                    startP = 19;
                    break;
                case "北野天満宮":
                    startP = 20;
                    break;
                case "八坂神社":
                    startP = 21;
                    break;
                case "西本願寺":
                    startP = 22;
                    break;
                case "京都鉄道博物館":
                    startP = 23;
                    break;
                case "三千院":
                    startP = 24;
                    break;
                case "知恩院":
                    startP = 25;
                    break;
                case "仁和寺":
                    startP = 26;
                    break;
                case "京都御所":
                    startP = 27;
                    break;
                case "建仁寺":
                    startP = 28;
                    break;
                case "鞍馬寺":
                    startP = 29;
                    break;
                case "嵐山公園":
                    startP = 30;
                    break;
                case "平安神宮":
                    startP = 31;
                    break;
                case "京都タワー":
                    startP = 32;
                    break;
                case "竹林の小径":
                    startP = 33;
                    break;
            }
            var dat = new Date();
            dat.setHours(startH);
            dat.setMinutes(startM);
            dat.setSeconds(0)
            ready(dummy);

            new_route.unshift(startP); //出発地点を設定
            new_route.push(34); //ゴールを京都駅に設定
            now_route.unshift(startP); //出発地点を設定
            now_route.push(34); //到着地点に京都駅を追加
            solve(dummy);
            
            document.getElementById("result").innerHTML = dat.toLocaleString() + "に" + spot[startP].value + "から出発";
            for (var i = 0; i < new_route.length - 2; i++) {
                co += cost[new_route[i]][new_route[i + 1]] + line[new_route[i + 1]]
                if ((co > lunch) && (dum1 == 0)) {
                    dum1 = 1
                    document.getElementById("result").innerHTML += "<p>↓<br>昼休憩!　（約60分） </p>"
                    dat.setMinutes(dat.getMinutes() + 60)
                    document.getElementById("result").innerHTML += " <p>↓<br>＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "へ出発＞ </p>"
                    dat.setMinutes(dat.getMinutes() + cost[new_route[i]][new_route[i + 1]])
                    document.getElementById("result").innerHTML += "<div><p>↓<br>（移動時間：約" + cost[new_route[i]][new_route[i + 1]] + "分）</p> <p>↓<br>　＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "到着＞（標準滞在時間" + line[new_route[i + 1]] + "分） </p>"
                    dat.setMinutes(dat.getMinutes() + line[new_route[i + 1]])
                    document.getElementById("result").innerHTML += " <p>↓<br>＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "出発＞ </p>"
                } else if ((co > dinner) && (dum2 == 0)) {
                    dum2 = 1
                    document.getElementById("result").innerHTML += "<p>↓<br>本日の旅終了！！！ </p><p>↓<br>明日が楽しみ！！だけど～ </p>"
                    dat.setMinutes(dat.getMinutes() + 1020)
                    document.getElementById("result").innerHTML += " <p>↓<br>＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "へ出発＞ </p>"
                    dat.setMinutes(dat.getMinutes() + cost[new_route[i]][new_route[i + 1]])
                    document.getElementById("result").innerHTML += "<div><p>↓<br>（移動時間：約" + cost[new_route[i]][new_route[i + 1]] + "分）</p> <p>↓<br>　＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "到着＞（標準滞在時間" + line[new_route[i + 1]] + "分） </p>"
                    dat.setMinutes(dat.getMinutes() + line[new_route[i + 1]])
                    document.getElementById("result").innerHTML += " <p>↓<br>＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "出発＞ </p>"
                } else {
                    dat.setMinutes(dat.getMinutes() + cost[new_route[i]][new_route[i + 1]])
                    document.getElementById("result").innerHTML += "<div><p>↓<br>（移動時間：約" + cost[new_route[i]][new_route[i + 1]] + "分）</p> <p>↓<br>　＜" + dat.toLocaleString() + "に" + spot[new_route[i + 1]].value + "到着＞（標準滞在時間" + line[new_route[i + 1]] + "分） </p>"
                    dat.setMinutes(dat.getMinutes() + line[new_route[i + 1]])
                    document.getElementById("result").innerHTML += " <p>↓<br>" + dat.toLocaleString() + "に＜" + spot[new_route[i + 1]].value + "出発＞ </p>"
                }

            }

            dat.setMinutes(dat.getMinutes() + cost[new_route[new_route.length - 2]][new_route[new_route.length - 1]])
            document.getElementById("result").innerHTML +=
                "<p>↓<br>（移動時間：約" + cost[new_route[new_route.length - 2]][new_route[new_route.length - 1]] + "分） </p> <p>↓<br>　＜" + dat.toLocaleString() + "に京都駅到着＞ </p></div>";
        } else {
            document.getElementById("result").innerHTML = "選択数が正しくありません、修正してください。";
        }
    }



    output.onclick = result;
    var new_route = [];
    var now_route = [];
    var save = 0;
    var new_sum = 0;
    var now_sum = 0;
    var dum3 = 0;
    function ready(dummy) {
        new_route = [];
        now_route = [];

        for (var i = 0; i < spot_index.length; i++) {
            new_route[i] = spot_index[i];
            now_route[i] = spot_index[i];
        }
    }


    // 局所探索法
    function solve(dummy) {
        var result = 0;
        while (result == 0) { //改善されなくなるまでループ
            new_sum = 0;
            dum3 = 0;
            for (var i = 0; i < new_route.length - 1; i++) {
                var A = new_route[i];
                var B = new_route[i + 1];
                new_sum += cost[A][B]; //最適順路のコスト
            }
            for (var i = 2; i < now_route.length - 1; i++) { //現在のルートの2点を入替える
                for (var j = 1; j < i; j++) {
                    save = now_route[i]; //入替え
                    now_route[i] = now_route[j];
                    now_route[j] = save;
                    now_sum = 0; //初期化
                    for (var k = 0; k < now_route.length - 1; k++) { //入替え後のルートのコストを計算
                        var a = now_route[k];
                        var b = now_route[k + 1];
                        now_sum += cost[a][b];
                    }

                    if (new_sum > now_sum) { //入替えた方が最適な場合
                        for (var l = 0; l < now_route.length; l++) {
                            new_route[l] = now_route[l]; //最適順路を更新
                        }
                        dum3++; //更新事実を記録
                    } else {
                        for (var l = 0; l < now_route.length; l++) { //入替えてもよくならない場合
                            now_route[l] = new_route[l]; //元に戻す
                        }
                    }

                }
                if (dum3 == 0) { //改善されていたらもう一回ループして確認
                    result = 1; //これ以上改善がなければtrueに
                }
            }
        }
    }
};
