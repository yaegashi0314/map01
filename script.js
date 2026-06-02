const riskData = {

    "Japan": {
        level: "レベル1",
        reason: "治安は比較的安定している",
        advice: "基本的な防犯対策を心がける"
    },

    "Australia": {
        level: "レベル1",
        reason: "治安は比較的良好",
        advice: "観光地でのスリに注意する"
    },

    "Canada": {
        level: "レベル1",
        reason: "比較的安全な国",
        advice: "夜間の単独行動を避ける"
    },

    "United States of America": {
        level: "レベル1",
        reason: "観光地は比較的安全",
        advice: "地域ごとの治安情報を確認する"
    },

    "Indonesia": {
        level: "レベル2",
        reason: "一部地域でテロや自然災害のリスクがある",
        advice: "現地の安全情報を事前に確認する"
    },

    "Thailand": {
        level: "レベル2",
        reason: "一部地域で治安上の注意が必要",
        advice: "夜間の単独行動を避ける"
    },

    "Mexico": {
        level: "レベル2",
        reason: "地域によって犯罪発生率が高い",
        advice: "危険地域への立ち入りを避ける"
    },

    "Iraq": {
        level: "レベル3",
        reason: "テロや武力衝突の危険がある",
        advice: "不要不急の渡航を中止する"
    },

    "Yemen": {
        level: "レベル3",
        reason: "情勢が不安定",
        advice: "渡航は慎重に判断する"
    },

    "Afghanistan": {
        level: "レベル4",
        reason: "武力衝突やテロの危険が非常に高い",
        advice: "渡航を避ける"
    },

    "Syria": {
        level: "レベル4",
        reason: "内戦やテロの危険がある",
        advice: "直ちに退避を検討する"
    }

};

const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [20, 20],
    zoom: 1.5
});

map.addControl(new maplibregl.NavigationControl());

map.on("load", () => {

    map.addSource("countries", {
        type: "geojson",
        data: "countries.geojson"
    });

    map.addLayer({
        id: "country-fill",
        type: "fill",
        source: "countries",
        paint: {
            "fill-color": [
                "match",
                ["get", "name"],

                // レベル4
                "Afghanistan", "#ff0000",
                "Syria", "#ff0000",
                "Sudan", "#ff0000",
                "Ukraine", "#ff0000",

                // レベル3
                "Iraq", "#ff8800",
                "Yemen", "#ff8800",
                "Lebanon", "#ff8800",
                "Pakistan", "#ff8800",

                // レベル2
                "Indonesia", "#ffff00",
                "Thailand", "#ffff00",
                "Mexico", "#ffff00",
                "Philippines", "#ffff00",
                "India", "#ffff00",
                "Brazil", "#ffff00",
                "South Africa", "#ffff00",

                // レベル1
                "Japan", "#00cc44",
                "Australia", "#00cc44",
                "Canada", "#00cc44",
                
                "United States of America", "#00cc44",
                "New Zealand", "#00cc44",
                "Norway", "#00cc44",
                "Sweden", "#00cc44",
                "Finland", "#00cc44",
                "Switzerland", "#00cc44",
                "#cccccc"
            ],
            "fill-opacity": 0.7
        }
    });

    map.addLayer({
        id: "country-border",
        type: "line",
        source: "countries",
        paint: {
            "line-color": "#000000",
            "line-width": 0.5
        }
    });

    map.on("click", "country-fill", (e) => {

        const country = e.features[0].properties.name;
        const info = riskData[country];

        let html = `<h3>${country}</h3>`;

        if (info) {
            html += `
                <p><strong>危険度：</strong>${info.level}</p>
                <p><strong>理由：</strong>${info.reason}</p>
                <p><strong>対策：</strong>${info.advice}</p>
            `;
        } else {
            html += `<p>危険度データなし</p>`;
        }

        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);

    });

    map.on("mouseenter", "country-fill", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "country-fill", () => {
        map.getCanvas().style.cursor = "";
    });

});
document.getElementById("searchButton").addEventListener("click", () => {

    const country =
        document.getElementById("countrySearch").value;

    const locations = {

    "Japan": [139.6917, 35.6895],
    "日本": [139.6917, 35.6895],

    "Indonesia": [106.8456, -6.2088],
    "インドネシア": [106.8456, -6.2088],

    "Thailand": [100.5018, 13.7563],
    "タイ": [100.5018, 13.7563],

    "Mexico": [-99.1332, 19.4326],
    "メキシコ": [-99.1332, 19.4326],

    "Iraq": [44.3661, 33.3152],
    "イラク": [44.3661, 33.3152],

    "Yemen": [44.1910, 15.3694],
    "イエメン": [44.1910, 15.3694],

    "Afghanistan": [69.2075, 34.5553],
    "アフガニスタン": [69.2075, 34.5553],

    "Syria": [36.2765, 33.5138],
    "シリア": [36.2765, 33.5138],

    "Australia": [151.2093, -33.8688],
    "オーストラリア": [151.2093, -33.8688],

    "Canada": [-75.6972, 45.4215],
    "カナダ": [-75.6972, 45.4215],

    "United States of America": [-77.0369, 38.9072],
    "United States": [-77.0369, 38.9072],
    "アメリカ": [-77.0369, 38.9072],
    "米国": [-77.0369, 38.9072]

};


    if (locations[country]) {

        map.flyTo({
            center: locations[country],
            zoom: 5
        });

    } else {

        alert("国名が見つかりません");

    }

});
function updateFilter() {

    const show1 =
        document.getElementById("level1").checked;

    const show2 =
        document.getElementById("level2").checked;

    const show3 =
        document.getElementById("level3").checked;

    const show4 =
        document.getElementById("level4").checked;

    map.setPaintProperty(
        "country-fill",
        "fill-opacity",
        [
            "case",

            ["all",
                ["==", ["get", "name"], "Japan"],
                ["!", ["literal", !show1]]
            ], 0.7,

            ["all",
                ["==", ["get", "name"], "Indonesia"],
                ["!", ["literal", !show2]]
            ], 0.7,

            ["all",
                ["==", ["get", "name"], "Iraq"],
                ["!", ["literal", !show3]]
            ], 0.7,

            ["all",
                ["==", ["get", "name"], "Afghanistan"],
                ["!", ["literal", !show4]]
            ], 0.7,

            0
        ]
    );
}