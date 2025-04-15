let seekSequence = [];
let chart;

function runAlgorithm() {
    let algorithm = document.getElementById("algorithm").value;
    let head = parseInt(document.getElementById("head").value);
    let requests = document.getElementById("requests").value.split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));
    let diskSize = parseInt(document.getElementById("diskSize").value);
    let direction = document.getElementById("direction").value;

    if (isNaN(head) || requests.length === 0 || isNaN(diskSize)) {
        document.getElementById("results").innerText = "⚠️ Please enter valid inputs!";
        document.getElementById("avgSeekTime").innerText = "";
        document.getElementById("throughput").innerText = "";
        return;
    }
    let seekTime = 0;
    seekSequence = [];

    switch (algorithm) {
        case "FCFS":
            seekTime = fcfs(head, requests);
            break;
        case "SSTF":
            seekTime = sstf(head, requests);
            break;
        case "SCAN":
            seekTime = scan(head, requests, diskSize, direction);
            break;
        case "CSCAN":
            seekTime = cscan(head, requests, diskSize);
            break;
        case "LOOK":
            seekTime = look(head, requests, direction);
            break;
        case "CLOOK":
            seekTime = clook(head, requests);
            break;
    }
    updateGraph();
    let avgSeekTime = requests.length > 0 ? seekTime / requests.length : 0;
    let throughput = seekTime > 0 ? requests.length / seekTime : 0;

    document.getElementById("results").innerHTML = `<b>Seek Sequence:</b> ${seekSequence.join(" → ")}<br><b>Total Seek Time:</b> ${seekTime}`;
    document.getElementById("avgSeekTime").innerHTML = `<b>Average Seek Time:</b> ${avgSeekTime.toFixed(2)}`;
    document.getElementById("throughput").innerHTML = `<b>System Throughput:</b> ${throughput.toFixed(2)}`;
}

function updateGraph() {
    let ctx = document.getElementById('seekChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: seekSequence.map((_, i) => i + 1),
            datasets: [{
                label: 'Disk Head Movement',
                data: seekSequence,
                borderColor: 'gold',
                backgroundColor: 'rgba(255, 223, 91, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Step' } },
                y: { title: { display: true, text: 'Disk Position' } }
            }
        }
    });
}
 
function fcfs(head, requests) {
    let seekTime = 0;
    let prev = head;
    seekSequence = [head, ...requests];

    for (let i = 0; i < requests.length; i++) {
        seekTime += Math.abs(requests[i] - prev);
        prev = requests[i];
    }

    return seekTime;
}

 
function sstf(head, requests) {
    let seekTime = 0;
    let current = head;
    let remaining = [...requests];
    seekSequence.push(head);
    while (remaining.length > 0) {
        let closest = remaining.reduce((prev, curr) => 
            Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
        );
        seekTime += Math.abs(closest - current);
        current = closest;
        seekSequence.push(current);
        remaining.splice(remaining.indexOf(closest), 1);
    }
    return seekTime;
}
function scan(head, requests, diskSize, direction) {
    let seekTimSe = 0;
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    if (direction === "left") {
        seekSequence = [head, ...left.reverse(), 0, ...right];
        seekTime = Math.abs(head - 0) + Math.abs(right[right.length - 1] - 0);
    } else {
        seekSequence = [head, ...right, diskSize - 1, ...left.reverse()];
        seekTime = Math.abs(diskSize - 1 - head) + Math.abs(left[0] - 0);
    }

    return seekTime;
}

 
function cscan(head, requests, diskSize) {
    let seekTime = 0;
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    seekSequence = [head, ...right, diskSize - 1, 0, ...left];
    seekTime = (diskSize - 1 - head) + (diskSize - 1) + left[left.length - 1];

    return seekTime;
}

 
function look(head, requests, direction) {
    let seekTime = 0;
    let left = requests.filter(r => r < head).sort((a, b) => a - b);
    let right = requests.filter(r => r >= head).sort((a, b) => a - b);

    if (direction === "left") {
        seekSequence = [head, ...left.reverse(), ...right];
        seekTime = Math.abs(head - left[0]) + Math.abs(left[0] - right[right.length - 1]);
    } else {
        seekSequence = [head, ...right, ...left.reverse()];
        seekTime = Math.abs(head - right[right.length - 1]) + Math.abs(right[right.length - 1] - left[0]);
    }

    return seekTime;
}

 
function clook(head, requests) {
    let seekTime = 0;
    let sorted = requests.sort((a, b) => a - b);
    let right = sorted.filter(r => r >= head);
    let left = sorted.filter(r => r < head);

    seekSequence = [head, ...right, ...left];
    seekTime = Math.abs(head - right[right.length - 1]) + Math.abs(right[right.length - 1] - left[0]);

    return seekTime;
}
