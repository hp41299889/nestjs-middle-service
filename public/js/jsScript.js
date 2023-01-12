const apiUrl = '/MiddleService/JSScript';
const formatOption = { indent_size: 2, space_in_empty_paren: true }
let table;
let datas = {};
let state = '';
let cmScriptDisplay;
let cmModalContent;
let cmModalPackage;
let cmInput;
let cmOutput;

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
  });

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
  codeMirror();
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
          item.scriptPackage = JSON.stringify(item.scriptPackage);
        });
        table.rows.add(data).draw();
      };

      //將資料新增到table上
      table.rows.add(response).draw();
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
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
    const account = sessionStorage.getItem('account');
    sessionStorage.clear();
    sessionStorage.setItem('account', account);
    const children = Array.from($(this).children());
    children.forEach((element, index) => {
      const escaped = escapeHtml(element.innerHTML);
      sessionStorage.setItem(scriptColumns[index].data, escaped);
    });
    $('#edit').addClass('showBtn');
    $('#clone').addClass('showBtn');
    $('#delete').addClass('showBtn');
    $('#script-area').val(sessionStorage.getItem('scriptContent'));
    cmScriptDisplay.setValue(sessionStorage.getItem('scriptContent'));
  });
}
//--

//動態 modal title
function modalTitle() {
  const scriptModal = document.getElementById('scriptModal');

  scriptModal.addEventListener('show.bs.modal', (event) => {
    console.log('showmodal');
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const scriptModalLabel = button.getAttribute('data-bs-title');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const modalTitle = scriptModal.querySelector('.modal-title');

    modalTitle.textContent = `${scriptModalLabel}表單`;

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
  });
}
//--

//edit & clone init
function editCloneInit() {
  $('#scriptName').val(sessionStorage.getItem('scriptName'));
  $('#scriptPackage').val(sessionStorage.getItem('scriptPackage'));
  $('#scriptContent').val(sessionStorage.getItem('scriptContent'));
  cmModalJson.setValue(sessionStorage.getItem('scriptPackage'));
  cmModalScript.setValue(sessionStorage.getItem('scriptContent'));
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
  const scriptPackage = $('#scriptPackage').val();
  const scriptContent = $('#scriptContent').val();
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
  初始化
  init();
}
//--

const createAPI = data => {
  $.ajax({
    url: `${apiUrl}/create/`,
    type: 'POST',
    data: data,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      location.reload();
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
      console.log(response);
      location.reload();
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
};

//初始化
function init() {
  datas = [];
  $('input').val('');
  $('textarea').val('');
  $('form').removeClass('was-validated');
  bootstrap.Modal.getInstance($('#scriptModal')).hide();
}
//--

//刪除Modal開啟時自動帶入資料
function fillInDelModal() {
  const deleteModal = document.getElementById('deleteModal');
  // console.log('deleteModal =', deleteModal);

  deleteModal.addEventListener('show.bs.modal', (event) => {
    console.log('delete');
    $('#scriptIdDel').val(sessionStorage.getItem('scriptID'));
    $('#scriptNameDel').val(sessionStorage.getItem('scriptName'));
  });
}

//table列的刪除
function del() {
  $.ajax({
    url: `${apiUrl}/delete/`,
    type: 'DELETE',
    data: { scriptID: $('#scriptIdDel').val() },
    dataType: 'json',
    success: function (response) {
      console.log(response);
      location.reload();
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

//code mirror
const codeMirror = () => {
  const scriptArea = document.getElementById('script-area');
  const inputArea = document.getElementById('script-input');
  const outputArea = document.getElementById('script-output');
  const modalContent = document.getElementById('modal-content');
  const modalJson = document.getElementById('scriptPackage');
  cmScriptDisplay = CodeMirror.fromTextArea(scriptArea, {
    mode: 'javascript',
    json: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'material-darker'
    // pasteLinesPerSelection: true,
    // lineWrapping: true,
    // lineSeparator: ';',
  });
  cmInput = CodeMirror.fromTextArea(inputArea, {
    mode: 'javascript',
    json: true,
    lineNumbers: true,
    theme: 'cm-input'
  });
  cmOutput = CodeMirror.fromTextArea(outputArea, {
    mode: 'javascript',
    json: true,
    lineNumbers: true,
    theme: 'cm-input',
    readOnly: true
  });
};

const testJS = () => {
  const scriptID = sessionStorage.getItem('scriptID');
  const scriptVersion = sessionStorage.getItem('scriptVersion');
  const input = cmInput.getValue();
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
      cmOutput.setValue(output);
    },
    error: err => {
      console.log('err', err);
    },
  })
};

const escapeHtml = (htmlString) => {
  return htmlString.replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "\'")
    .replace(/&amp;/g, "&");

};