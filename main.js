async function onSearchButton() {

    // ブキデータファイルの読み込み
    let text = await fetch("weapons.csv", {}).then(response => {
        return response.text();
    });
    let lines = text.split("\r\n");
    let weapons = [];
    let columns = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
        let tmp = lines[i].split(",");
        weapons.push({});
        for (let j = 0; j < columns.length; j++) {
            weapons[i - 1][columns[j]] = tmp[j];
        }
    }

    // フォームの入力情報を取得
    let category = document.getElementById("category").value;
    let range = document.getElementById("range").value;
    let kill = document.getElementById("kill").value;
    let ink = document.getElementById("ink").value;

    console.log("category");
    console.log(category);
    console.log("range");
    console.log(range);
    console.log("kill");
    console.log(kill);
    console.log("ink");
    console.log(ink);

    let tmp = [];
    for (let i = 0; i < weapons.length; i++) {
        if (category == -1 || weapons[i].category == category) {
            if (range == -1 || weapons[i].range == range) {
                if (kill == -1 || weapons[i].kill == kill) {
                    if (ink == -1 || weapons[i].ink == ink) {
                        tmp.push(weapons[i]);
                    }
                }
            }
        }
    }
    weapons = tmp;

    // 結果表示
    let result = document.getElementById("result");

    while (result.rows.length > 0) {
        result.deleteRow(-1);
    }

    let tr = result.insertRow(-1);
    let td = tr.insertCell(-1);
    td = tr.insertCell(-1);
    td.textContent = "ブキ";
    td = tr.insertCell(-1);
    td.textContent = "サブ";
    td = tr.insertCell(-1);
    td.textContent = "スペシャル";
    td = tr.insertCell(-1);
    td.textContent = "射程";
    td = tr.insertCell(-1);
    td.textContent = "キル";
    td = tr.insertCell(-1);
    td.textContent = "塗り";

    let colorId = Math.floor(Math.random() * (weapons.length));
    for (let i = 0; i < weapons.length; i++) {
        tr = result.insertRow(-1);
        td = tr.insertCell(-1);
        td.textContent = i + 1;
        if (i == colorId) {
            td.style.backgroundColor = "#ff4444";
        }

        td = tr.insertCell(-1);
        td.textContent = weapons[i].name;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].sub;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].special;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].range;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].kill;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].ink;
    }
}

async function onCreateButton() {

    // ブキデータファイルの読み込み
    let text = await fetch("weapons.csv", {}).then(response => {
        return response.text();
    });
    let lines = text.split("\n");
    let weapons = [];
    let columns = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
        let tmp = lines[i].split(",");
        weapons.push({});
        for (let j = 0; j < columns.length; j++) {
            weapons[i - 1][columns[j]] = tmp[j];
        }
    }

    // フォームの入力情報を取得
    let pattern = document.getElementById("pattern").value;
    let long = document.getElementById("long").value;

    console.log("pattern");
    console.log(pattern);
    console.log("long");
    console.log(long);

    if (pattern == -1) {
        pattern = ["3221", "3211", "2221", "2211"][Math.floor(Math.random() * 4)]
    }

    let team = [];
    for (let i = 0; i < 4; i++) {
        r = pattern[i];

        let tmp = [];
        for (let j = 0; j < weapons.length; j++) {

            // ブキ重複チェック
            if (document.getElementById('duplicate_main').checked) {
                let isDuplicated = false;
                for (let t = 0; t < i; t++) {
                    if (team[t].main == weapons[j].main) {
                        isDuplicated = true; // ピック済に同じメインのブキがあれば重複フラグを立てる
                    }
                }
                if (isDuplicated) {
                    continue;
                }
            }

            // ブキカテゴリ重複チェック
            if (document.getElementById('duplicate_category').checked) {
                if (weapons[j].category != "シューター" && weapons[j].category != "マニューバー") { // シューターおよびマニューバーは重複しても良い
                    let isDuplicated = false;
                    for (let t = 0; t < i; t++) {
                        if (team[t].category == weapons[j].category) {
                            isDuplicated = true; // ピック済に同カテゴリのブキがあれば重複フラグを立てる
                        }
                    }
                    if (isDuplicated) {
                        continue;
                    }
                }
            }

            // 弱塗りブキ重複チェック
            if (document.getElementById('duplicate_weak_ink').checked) {
                if (weapons[j].ink == 1) { // 弱塗りブキならば
                    let isDuplicated = false;
                    for (let t = 0; t < i; t++) {
                        if (team[t].ink == 1) {
                            isDuplicated = true; // ピック済に塗りが弱いブキがあれば重複フラグを立てる
                        }
                    }
                    if (isDuplicated) {
                        continue;
                    }
                }
            }

            // サブ重複チェック
            if (document.getElementById('duplicate_sub').checked) {
                let isDuplicated = false;
                for (let t = 0; t < i; t++) {
                    if (team[t].sub == weapons[j].sub) {
                        isDuplicated = true; // ピック済に同じサブのブキがあれば重複フラグを立てる
                    }
                }
                if (isDuplicated) {
                    continue;
                }
            }

            // スペシャル重複チェック
            if (document.getElementById('duplicate_special').checked) {
                let isDuplicated = false;
                for (let t = 0; t < i; t++) {
                    if (team[t].special == weapons[j].special) {
                        isDuplicated = true; // ピック済に同じスペシャルのブキがあれば重複フラグを立てる
                    }
                }
                if (isDuplicated) {
                    continue;
                }
            }

            // ブキの抽出
            if (weapons[j].range == r) { // 同射程ならば
                if (pattern[i] != "3") { // 中短射程ならば
                    tmp.push(weapons[j]);
                } else { // 長射程ならば
                    if (long == "-1" || weapons[j].category == long) { // 長射程の指定カテゴリならば
                        tmp.push(weapons[j]);
                    }
                }
            }
        }
        team.push(tmp[Math.floor(Math.random() * (tmp.length))]); // 候補群からランダムにピック
    }

    // 結果表示
    let result = document.getElementById("result");

    while (result.rows.length > 0) {
        result.deleteRow(-1);
    }

    let tr = result.insertRow(-1);
    let td = tr.insertCell(-1);
    td = tr.insertCell(-1);
    td.textContent = "ブキ";
    td = tr.insertCell(-1);
    td.textContent = "サブ";
    td = tr.insertCell(-1);
    td.textContent = "スペシャル";
    td = tr.insertCell(-1);
    td.textContent = "射程";
    td = tr.insertCell(-1);
    td.textContent = "キル";
    td = tr.insertCell(-1);
    td.textContent = "塗り";

    for (let i = 0; i < team.length; i++) {
        tr = result.insertRow(-1);
        td = tr.insertCell(-1);
        td.textContent = i + 1;
        td = tr.insertCell(-1);
        td.textContent = team[i].name;
        td = tr.insertCell(-1);
        td.textContent = team[i].sub;
        td = tr.insertCell(-1);
        td.textContent = team[i].special;
        td = tr.insertCell(-1);
        td.textContent = team[i].range;
        td = tr.insertCell(-1);
        td.textContent = team[i].kill;
        td = tr.insertCell(-1);
        td.textContent = team[i].ink;
    }
}