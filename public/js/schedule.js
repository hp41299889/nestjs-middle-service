const apiUrl = '/ScheduleService/Schedule';
let table;
let datas = {};
let state = '';

$(document).ready(function () {
  readAll(); //讀取全部資料

  table = $('#schedule').DataTable({
    // "lengthChange": false,
    // searching: true,
    pageLength: 10,
    dom: 'Brft<"bottom"lp>',
    buttons: ['excel'],
    columns: scheduleColumns,
    scrollX: true,
  });

  $('.dt-buttons').addClass('d-none');

  //搜尋框自訂義
  $('#schedule_filter').hide();

  $('#searchFilter').on('keyup', function () {
    $('#schedule')
      .DataTable()
      .search($('#searchFilter').val(), false, true)
      .draw();
  });
  //--

  tableRowClick(); //點擊列觸發反藍、按鈕顯示、sessionStoraget儲存
  modalTitle(); //動態 modal title
  scheduleTypeOptionChoice(); //排程類型option動態塞入
  scheduleTypeChange(); //依照排程類型選項顯示不同內容
  regularAdd(); //定期排程-新增
  //deleteItem()//定期排程-刪除
  regularWeek(); //定期排程-星期
  regularHour(); //定期排程-小時
  regularMinute(); //定期排程-分鐘
  cycleAdd(); //週期排程-新增
  cycleHour(); //週期排程-小時
  cycleMinute(); //週期排程-分鐘
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
  $('#schedule tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }

    const account = sessionStorage.getItem('account');
    sessionStorage.clear();
    sessionStorage.setItem('account', account);
    // console.log('$(this).children() =', $(this).children());
    const children = Array.from($(this).children());
    // console.log('children =', children);
    children.forEach((element, index) => {
      // console.log('element.innerHTML =', element.innerHTML);
      // console.log('scheduleColumns[index].data =', scheduleColumns[index].data)

      sessionStorage.setItem(scheduleColumns[index].data, element.innerHTML);
    });
    $('#edit').addClass('showBtn');
    $('#clone').addClass('showBtn');
    $('#delete').addClass('showBtn');
  });
}
//--

//動態 modal title
function modalTitle() {
  const scheduleModal = document.getElementById('scheduleModal');

  scheduleModal.addEventListener('show.bs.modal', (event) => {
    console.log('showmodal');
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const scheduleModalLabel = button.getAttribute('data-bs-title');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const modalTitle = scheduleModal.querySelector('.modal-title');

    modalTitle.textContent = `${scheduleModalLabel}表單`;

    //打開的表單類別
    const scheduleModalWhatever = button.getAttribute('data-bs-whatever');
    state = scheduleModalWhatever;
    if (scheduleModalWhatever == 'edit') {
      console.log('edit true');
      editCloneInit();
    } else if (scheduleModalWhatever == 'clone') {
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
  $('#scheduleName').val(sessionStorage.getItem('scheduleName'));
  const typevalue = sessionStorage.getItem('scheduleType');
  $('#scheduleType').val(typevalue);
  if (typevalue == 'regular') {
    $('#cycle').addClass('d-none');
    $('#regular').removeClass('d-none');
    const regularStr = sessionStorage.getItem('regular');
    // console.log('regularStr =', regularStr);
    const splitFinish = splitStr(regularStr);
    // console.log('splitFinish =', splitFinish);
    splitFinish.forEach((element, index) => {
      $('#regularTemplate')
        .clone()
        .appendTo($('#regularRecord'))
        .removeClass('d-none')
        .removeAttr('id');
      element.forEach((item, i) => {
        $('#regularRecord')
          .children()
          .eq(index + 1)
          .children()
          .eq(i)
          .children()
          .eq(1)
          .val(item);
      });
    });
  } else if (typevalue == 'cycle') {
    $('#regular').addClass('d-none');
    $('#cycle').removeClass('d-none');
    const cycleStr = sessionStorage.getItem('cycle');
    // console.log('cycleStr =', cycleStr);
    const splitFinish = splitStr(cycleStr);
    // console.log('splitFinish =', splitFinish);
    splitFinish.forEach((element, index) => {
      $('#cycleTemplate')
        .clone()
        .appendTo($('#cycleRecord'))
        .removeClass('d-none')
        .removeAttr('id');
      element.forEach((item, i) => {
        $('#cycleRecord')
          .children()
          .eq(index + 1)
          .children()
          .eq(i)
          .children()
          .eq(1)
          .val(item);
      });
    });
  }
  $('#MQCLI').val(sessionStorage.getItem('MQCLI'));
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
}
//--

//排程類型option動態塞入
function scheduleTypeOptionChoice() {
  const scheduleTypeSelect = document.getElementById('scheduleType');

  let scheduleTypeOption = '';
  scheduleTypeOptions.forEach((element) => {
    scheduleTypeOption =
      scheduleTypeOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  scheduleTypeSelect.innerHTML = scheduleTypeOption;
}
//--

//依照排程類型選項顯示不同內容
function scheduleTypeChange() {
  $('#scheduleType').change(function () {
    // console.log('this =', this);
    // console.log('this.value =', this.value);
    if (this.value == 'cycle') {
      $('#regular').addClass('d-none');
      $('#cycle').removeClass('d-none');
    } else {
      $('#cycle').addClass('d-none');
      $('#regular').removeClass('d-none');
    }
  });
}
//--

//定期排程-新增
function regularAdd() {
  $('#regularAdd').on('click', function () {
    $('#regularTemplate')
      .clone()
      .appendTo($('#regularRecord'))
      .removeClass('d-none')
      .removeAttr('id');

    $('#regularNoAdd').removeClass('d-block');
  });
}
//--

//定期排程-星期
function regularWeek() {
  const regularWeekSelect = document.getElementById('regularWeek');

  let regularWeekOption = '';

  //空白選項
  // if(regularWeekOption == ""){
  //   regularWeekOption = regularWeekOption+'<option value='+-1+'></option>'
  // }

  regularWeekOptions.forEach((element) => {
    regularWeekOption =
      regularWeekOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  regularWeekSelect.innerHTML = regularWeekOption;
}
//--

//定期排程-小時
function regularHour() {
  const regularHourSelect = document.getElementById('regularHour');

  let regularHourOption = '';

  if (regularHourOption == '') {
    regularHourOption = regularHourOption + '<option value="">0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    regularHourOption =
      regularHourOption + '<option value=' + i + '>' + i + '</option>';
  }

  regularHourSelect.innerHTML = regularHourOption;
}
//--

//定期排程-分鐘
function regularMinute() {
  const regularMinuteSelect = document.getElementById('regularMinute');

  let regularMinuteOption = '';

  if (regularMinuteOption == '') {
    regularMinuteOption =
      regularMinuteOption + '<option value="">0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    regularMinuteOption =
      regularMinuteOption + '<option value=' + i + '>' + i + '</option>';
  }

  regularMinuteSelect.innerHTML = regularMinuteOption;
}
//--

//定期/週期排程-刪除
function deleteItem(e) {
  $(e).parent().parent().remove();

  const hasFormClass = $('form.was-validated');
  if (hasFormClass.length == 1) {
    if ($('#scheduleType').val() == 'regular') {
      if ($('#regularRecord').children().length == 1) {
        $('#regularNoAdd').addClass('d-block');
      }
    } else {
      if ($('#cycleRecord').children().length == 1) {
        $('#cycleNoAdd').addClass('d-block');
      }
    }
  }
}
//--

//週期排程-新增
function cycleAdd() {
  $('#cycleAdd').on('click', function () {
    $('#cycleRecord')
      .find('#cycleTemplate')
      .clone()
      .appendTo($('#cycleRecord'))
      .removeClass('d-none')
      .removeAttr('id');

    $('#cycleNoAdd').removeClass('d-block');
  });
}
//--

//週期排程-小時
function cycleHour() {
  const cycleHourSelect = document.getElementById('cycleHour');

  let cycleHourOption = '';

  if (cycleHourOption == '') {
    cycleHourOption = cycleHourOption + '<option value="">0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    cycleHourOption =
      cycleHourOption + '<option value=' + i + '>' + i + '</option>';
  }

  cycleHourSelect.innerHTML = cycleHourOption;
}
//--

//週期排程-分鐘
function cycleMinute() {
  const cycleMinuteSelect = document.getElementById('cycleMinute');

  let cycleMinuteOption = '';

  if (cycleMinuteOption == '') {
    cycleMinuteOption = cycleMinuteOption + '<option value="">0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    cycleMinuteOption =
      cycleMinuteOption + '<option value=' + i + '>' + i + '</option>';
  }

  cycleMinuteSelect.innerHTML = cycleMinuteOption;
}
//--

//儲存-判斷欄位是否為空、整理資料、呼API(API-001 || API-002)
function save() {
  if (datas != {}) {
    datas = {};
  }
  console.log('save');
  $('form').addClass('was-validated');

  const account = sessionStorage.getItem('account');
  // console.log('account =', account);
  datas['commandSource'] = 'API/' + account;

  const namekey = $('#scheduleName').prop('id');
  const namevalue = $('#scheduleName').val();
  // console.log('key =', namekey);
  // console.log('value =', namevalue);
  if (namevalue != '') {
    datas[namekey] = namevalue;
  } else {
    return false;
  }

  const typekey = $('#scheduleType').prop('id');
  const typevalue = $('#scheduleType').val();
  // console.log('key =', typekey);
  // console.log('value =', typevalue);
  if (typevalue != '') {
    datas[typekey] = typevalue;
  } else {
    return false;
  }
  let selectOptionArray = [];

  if (typevalue == 'regular') {
    // console.log('$("#regularRecord") =', $('#regularRecord'));
    if ($('#regularRecord').children().length == 1) {
      $('#regularNoAdd').addClass('d-block');
      return false;
    }
    for (let i = 0; i < $('select#regularWeek').length; i++) {
      // console.log('for-$(this) =', $('select#regularWeek')[i]);
      const attrId = $('select#regularWeek').eq(i).parent().parent().attr('id');
      // console.log('for-$(this).id =', attrId);
      if (attrId != 'regularTemplate') {
        if ($('select#regularWeek').eq(i).val() != '') {
          const recombine = 'regular#' + $('select#regularWeek').eq(i).val();
          selectOptionArray.push(recombine);
          // console.log('selectOptionArray =', selectOptionArray);
        } else {
          return false;
        }
      }
    }
    for (let i = 0; i < $('select#regularHour').length; i++) {
      // console.log('for-$(this) =', $('select#regularHour')[i]);
      const attrId = $('select#regularHour').eq(i).parent().parent().attr('id');
      // console.log('for-$(this).id =', attrId);
      if (attrId != 'regularTemplate') {
        if ($('select#regularHour').eq(i).val() != '') {
          const recombine =
            selectOptionArray[i - 1] +
            '/' +
            $('select#regularHour').eq(i).val();
          selectOptionArray.splice(i - 1, 1, recombine);
          // console.log('selectOptionArray-hour =', selectOptionArray);
        } else {
          // selectOptionArray = [];
          return false;
        }
      }
    }
    for (let i = 0; i < $('select#regularMinute').length; i++) {
      // console.log('for-$(this) =', $('select#regularMinute')[i]);
      const attrId = $('select#regularMinute')
        .eq(i)
        .parent()
        .parent()
        .attr('id');
      // console.log('$(this).id =', attrId);
      if (attrId != 'regularTemplate') {
        if ($('select#regularMinute').eq(i).val() != '') {
          const recombine =
            selectOptionArray[i - 1] +
            '/' +
            $('select#regularMinute').eq(i).val();
          selectOptionArray.splice(i - 1, 1, recombine);
          // console.log('selectOptionArray-Minute =', selectOptionArray);
        } else {
          // selectOptionArray = [];
          return false;
        }
      }
    }
    // console.log('datas-selectOptionArray =', selectOptionArray);
    datas['regular'] = selectOptionArray;
    console.log('datas =', datas);
  } else if (typevalue == 'cycle') {
    if ($('#cycleRecord').children().length == 1) {
      $('#cycleNoAdd').addClass('d-block');
      return false;
    }
    for (let i = 0; i < $('select#cycleHour').length; i++) {
      console.log('for-$(this) =', $('select#cycleHour')[i]);
      const attrId = $('select#cycleHour').eq(i).parent().parent().attr('id');
      console.log('$(this).id =', attrId);
      if (attrId != 'cycleTemplate') {
        if ($('select#cycleHour').eq(i).val() != '') {
          const recombine = 'cycle#' + $('select#cycleHour').eq(i).val();
          selectOptionArray.push(recombine);
          console.log('selectOptionArray =', selectOptionArray);
        } else {
          return false;
        }
      }
    }
    for (let i = 0; i < $('select#cycleMinute').length; i++) {
      console.log('for-$(this) =', $('select#cycleMinute')[i]);
      const attrId = $('select#cycleMinute').eq(i).parent().parent().attr('id');
      console.log('$(this).id =', attrId);
      if (attrId != 'cycleTemplate') {
        if ($('select#cycleMinute').eq(i).val() != '') {
          const recombine =
            selectOptionArray[i - 1] +
            '/' +
            $('select#cycleMinute').eq(i).val();
          selectOptionArray.splice(i - 1, 1, recombine);
          console.log('selectOptionArray-Minute =', selectOptionArray);
        } else {
          return false;
        }
      }
      datas['cycle'] = selectOptionArray;
    }
  }

  const mqcliKey = $('#MQCLI').prop('id');
  const mqcliValue = $('#MQCLI').val();
  // console.log('key =', mqcliKey);
  // console.log('value =', mqcliValue);
  if (mqcliValue != '') {
    datas[mqcliKey] = mqcliValue;
  } else {
    return false;
  }
  console.log('datas =', datas);

  if (state == 'new' || state == 'clone') {
    console.log('save-new or clone');
    // $.ajax({
    //   url: `${apiUrl}/create/`,
    //   type: 'POST',
    //   data: datas,
    //   dataType: 'json',
    //   success: function (response) {
    //     console.log(response);
    //     // location.href(response);
    //   },
    //   error: function (xhr) {
    //     console.log('xhr =', xhr);
    //     alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    //   },
    // });
    fetch(`${apiUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
      redirect: 'follow',
    }).then((res) => {
      res.redirected && (location.href = res.url);
      location.reload();
    });
  } else {
    console.log('save-update');
    const scheduleID = sessionStorage.getItem('scheduleID');
    datas['scheduleID'] = scheduleID;

    $.ajax({
      url: `${apiUrl}/update/`,
      type: 'PATCH',
      data: datas,
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

    const account = sessionStorage.getItem('account');
    sessionStorage.clear();
    sessionStorage.setItem('account', account);

    const objKey = Object.keys(datas);
    const objValue = Object.values(datas);

    objKey.forEach((item, index) => {
      sessionStorage.setItem(item, objValue[index]);
    });
  }

  //初始化
  init();
}
//--

//初始化
function init() {
  datas = [];
  $('input').val('');
  $('select[name!="schedule_length"]').val('');
  $('select#scheduleType').val('regular');
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
  bootstrap.Modal.getInstance($('#scheduleModal')).hide();
}
//--

//刪除Modal開啟時自動帶入資料
function fillInDelModal() {
  const deleteModal = document.getElementById('deleteModal');
  // console.log('deleteModal =', deleteModal);

  deleteModal.addEventListener('show.bs.modal', (event) => {
    console.log('delete');
    $('#scheduleIdDel').val(sessionStorage.getItem('scheduleID'));
    $('#scheduleNameDel').val(sessionStorage.getItem('scheduleName'));
  });
}

//table列的刪除
function del() {
  $.ajax({
    url: `${apiUrl}/delete/`,
    type: 'DELETE',
    data: { scheduleID: $('#scheduleIdDel').val() },
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
  $('input#scheduleIdDel').val('');
  $('input#scheduleNameDel').val('');
  bootstrap.Modal.getInstance($('#deleteModal')).hide();
}

//匯出
function exportExcel() {
  $('button.buttons-excel').trigger('click');
}
