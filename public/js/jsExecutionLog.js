const apiUrl = '/MiddleService/JSExecutionLog';
let table;

$(document).ready(function () {
  table = $('#JSExecutionLog').DataTable({
    pageLength: 10,
    dom: 'Brft<"bottom"lp>',
    buttons: ['excel'],
    columns: jsExecutionLogColumns,
    scrollX: true,
    language: {
      paginate: {
        "previous": "上一頁",
        "next": "下一頁",
      },
      lengthMenu: "顯示 _MENU_ 筆",
    }
  });

  $('.dt-buttons').addClass('d-none');

  //搜尋框自訂義
  $('#JSExecutionLog_filter').hide();

  $('#searchFilter').on('keyup', function () {
    $('#JSExecutionLog')
      .DataTable()
      .search($('#searchFilter').val(), false, true)
      .draw();
  });
  //--

  datePicker();
  datePickerPosition();
  datePickerBlur();
  dateRangeOptionChoice();
  jsScriptOptionCreate();
});

//當前時間
function currentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  $('#date').val(`${year}/${month}/${day}`);
}

//日期選擇器
function datePicker() {
  $('#date').datepicker({
    format: 'yyyy/mm/dd',
  });
  currentTime();
}
//--

//日期選擇器動態位置
function datePickerPosition() {
  $('#date').focus(function () {
    const offset_Top = $('#date').offset().top;
    const outerHeight = $('#date').outerHeight();

    const sum = offset_Top + outerHeight + 7;

    $('.datepicker').offset({
      top: sum,
    });
  });
}
//--

//日期選擇器失焦行為
function datePickerBlur() {
  $('#date').blur(function () {
    const value = $('#date').val();
    if (value == '') {
      currentTime();
    }
  });
}
//--

//日期區間option動態塞入
function dateRangeOptionChoice() {
  const dateRangeSelect = document.getElementById('dateRange');

  let dateRangeOption = '';
  dateRangeOptions.forEach((element) => {
    dateRangeOption =
      dateRangeOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  dateRangeSelect.innerHTML = dateRangeOption;
}
//--

const jsScriptOptionCreate = () => {
  const jsScriptSelect = document.getElementById('jsScript');
  let options = '';
  $.ajax({
    url: '/MiddleService/JSScript/readAll',
    type: 'GET',
    dataTpye: 'json',
    success: res => {
      const { status, result } = res;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        data.forEach(element => {
          const { scriptID, scriptName } = element;
          options += '<option>';
          options += `${scriptID}.${scriptName}`;
          options += '</option>';
        });
        jsScriptSelect.innerHTML = options;
      };
    },
    error: err => {
      console.log(err);
    }
  });
};

//查詢
function query() {
  const dateVal = $('#date').val();
  const newDateVal = dateVal.replace(/\//g, '-');
  const dateRangeVal = $('#dateRange').val();
  const data = {
    startDate: newDateVal,
    dateInterval: dateRangeVal
  };
  table.clear();
  $.ajax({
    url: `${apiUrl}/query/`,
    type: 'POST',
    data: data,
    dataType: 'json',
    success: res => {
      const { status, result } = res;
      if (status != 'success') {
        throw 'status is not success';
      } else {
        const { data } = result;
        data.forEach(element => {
          element['processDatetime'] = moment(element.processDatetime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
        });
        table.rows.add(data).draw();
      }
    },
    error: err => {
      console.log(err);
    }
  });
}
//--

//匯出
function exportExcel() {
  $('button.buttons-excel').trigger('click');
}