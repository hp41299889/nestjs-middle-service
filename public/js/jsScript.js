const apiUrl = '/MiddleService/JSScript';
let table;
let datas = {};
let state = '';

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
      sessionStorage.setItem(scriptColumns[index].data, element.innerHTML);
    });
    $('#edit').addClass('showBtn');
    $('#clone').addClass('showBtn');
    $('#delete').addClass('showBtn');
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
  const scriptName = $('#scriptName').val();
  const scriptPackage = $('#scriptPackage').val();
  const scriptContent = $('#scriptContent').val();
  console.log(scriptName, scriptPackage, scriptContent);
  const data = {
    scriptName: scriptName,
    scriptContent: scriptContent,
    scriptPackage: JSON.parse(scriptPackage)
  };
  if (state == 'new' || state == 'clone') {
    createAPI(data);
  } else if (state == 'edit') {
    updateAPI(data);
  };
  //初始化
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
  $('select[name!="script_length"]').val('');
  $('select#scriptType').val('regular');
  $('#regular').removeClass('d-none');
  $('#cycle').addClass('d-none');
  const regularRecordChildren = $('#regularRecord').children();
  for (let i = 0; i < regularRecordChildren.length; i++) {
    const attrId = regularRecordChildren.eq(i).attr('id');
    if (attrId != 'regularTemplate') {
      regularRecordChildren.eq(i).remove();
    }
  }
  const cycleRecordChildren = $('#cycleRecord').children();
  for (let i = 0; i < cycleRecordChildren.length; i++) {
    const attrId = cycleRecordChildren.eq(i).attr('id');
    if (attrId != 'cycleTemplate') {
      cycleRecordChildren.eq(i).remove();
    }
  }
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
