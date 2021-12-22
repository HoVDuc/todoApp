let data = [];
const hello = document.querySelector('#hello');

function start() {
    getData(renderData);
}
start();
let i = null;


function getData(callback) {
    fetch('http://localhost:8000/api/todos')
    .then(response => response.json())
    .then(callback)
}


function renderData(data) {
    var htmls = data.map(function (data) {
        return `
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-12 col-md-10">${data.task}</div>
                <div class="col-12 col-md-1">
                    <div class="row justify-content-end">
                        <div class="btn-group">
                            <button class="btn btn-danger" onclick="del('${data._id}')">
                                <span class="fa fa-trash fa-lg"></span>
                            </button>
                            <button class="btn btn-success" onclick="updateS('${data._id}', '${data.task}')">
                                <span class="fa fa-edit fa-lg"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
        </div>`
    });
    hello.innerHTML = htmls.join('');
}

const addData = (data, callback) => {
    var formData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:8000/api/todo/create', formData) 
        .then(res => res.json())
        .then(alert('Success'))
}

const del = (id) => {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    alert(id)
    fetch('http://localhost:8000/api/todo/'+id+'/delete', options)
        .then(res => res.json())
        .then(alert('OK'))
}

const updateS = (id, task) => {
    document.querySelector("input[name='task']").value = task;
    document.querySelector("#btnThem").innerText = "Sửa";
    i = id;
    // alert(i)
}

const update = (id, form) => {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    console.log(options)
    fetch('http://localhost:8000/api/todo/'+id+'/update', options)
        .then(res => res.json())
        .then(alert('OK'))
}

const add = () => {
    var taskName = document.querySelector('input[name="task"]').value;
    var formData = {
        task: taskName
    }

    if(document.querySelector('#btnThem').innerText == "Thêm") {
        addData(formData);
    } else {
        update(i, formData);
    }
}