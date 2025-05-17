function filterByType() {
    const selectedType = document.querySelector('input[name="typeOption"]:checked').value;
    const rows = document.querySelectorAll("#optionTableBody tr");

    rows.forEach(row => {
        if (selectedType === "all") {
            row.style.display = "";
        } else if (row.classList.contains(selectedType)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    handlePreApplicantChange();
}

function handlePreApplicantChange() {
    const isPreApplicant = document.querySelector('input[name="preApplicant"]:checked').value === "yes";
    const selectedType = document.querySelector('input[name="typeOption"]:checked').value;

    if (isPreApplicant) {
        // 현재 선택된 타입과 preAircon을 동시에 만족하는 행을 찾아서 선택
        const matchingAirconRow = Array.from(document.querySelectorAll("tr.preAircon"))
            .find(row => selectedType === "all" || row.classList.contains(selectedType));

        if (matchingAirconRow) {
            const input = matchingAirconRow.querySelector('input[type="radio"]');
            input.checked = true;
        }
    }
}

function onPreApplicantChange() {
    handlePreApplicantChange();
    calculateTotal();
    calculate();
}

function onOptionChange() {
    calculateTotal();
    calculate();
}

function calculateTotal() {
    const rows = document.querySelectorAll("#optionTableBody tr");
    const isPreApplicant = document.querySelector('input[name="preApplicant"]:checked').value === "yes";
    let total = 0;

    rows.forEach(row => {
        const input = row.querySelector("input[type='checkbox'], input[type='radio']");
        if (!input) return;

        let priceCell = row.cells[3];
        let originalPrice = parseInt(priceCell.textContent.replace(/,/g, ""), 10);

        let price = originalPrice;

        // 사전청약자일 경우 특정 에어컨 항목은 0원 처리
        if (isPreApplicant && row.classList.contains("preAircon")) {
            price = 0;
        }

        if (input.checked) {
            total += price;
            row.classList.add("table-success");
        } else {
            row.classList.remove("table-success");
        }
    });

    document.getElementById("totalCell").textContent = total.toLocaleString();
    saveToLocal();
}

function resetOptions() {
    document.querySelectorAll("#optionTableBody input[type='checkbox'], #optionTableBody input[type='radio']").forEach(input => {
        input.checked = false;
    });
    // 에어컨 "선택안함" 기본 선택 (첫 번째 radio)
    const airconRadios = document.querySelectorAll("input[name='airconOption']");
    if (airconRadios.length) airconRadios[0].checked = true;
    onOptionChange();
}

function toggleOptionArea() {
    const area = document.getElementById('optionArea');
    const optionsBtn = document.getElementById('optionToggle');
    if (area.style.display === 'none') {
        optionsBtn.textContent = '옵션 접기'
        area.style.display = '';
    } else {
        optionsBtn.textContent = '옵션 펼치기'
        area.style.display = 'none';
    }
}

function selectRoomTypeRadio(type) {
    if (type === 'A') {
        document.getElementById('typeA').checked = true;
    } else if (type === 'B') {
        document.getElementById('typeB').checked = true;
    } else if (type === 'C') {
        document.getElementById('typeC').checked = true;
    } else {
        document.getElementById('typeAll').checked = true;
    }
    filterByType();
}

const amountTable = [
    // 103동 2,3호 / 104동 1,2호
    {
        dongs: [103], hos: [2,3], 
        floors: { 1: 639800000, 2: 661700000, 3: 676200000, 4: 690800000, 기준층: 727200000 }
    },
    {
        dongs: [104], hos: [1,2], 
        floors: { 1: 639800000, 2: 661700000, 3: 676200000, 4: 690800000, 기준층: 727200000 }
    },
    // 103동 6호 / 104동 3,5호
    {
        dongs: [103], hos: [6], 
        floors: { 1: 649500000, 2: 671700000, 3: 686500000, 4: 701200000, 기준층: 738200000 }
    },
    {
        dongs: [104], hos: [3], 
        floors: { 1: 649500000, 2: 671700000, 3: 686500000, 4: 701200000, 기준층: 738200000 }
    },
    {
        dongs: [104], hos: [5], 
        floors: { 1: 649500000, 2: 661700000, 3: 686500000, 4: 701200000, 기준층: 738200000 }
    },
    // 101,2동 2,3호 / 105동 1,3,5,6호 / 106,8동 2,5,6호 / 107동 1,2,5,6호
    {
        dongs: [101,102], hos: [2,3],
        floors: { 1: 642500000, 2: 664400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [105], hos: [1,5,6],
        floors: { 1: 642500000, 2: 664400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [105], hos: [3],
        floors: { 1: 642500000, 2: 654400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [106], hos: [2,5,6],
        floors: { 1: 642500000, 2: 664400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [108], hos: [5,6],
        floors: { 1: 642500000, 2: 664400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [108], hos: [2],
        floors: { 1: 642500000, 2: 654400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    {
        dongs: [107], hos: [1,2,5,6],
        floors: { 1: 642500000, 2: 664400000, 3: 679000000, 4: 693600000, 기준층: 730200000 }
    },
    // 101,2동 6호
    {
        dongs: [101], hos: [6],
        floors: { 1: 642300000, 2: 664300000, 3: 689300000, 4: 704100000, 기준층: 741200000 }
    },
    {
        dongs: [101], hos: [2],
        floors: { 1: 652100000, 2: 674400000, 3: 689300000, 4: 704100000, 기준층: 741200000 }
    },
    {
        dongs: [102], hos: [2,6],
        floors: { 1: 652100000, 2: 674400000, 3: 689300000, 4: 704100000, 기준층: 741200000 }
    },
    // 103동 5호
    {
        dongs: [103], hos: [5],
        floors: { 1: 649700000, 2: 671900000, 3: 686700000, 4: 701500000, 기준층: 738400000 }
    },
    // 101,2동 5호 / 105동 2호 / 106,7,8동 3호
    {
        dongs: [102], hos: [5],
        floors: { 1: 652300000, 2: 674600000, 3: 689500000, 4: 704300000, 기준층: 741400000 }
    },
    {
        dongs: [101], hos: [5],
        floors: { 1: 652300000, 2: 664500000, 3: 689500000, 4: 704300000, 기준층: 741400000 }
    },
    {
        dongs: [105], hos: [2],
        floors: { 1: 642500000, 2: 664500000, 3: 689500000, 4: 704300000, 기준층: 741400000 }
    },
    {
        dongs: [108], hos: [3],
        floors: { 1: 642500000, 2: 664500000, 3: 689500000, 4: 704300000, 기준층: 741400000 }
    },
    {
        dongs: [106,107], hos: [3],
        floors: { 1: 652300000, 2: 674600000, 3: 689500000, 4: 704300000, 기준층: 741400000 }
    },
    // 103동 1호
    {
        dongs: [103], hos: [1],
        floors: { 1: 620300000, 2: 641500000, 3: 655600000, 4: 669800000, 기준층: 705100000 }
    },
    // 101,2동 1호 / 106,8동 1,7호 / 107동 7호
    {
        dongs: [101,102], hos: [1],
        floors: { 1: 623000000, 2: 644300000, 3: 658400000, 4: 672600000, 기준층: 708100000 }
    },
    {
        dongs: [106], hos: [1,7],
        floors: { 1: 623000000, 2: 644300000, 3: 658400000, 4: 672600000, 기준층: 708100000 }
    },
    {
        dongs: [108], hos: [1],
        floors: { 1: 634600000, 2: 634300000, 3: 658400000, 4: 672600000, 기준층: 708100000 }
    },
    {
        dongs: [108], hos: [7],
        floors: { 1: 623000000, 2: 644300000, 3: 658400000, 4: 672600000, 기준층: 708100000 }
    },
    {
        dongs: [107], hos: [7],
        floors: { 1: 623000000, 2: 644300000, 3: 658400000, 4: 672600000, 기준층: 708100000 }
    },
];

function getAmount(dong, hosu) {
    const hosuStr = hosu.toString();
    if (hosuStr.length < 2) return null;
    const ho = parseInt(hosuStr.slice(-1), 10);
    const floor = parseInt(hosuStr.slice(0, hosuStr.length - 1), 10);
    const 기준층 = 5;

    for (const row of amountTable) {
        if (row.dongs.includes(Number(dong)) && row.hos.includes(Number(ho))) {
        if (floor >= 기준층 && row.floors["기준층"]) {
            return row.floors["기준층"];
        }
        if (row.floors[floor]) {
            return row.floors[floor];
        }
        }
    }
    return null;
}

function formatAmount(amount) {
    return amount.toLocaleString('ko-KR');
}

function getRoomType(dong, hosu) {
    const cType = [
        [101, 1], [102, 1], [103, 1],
        [106, 1], [106, 7], [107, 7],
        [108, 1]
    ];
    const bType = [
        [101, 5], [102, 5], [103, 5],
        [105, 2], [106, 3], [107, 3], [108, 3]
    ];
    dong = Number(dong);
    hosu = Number(hosu.toString().slice(-1));
    if (cType.some(([d, h]) => d === dong && h === hosu)) {
        return 'C';
    }
    if (bType.some(([d, h]) => d === dong && h === hosu)) {
        return 'B';
    }
    return 'A';
}

function getExpandFee(type) {
    if (type === 'A') return 8960000;
    if (type === 'B') return 9760000;
    if (type === 'C') return 10770000;
    return 0;
}

function calculate() {
    const dong = document.getElementById('dong').value;
    const hosu = document.getElementById('hosu').value;
    const resultDiv = document.getElementById('result');

    if (!dong || !hosu) {
        resultDiv.textContent = '동과 호수를 모두 입력해 주세요.';
        return;
    }

    const amount = getAmount(dong, hosu);
    const roomType = getRoomType(dong, hosu);
    selectRoomTypeRadio(roomType);

    // 각 분할 항목별 변수 초기화
    let 분양계약금1 = 0, 분양계약금2 = 0, 분양중도금1 = 0, 분양중도금2 = 0, 분양잔금 = 0;
    let 확장계약금 = 0, 확장중도금 = 0, 확장잔금 = 0;
    let 옵션계약금 = 0, 옵션중도금 = 0, 옵션잔금 = 0;

    if (amount) {
        let html = `<strong>분양가 (${formatAmount(amount)} 원)</strong><br>`;

        // 사전청약자 여부
        const isPreApplicant = document.querySelector('input[name="preApplicant"]:checked')?.value === "yes";
        let split = {};
        let keys = [];

        if (isPreApplicant) {
            // 사전청약자: 계약금1(10), 계약금2(0), 중도금1(30), 중도금2(30), 잔금(30)
            분양계약금1 = Math.round(amount * 0.10);
            분양중도금1 = Math.round(amount * 0.30);
            분양중도금2 = Math.round(amount * 0.30);
            분양잔금 = amount - 분양계약금1 - 분양중도금1 - 분양중도금2;
            split = {
                "계약금 1회 (10%)": 분양계약금1,
                "계약금 2회 (10%)": 0,
                "중도금 1회 (30%)": 분양중도금1,
                "중도금 2회 (30%)": 분양중도금2,
                "잔금 (30%)": 분양잔금,
            };
            keys = Object.keys(split);
        } else {
            // 일반: 계약금1(10), 계약금2(10), 중도금1(30), 중도금2(30), 잔금(20)
            분양계약금1 = Math.round(amount * 0.10);
            분양계약금2 = Math.round(amount * 0.10);
            분양중도금1 = Math.round(amount * 0.30);
            분양중도금2 = Math.round(amount * 0.30);
            분양잔금 = amount - (분양계약금1 + 분양계약금2 + 분양중도금1 + 분양중도금2);
            split = {
                "계약금 1회 (10%)": 분양계약금1,
                "계약금 2회 (10%)": 분양계약금2,
                "중도금 1회 (30%)": 분양중도금1,
                "중도금 2회 (30%)": 분양중도금2,
                "잔금 (20%)": 분양잔금,
            };
            keys = Object.keys(split);
        }

        let table = `<table class="table table-bordered mt-2" style="max-width:360px"><tbody>`;
        let sum = 0;
        for (const key of keys) {
            table += `<tr><td>${key}</td><td style="text-align:right">${formatAmount(split[key])} 원</td></tr>`;
            sum += split[key];
        }
        table += `<tr style="background:#eef;"><td colspan="2"><b>합계: ${formatAmount(sum)} 원</b></td></tr>`;
        table += `</tbody></table>`;

        // 확장비
        const expand = getExpandFee(roomType);
        let expandTable = '';
        if (expand > 0) {
            확장계약금 = Math.round(expand * 0.10);
            확장중도금 = Math.round(expand * 0.10);
            확장잔금 = expand - 확장계약금 - 확장중도금;
            expandTable = `
                <div class="mt-3 mb-1"><b>확장비 (${formatAmount(expand)} 원)</b></div>
                <table class="table table-bordered" style="max-width:360px">
                    <tbody>
                        <tr><td>계약금 (10%)</td><td style="text-align:right">${formatAmount(확장계약금)} 원</td></tr>
                        <tr><td>중도금 (10%)</td><td style="text-align:right">${formatAmount(확장중도금)} 원</td></tr>
                        <tr><td>잔금 (80%)</td><td style="text-align:right">${formatAmount(확장잔금)} 원</td></tr>
                        <tr style="background:#eef;"><td colspan="2"><b>합계: ${formatAmount(expand)} 원</b></td></tr>
                    </tbody>
                </table>
            `;
        }

        // 옵션 금액
        let optionTable = '';
        const totalCell = document.getElementById('totalCell');
        let optionValue = 0;
        if (totalCell) {
            optionValue = parseInt(totalCell.textContent.replace(/,/g, ''), 10) || 0;
        }
        if (optionValue > 0) {
            옵션계약금 = Math.round(optionValue * 0.10);
            옵션중도금 = Math.round(optionValue * 0.10);
            옵션잔금 = optionValue - 옵션계약금 - 옵션중도금;
            optionTable = `
                <div class="mt-3 mb-1"><b>옵션 (${formatAmount(optionValue)} 원)</b></div>
                <table class="table table-bordered" style="max-width:360px">
                    <tbody>
                        <tr><td>계약금 (10%)</td><td style="text-align:right">${formatAmount(옵션계약금)} 원</td></tr>
                        <tr><td>중도금 (10%)</td><td style="text-align:right">${formatAmount(옵션중도금)} 원</td></tr>
                        <tr><td>잔금 (80%)</td><td style="text-align:right">${formatAmount(옵션잔금)} 원</td></tr>
                        <tr style="background:#eef;"><td colspan="2"><b>합계: ${formatAmount(optionValue)} 원</b></td></tr>
                    </tbody>
                </table>
            `;
        }

        // === 행별(계약금1, 계약금2, 중도1, 중도2, 잔금) 합계 ===
        let rowSumTable = `
            <div class="mt-4"><b>일정별 납부 금액</b></div>
            <table class="table table-bordered" style="max-width:360px">
                <tbody>
                    <tr>
                        <td>계약금 1회 (계약 시)</td>
                        <td style="text-align:right">
                            ${formatAmount(분양계약금1 + 확장계약금 + 옵션계약금)} 원
                        </td>
                    </tr>
                    <tr>
                        <td>계약금 2회 (계약 후 30일 이내)</td>
                        <td style="text-align:right">
                            ${formatAmount(분양계약금2)} 원
                        </td>
                    </tr>
                    <tr>
                        <td>중도금 1회 (2025.07.15.)</td>
                        <td style="text-align:right">
                            ${formatAmount(분양중도금1 + 확장중도금 + 옵션중도금)} 원
                        </td>
                    </tr>
                    <tr>
                        <td>중도금 2회 (2025.09.15.)</td>
                        <td style="text-align:right">
                            ${formatAmount(분양중도금2)} 원
                        </td>
                    </tr>
                    <tr>
                        <td>잔금 (입주지정일)</td>
                        <td style="text-align:right">
                            ${formatAmount(분양잔금 + 확장잔금 + 옵션잔금)} 원
                        </td>
                    </tr>
                    <tr style="background:#eef;"><td colspan="2"><b>합계: ${formatAmount(분양계약금1 + 확장계약금 + 옵션계약금 + 분양계약금2 + 분양중도금1 + 확장중도금 + 옵션중도금 + 분양중도금2 + 분양잔금 + 확장잔금 + 옵션잔금)} 원</b></td></tr>
                </tbody>
            </table>
        `;

        resultDiv.innerHTML = html + table + expandTable + optionTable + rowSumTable;

    } else {
        resultDiv.textContent = '해당 입력에 대한 금액 정보가 없습니다.';
    }

    saveToLocal();
}

function saveToLocal() {
    // 동/호수
    const dong = document.getElementById('dong').value;
    const hosu = document.getElementById('hosu').value;
    // 옵션(체크/라디오) 선택값
    const options = [];
    document.querySelectorAll("#optionTableBody input").forEach((input, idx) => {
        options.push(input.checked);
    });
    // 타입, 사전청약 여부도 저장
    const type = document.querySelector('input[name="typeOption"]:checked')?.value || '';
    const preApplicant = document.querySelector('input[name="preApplicant"]:checked')?.value || '';
    localStorage.setItem("jeil_calc", JSON.stringify({
        dong, hosu, options, type, preApplicant
    }));
}

function loadFromLocal() {
    const data = localStorage.getItem("jeil_calc");
    if (!data) return;
    const { dong, hosu, options, type, preApplicant } = JSON.parse(data);

    if (dong) document.getElementById('dong').value = dong;
    if (hosu) document.getElementById('hosu').value = hosu;
    if (type) document.getElementById('type' + type).checked = true;
    if (preApplicant) {
        if (preApplicant === "yes") document.getElementById('preYes').checked = true;
        else document.getElementById('preNo').checked = true;
    }
    // 옵션 선택 복원
    if (Array.isArray(options)) {
        document.querySelectorAll("#optionTableBody input").forEach((input, idx) => {
            input.checked = !!options[idx];
        });
    }
    filterByType();
    onPreApplicantChange()
}

window.onload = function() {
    loadFromLocal();
};