async function onSearchButton() {
    weapons = await fetch("weapons.json", {}).then(response => {
        return response.json();
    });

    // フォームの入力情報を取得
    let range = document.getElementById("range").value;
    let kill = document.getElementById("kill").value;
    let ink = document.getElementById("ink").value;

    console.log("range");
    console.log(range);
    console.log("kill");
    console.log(kill);
    console.log("ink");
    console.log(ink);

    let tmp = [];
    for (let i = 0; i < weapons.length; i++) {
        if (range == -1 || weapons[i].range == range) {
            if (kill == -1 || weapons[i].kill == kill) {
                if (ink == -1 || weapons[i].ink == ink) {
                    tmp.push(weapons[i]);
                }
            }
        }
    }
    weapons = tmp;

    arrayShuffle(weapons);

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
    td.textContent = "射程";
    td = tr.insertCell(-1);
    td.textContent = "キル";
    td = tr.insertCell(-1);
    td.textContent = "塗り";

    for (let i = 0; i < weapons.length; i++) {
        tr = result.insertRow(-1);
        td = tr.insertCell(-1);
        td.textContent = i + 1;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].name;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].range;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].kill;
        td = tr.insertCell(-1);
        td.textContent = weapons[i].ink;
    }
}

function arrayShuffle(array) {
    for (let i = (array.length - 1); 0 < i; i--) {
        let r = Math.floor(Math.random() * (i + 1)); // 0〜(i+1)の範囲で値を取得

        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

async function onCreateButton() {
    weapons = await fetch("weapons.json", {}).then(response => {
        return response.json();
    });

    // フォームの入力情報を取得
    let range = document.getElementById("range").value;
    let kill = document.getElementById("kill").value;
    let ink = document.getElementById("ink").value;

    console.log("range");
    console.log(range);
    console.log("kill");
    console.log(kill);
    console.log("ink");
    console.log(ink);

    let team = [weapons[Math.floor(Math.random() * (weapons.length))]];

    let tmp = [];
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].range == 3) {
            tmp.push(weapons[i]);
        }
    }
    team.push(tmp[Math.floor(Math.random() * (tmp.length))]);

    tmp = [];
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].kill == 3) {
            tmp.push(weapons[i]);
        }
    }
    team.push(tmp[Math.floor(Math.random() * (tmp.length))]);

    tmp = [];
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].ink == 3) {
            tmp.push(weapons[i]);
        }
    }
    team.push(tmp[Math.floor(Math.random() * (tmp.length))]);

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
        td.textContent = team[i].range;
        td = tr.insertCell(-1);
        td.textContent = team[i].kill;
        td = tr.insertCell(-1);
        td.textContent = team[i].ink;
    }
}