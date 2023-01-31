const apiUrl = '/MiddleService/JSScript';
const formatOption = { indent_size: 2, space_in_empty_paren: true };
let table;
let datas = {};
let state = '';
let modalScript;
let modalJson;
let scriptDisplay;
let scriptInput;
let scriptOutput;

$(document).ready(function () {
  readAll(); //讀取全部資料

  table = $('#script').DataTable({
    // "lengthChange": false,
    // searching: true,
    pageLength: 10,
    dom: 'Brft<"bottom"lp>',
    buttons: ['excel'],
    columns: scriptColumns,
    scrollX: true,
    autoWidth: false,
    language: {
      paginate: {
        "previous": "上一頁",
        "next": "下一頁",
      },
      lengthMenu: "顯示 _MENU_ 筆",
    }
  });

  // $('#script').addClass('nowrap');
  $('.dt-buttons').addClass('d-none');

  //搜尋框自訂義
  $('#script_filter').hide();

  $('#searchFilter').on('keyup', function () {
    $('#script')
      .DataTable()
      .search($('#searchFilter').val(), false, true)
      .draw();
  });
  //--

  tableRowClick(); //點擊列觸發反藍、按鈕顯示、sessionStoraget儲存
  modalTitle(); //動態 modal title
  fillInDelModal(); //刪除Modal開啟時自動帶入資料
  aceInit();
});

//讀取全部資料(API-005)
function readAll() {
  $.ajax({
    url: `${apiUrl}/readAll/`,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      const { status, result } = response;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        data.map(item => {
          item.createDatetime = moment(item.createDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
          item.lastEditDatetime = moment(item.lastEditDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
          item.scriptPackage = item.scriptPackage ? JSON.stringify(item.scriptPackage, null, 1) : null;
        });
        table.rows.add(data).draw();
      };
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
}
//--

//點擊列觸發反藍和按鈕顯示、sessionStoraget儲存
function tableRowClick() {
  $('#script tbody').on('click', 'tr', function () {
    const account = sessionStorage.getItem('account');
    sessionStorage.clear();
    sessionStorage.setItem('account', account);
    const children = Array.from($(this).children());
    children.forEach((element, index) => {
      //特殊字元
      // const escaped = escapeHtml(element.innerHTML);
      sessionStorage.setItem(scriptColumns[index].data, element.textContent);
    });
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      scriptDisplay.setValue('');
      $('#edit').removeClass('showBtn');
      $('#clone').removeClass('showBtn');
      $('#delete').removeClass('showBtn');
    } else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      $('#edit').addClass('showBtn');
      $('#clone').addClass('showBtn');
      $('#delete').addClass('showBtn');
      queryAPI(sessionStorage.getItem('scriptID'));
    }
  });
}
//--

//動態 modal title
function modalTitle() {
  const scriptModal = document.getElementById('scriptModal');

  scriptModal.addEventListener('shown.bs.modal', async (event) => {
    init();
    console.log('showmodal');
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const scriptModalLabel = button.getAttribute('data-bs-title');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.

    //打開的表單類別
    const scriptModalWhatever = button.getAttribute('data-bs-whatever');
    state = scriptModalWhatever;
    console.log('*****state', state);
    if (scriptModalWhatever == 'edit') {
      console.log('edit true');
      editCloneInit();
    } else if (scriptModalWhatever == 'clone') {
      console.log('clone true');
      editCloneInit();
    } else {
      //new or other
      console.log('new or other true');
    }

    const modalTitle = scriptModal.querySelector('.modal-title');

    modalTitle.textContent = `${scriptModalLabel}表單`;
  });
}

//--
//edit & clone init
async function editCloneInit() {
  $('#scriptName').val(sessionStorage.getItem('scriptName'));
  modalJson.setValue(js_beautify(sessionStorage.getItem('scriptPackage'), formatOption));
  modalScript.setValue(js_beautify(sessionStorage.getItem('scriptContent'), formatOption));
  modalJson.clearSelection();
  modalScript.clearSelection();
}

//字串拆分
function splitStr(str) {
  let splitArr = [];
  const splitBr = str.split('<br>');
  // console.log('splitBr =', splitBr);
  splitBr.forEach((element, index) => {
    // console.log('element =', element);
    const splitHashtag = element.split('#');
    // console.log('splitHashtag =', splitHashtag);
    const splitSlash = splitHashtag[1].split('/');
    // console.log('splitSlash =', splitSlash);
    splitArr.push(splitSlash);
    // console.log('splitArr =', splitArr);
  });
  return splitArr;
};

//儲存-判斷欄位是否為空、整理資料、呼API(API-001 || API-002)
function save() {
  $('form').addClass('was-validated');
  const scriptName = $('#scriptName').val();
  const scriptPackage = modalJson.getValue();
  const scriptContent = modalScript.getValue();
  const data = {
    scriptName: scriptName,
    scriptContent: scriptContent,
    scriptPackage: scriptPackage ? JSON.parse(scriptPackage) : null
  };
  if (state == 'new' || state == 'clone') {
    createAPI(data);
  } else if (state == 'edit') {
    updateAPI(data);
  };
  // //初始化
  init();
  bootstrap.Modal.getInstance($('#scriptModal')).hide();
}
//--

const createAPI = data => {
  $.ajax({
    url: `${apiUrl}/create/`,
    type: 'POST',
    data: data,
    dataType: 'json',
    success: function (response) {
      const { status, result } = response;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        data.scriptPackage = data.scriptPackage ? JSON.stringify(data.scriptPackage) : '';
        data.createDatetime = moment(data.createDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        data.lastEditDatetime = moment(data.lastEditDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        table.row.add(data).draw();
      };
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
};

const updateAPI = data => {
  const scriptID = sessionStorage.getItem('scriptID');
  data['scriptID'] = scriptID;
  $.ajax({
    url: `${apiUrl}/update/`,
    type: 'PATCH',
    data: data,
    dataType: 'json',
    success: function (response) {
      const { status, result } = response;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        const { scriptID } = data;
        data.createDatetime = moment(data.createDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        data.lastEditDatetime = moment(data.lastEditDatetime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        data.scriptPackage = data.scriptPackage ? JSON.stringify(data.scriptPackage) : '';
        table.row((index, data, node) => {
          return data.scriptID == scriptID ? true : false;
        }).data(data).draw();
        Object.keys(data).forEach(key => {
          sessionStorage.setItem(key, data[key]);
        });
      };
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
};

const queryAPI = data => {
  $.ajax({
    url: `${apiUrl}/query/`,
    type: 'POST',
    data: { scriptID: data },
    dataType: 'json',
    success: res => {
      console.log(res);
      scriptDisplay.setValue(js_beautify(sessionStorage.getItem('scriptContent'), formatOption));
      scriptDisplay.clearSelection();
    },
    error: err => {
      console.log(err);
    }
  })
};

//初始化
function init() {
  datas = [];
  $('form').removeClass('was-validated');
  $('#scriptName').val('');
  modalJson.setValue('');
  modalScript.setValue('');
}
//--

//刪除Modal開啟時自動帶入資料
function fillInDelModal() {
  const deleteModal = document.getElementById('deleteModal');
  // console.log('deleteModal =', deleteModal);

  deleteModal.addEventListener('shown.bs.modal', (event) => {
    console.log('delete');
    $('#scriptIdDel').val(sessionStorage.getItem('scriptID'));
    $('#scriptNameDel').val(sessionStorage.getItem('scriptName'));
  });
}

//table列的刪除
function del() {
  const scriptID = sessionStorage.getItem('scriptID');
  $.ajax({
    url: `${apiUrl}/delete/`,
    type: 'DELETE',
    data: { scriptID: $('#scriptIdDel').val() },
    dataType: 'json',
    success: function (response) {
      console.log(response);
      const { status, result } = response;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        const { affected } = data;
        if (affected == 1) {
          table.row((index, data, node) => {
            return data.scriptID == scriptID ? true : false;
          }).remove().draw();
        };
      };
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });

  initDel();
}

//刪除Modal初始化
function initDel() {
  $('input#scriptIdDel').val('');
  $('input#scriptNameDel').val('');
  bootstrap.Modal.getInstance($('#deleteModal')).hide();
}

//匯出
function exportExcel() {
  $('button.buttons-excel').trigger('click');
}

const aceInit = () => {
  modalScript = ace.edit('modal-script');
  modalJson = ace.edit('modal-json');
  scriptDisplay = ace.edit('script-display');
  scriptInput = ace.edit('script-input');
  scriptOutput = ace.edit('script-output');
  modalScript.setOptions({
    mode: 'ace/mode/javascript',
    theme: 'ace/theme/eclipse',
    useWorker: false,
    fontSize: '16px'
  });
  modalJson.setOptions({
    mode: 'ace/mode/json',
    theme: 'ace/theme/eclipse',
    useWorker: false,
    fontSize: '16px'
  });
  scriptDisplay.setOptions({
    mode: 'ace/mode/javascript',
    theme: 'ace/theme/twilight',
    useWorker: false,
    fontSize: '16px',
    readOnly: true
  });
  scriptInput.setOptions({
    mode: 'ace/mode/json',
    theme: 'ace/theme/eclipse',
    useWorker: false,
    fontSize: '16px'
  });
  scriptOutput.setOptions({
    mode: 'ace/mode/json',
    theme: 'ace/theme/eclipse',
    useWorker: false,
    fontSize: '16px',
    readOnly: true,
  });
};

const testJS = () => {
  const scriptID = sessionStorage.getItem('scriptID');
  const scriptVersion = sessionStorage.getItem('scriptVersion');
  const input = scriptInput.getValue();
  const data = {
    scriptID: scriptID,
    scriptVersion: scriptVersion,
    input: input ? JSON.parse(input) : null
  };

  $.ajax({
    url: `${apiUrl}/test`,
    type: 'POST',
    data: data,
    dataType: 'json',
    success: res => {
      console.log('res', res);
      const response = JSON.stringify(res);
      const output = js_beautify(response, formatOption);
      scriptOutput.setValue(output);
      scriptOutput.clearSelection();
    },
    error: err => {
      console.log('err', err);
    },
  })
};