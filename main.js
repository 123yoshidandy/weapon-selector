async function buttonClick() {
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

    tmp = [];
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

    for (let i = 0; i < weapons.length; i++) {
        let tr = result.insertRow(-1);
        let td = tr.insertCell(-1);
        td.textContent = weapons[i].name;
    }
    // document.getElementById("result").textContent = "スプラシューター";
    // document.getElementById("result").textContent = result;
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