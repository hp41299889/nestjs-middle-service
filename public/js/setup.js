const apiUrl = '/MiddleService/Setup';
const authUrl = '/MiddleService/Auth/view'

$(document).ready(async () => {
  enableOptionChoice();
  await readAll();
});

//讀取全部資料(API-010)
const readAll = async () => {
  $.ajax({
    url: `${apiUrl}/read/`,
    type: 'GET',
    dataType: 'json',
    success: async res => {
      try {
        const { status, result } = res;
        if (status != 'success') {
          throw 'status is not success';
        } else {
          const { data } = result;
          const { enableMiddleService, bossQueue, jobQueue, admin, postgreSQL, mongoDB } = data;
          $('#enableMiddleService').val(`${enableMiddleService}`);
          $('#bossRabbitMqIp').val(bossQueue.IP);
          $('#bossRabbitMqPort').val(bossQueue.port);
          $('#bossRabbitMqAccount').val(bossQueue.account);
          $('#bossRabbitMqPassword').val(bossQueue.password);
          $('#bossQueueNameInput').val(bossQueue.inputQueueName);
          $('#bossQueueNameOutput').val(bossQueue.outputQueueName);
          $('#jobRabbitMqIp').val(jobQueue.IP);
          $('#jobRabbitMqPort').val(jobQueue.port);
          $('#jobRabbitMqAccount').val(jobQueue.account);
          $('#jobRabbitMqPassword').val(jobQueue.password);
          $('#jobQueueNameInput').val(jobQueue.inputQueueName);
          $('#jobQueueNameOutput').val(jobQueue.outputQueueName);
          $('#account').val(admin.account);
          $('#password').val(admin.password);
          $('#postgreSqlIp').val(postgreSQL.IP);
          $('#postgreSqlPort').val(postgreSQL.port);
          $('#postgreSqlAccount').val(postgreSQL.account);
          $('#postgreSqlPassword').val(postgreSQL.password);
          $('#postgreSqlDbName').val(postgreSQL.DBName);
          $('#mongoIp').val(mongoDB.IP);
          $('#mongoPort').val(mongoDB.port);
          $('#mongoAccount').val(mongoDB.account);
          $('#mongoPassword').val(mongoDB.password);
          $('#mongoDbName').val(mongoDB.DBName);
        };
      } catch (err) {
        throw err;
      };
    },
    error: async err => {
      console.log('ajax fail', err);
    }
  });
};

//日期區間option動態塞入
function enableOptionChoice() {
  const enableSelect = document.getElementById('enableMiddleService');

  let enableOption = '';
  enableOptions.forEach((element) => {
    enableOption =
      enableOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  enableSelect.innerHTML = enableOption;
}
//--

//SD-API-011
function postgreSqlTest() {
  const ip = $('#postgreSqlIp').val();
  const port = $('#postgreSqlPort').val();
  const account = $('#postgreSqlAccount').val();
  const password = $('#postgreSqlPassword').val();
  const dbName = $('#postgreSqlDbName').val();
  let dataObj = {
    IP: ip,
    port: port,
    account: account,
    password: password,
    DBName: dbName,
  };

  $.ajax({
    url: `${apiUrl}/postgreConnectTest/`,
    type: 'POST',
    data: dataObj,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $('#postgreSuccess').removeClass('d-none');
      $('#postgreFail').addClass('d-none');
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      // alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      $('#postgreFail').removeClass('d-none');
      $('#postgreSuccess').addClass('d-none');
    },
  });
}

//SD-API-012
function mongoTest() {
  const ip = $('#mongoIp').val();
  const port = $('#mongoPort').val();
  const account = $('#mongoAccount').val();
  const password = $('#mongoPassword').val();
  const dbName = $('#mongoDbName').val();
  let dataObj = {
    IP: ip,
    port: port,
    account: account,
    password: password,
    DBName: dbName,
  };

  $.ajax({
    url: `${apiUrl}/mongoConnectTest/`,
    type: 'POST',
    data: dataObj,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $('#mongoSuccess').removeClass('d-none');
      $('#mongoFail').addClass('d-none');
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      // alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      $('#mongoFail').removeClass('d-none');
      $('#mongoSuccess').addClass('d-none');
    },
  });
}

//儲存 SD-API-013
function save() {
  const enableMiddleService = $('#enableMiddleService').val();
  const bossRabbitMqIp = $('#bossRabbitMqIp').val();
  const bossRabbitMqPort = $('#bossRabbitMqPort').val();
  const bossRabbitMqAccount = $('#bossRabbitMqAccount').val();
  const bossRabbitMqPassword = $('#bossRabbitMqPassword').val();
  const bossQueueNameInput = $('#bossQueueNameInput').val();
  const bossQueueNameOutput = $('#bossQueueNameOutput').val();
  const jobRabbitMqIp = $('#jobRabbitMqIp').val();
  const jobRabbitMqPort = $('#jobRabbitMqPort').val();
  const jobRabbitMqAccount = $('#jobRabbitMqAccount').val();
  const jobRabbitMqPassword = $('#jobRabbitMqPassword').val();
  const jobQueueNameInput = $('#jobQueueNameInput').val();
  const jobQueueNameOutput = $('#jobQueueNameOutput').val();
  const account = $('#account').val();
  const password = $('#password').val();
  const postgreSqlIp = $('#postgreSqlIp').val();
  const postgreSqlPort = $('#postgreSqlPort').val();
  const postgreSqlAccount = $('#postgreSqlAccount').val();
  const postgreSqlPassword = $('#postgreSqlPassword').val();
  const postgreSqlDbName = $('#postgreSqlDbName').val();
  const mongoIp = $('#mongoIp').val();
  const mongoPort = $('#mongoPort').val();
  const mongoAccount = $('#mongoAccount').val();
  const mongoPassword = $('#mongoPassword').val();
  const mongoDbName = $('#mongoDbName').val();

  const saveData = {
    enableMiddleService: enableMiddleService,
    bossQueue: {
      IP: bossRabbitMqIp,
      port: bossRabbitMqPort,
      account: bossRabbitMqAccount,
      password: bossRabbitMqPassword,
      inputQueueName: bossQueueNameInput,
      outputQueueName: bossQueueNameOutput
    },
    jobQueue: {
      IP: jobRabbitMqIp,
      port: jobRabbitMqPort,
      account: jobRabbitMqAccount,
      password: jobRabbitMqPassword,
      inputQueueName: jobQueueNameInput,
      outputQueueName: jobQueueNameOutput
    },
    admin: {
      account: account,
      password: password
    },
    postgreSQL: {
      IP: postgreSqlIp,
      port: postgreSqlPort,
      account: postgreSqlAccount,
      password: postgreSqlPassword,
      DBName: postgreSqlDbName
    },
    mongoDB: {
      IP: mongoIp,
      port: mongoPort,
      account: mongoAccount,
      password: mongoPassword,
      DBName: mongoDbName
    }
  }

  $.ajax({
    url: `${apiUrl}/save/`,
    type: 'PATCH',
    data: saveData,
    dataType: 'json',
    success: function (response) {
      console.log(response);

    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      console.log('Error: ', xhr.status + ' ' + xhr.statusText);
      if (xhr) {
        // location.reload();
        setInterval(() => {
          fetch(authUrl)
            .then(res => {
              location.href = res.url;
            })
        }, 500);
      }
    },
  });
}
